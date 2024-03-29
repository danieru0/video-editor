import React, { FC, useRef, useEffect, useState, MouseEvent } from 'react';
import styled from 'styled-components';
import { useTypedSelector } from '../../store/selector';
import { useDispatch } from 'react-redux';
import { types } from '../../store/actions/types';

import getRandomId from '../../helpers/getRandomId';

import AddTrack from '../molecules/AddTrack';
import TrackEdit from '../molecules/TrackEdit';
import Track from '../molecules/Track';
import TimeStamp from '../atoms/TimeStamp';
import TimeArrow from '../molecules/TimeArrow';
import SettingsDropdown from '../molecules/SettingsDropdown';

interface ContainerProps {
    height: number;
}

interface dropdownData {
    name: string | null;
    clientX: number;
    clientY: number;
    type: string;
    index: number;
}

const Container = styled.div`
    display: flex;
    overflow-y: auto;
    flex: 1;
    padding: 0px 20px;
`

const SideNav = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    padding: 20px;
`

const TimeLineContainer = styled.div`
    width: 100%;
    margin-top: 63px;

    position: relative;
`

const Wrapper = styled.div`
    margin-top: 30px;
    margin-left: 17px;
`

const TimeLine: FC = () => {
    const dispatch = useDispatch();
    const videoData = useTypedSelector(state => state.video.videoData);
    const trackList = useTypedSelector(state => state.timeline.timeline);
    const [trackHeights, setTrackHeights] = useState(100);
    const [resizeActive, setResizeActive] = useState(false);
    const [timelineWidth, setTimelineWidth] = useState(0);
    const [trackAmount, setTrackAmount]= useState(1);
    const [dropdownData, setDropdownData] = useState<dropdownData>({
        name: null,
        clientX: 0,
        clientY: 0,
        type: '',
        index: 0
    })
    const timelineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (timelineRef.current) {
            dispatch({
                type: types.SET_TIMELINE_REF,
                payload: timelineRef.current
            });
        }
    }, [timelineRef, dispatch]);

    useEffect(() => {
        if (timelineRef.current) {
            setTimelineWidth(timelineRef.current.offsetWidth);
        }
    }, [setTimelineWidth]);

    useEffect(() => {
        let resizeTimeout: any;

        const runTimeout = () => {
            if (timelineRef.current) {
                clearTimeout(resizeTimeout);

                if (!resizeActive) {
                    setTimelineWidth(timelineRef.current.offsetWidth);
                    setResizeActive(true);
                }
    
                resizeTimeout = setTimeout(() => {
                    calculateItemWidths();
                }, 200);
            }
        }

        const calculateItemWidths = () => {
            trackList.forEach(item => {
                if (item.item && timelineRef.current && item.item.time) {
                    const width = typeof item.item.width === 'string' ? item.item.width.replace('px', '') : item.item.width; 
                    const widthNumber = Number(width) as any;
                    const widthDifference = timelineWidth - timelineRef.current.offsetWidth;
                    const newWidth = (widthDifference > 0) ? widthNumber.toFixed() - widthDifference : widthNumber;
                    const startTime = item.item.xPosition * videoData.videoLength / timelineRef.current.offsetWidth;
                    const endTime = (newWidth * videoData.videoLength / timelineRef.current.offsetWidth) + startTime;
                    let newXPosition;

                    if (endTime > videoData.videoLength) {
                        newXPosition = timelineRef.current.offsetWidth - newWidth;
                    } else {
                        newXPosition = item.item.xPosition;
                    }

                    dispatch({
                        type: types.UPDATE_ITEM_TRACK_SIZE,
                        payload: {
                            xPosition: newXPosition,
                            start: startTime,
                            end: endTime,
                            width: newWidth,
                            name: item.name
                        }
                    })
                }
            })
            setResizeActive(false);
        }

        window.addEventListener('resize', runTimeout);

        return () => window.removeEventListener('resize', runTimeout);
    }, [trackList, dispatch, videoData.videoLength]); //eslint-disable-line

    
    
    useEffect(() => {
        const handleOutsideClick = () => {
            setDropdownData({
                name: null,
                clientX: 0,
                clientY: 0,
                type: '',
                index: 0
            })
        }
        
        window.addEventListener('click', handleOutsideClick);

        return () => window.removeEventListener('click', handleOutsideClick);
    }, []);

    const handleTimeStampClick = (time: number) => {
        dispatch({
            type: types.SET_VIDEO_DURATION,
            payload: time
        });
    }

    const handlePosition = (x: number, e: any) => {
        if (timelineRef.current) {
            const progress = x * videoData.videoLength / timelineRef.current.offsetWidth;
            dispatch({
                type: types.SET_VIDEO_DURATION,
                payload: progress
            })
        }
    }

    const handleNewTrack = () => {
        setTrackAmount(trackAmount + 1);
        const newTrack = {
            name: `TRACK ${trackAmount}`,
            item: null,
            id: getRandomId()
        };
        const newTrackHeight = trackHeights + 70;

        dispatch({
            type: types.CREATE_NEW_TRACK,
            payload: newTrack
        });
        setTrackHeights(newTrackHeight);
    }

    const handleDeleteTrack = (name: string) => {
        if (window.confirm('Are you sure?')) {
            dispatch({
                type: types.DELETE_TRACK,
                payload: name
            })
            dispatch({
                type: types.UPDATE_CLICKED_ITEM,
                payload: {
                    name: '',
                    type: ''
                }
            })
            setTrackHeights(trackHeights - 70);
        }
    }

    const handleSettingsClick = (e: MouseEvent, type: string | undefined, name: string, index: number) => {
        e.preventDefault();
        e.stopPropagation();
        setDropdownData({
            name: name,
            clientX: e.clientX,
            clientY: e.clientY,
            type: type ? type : '',
            index: index
        })
    }

    const handleNameClick = (name: string | null) => {
        if (name) {            
            dispatch({
                type: types.UPDATE_MODAL_DATA,
                payload: {
                    name: name,
                    type: 'change-name'
                }
            })
        }
    }

    const handleItemDelete = (name: string | null) => {
        if (name && window.confirm('Are you sure?')) {
            dispatch({
                type: types.DELETE_ITEM_FROM_TRACK,
                payload: name
            })
            dispatch({
                type: types.UPDATE_CLICKED_ITEM,
                payload: {
                    name: '',
                    type: ''
                }
            })
        }
    }

    const handleMove = (name: string | null, type: string, index: number) => {
        if (name) {
            dispatch({
                type: types.MOVE_TRACK,
                payload: {
                    name: name,
                    type: type,
                    index: index
                }
            })
        }
    }

    const handleItemColor = (name: string | null) => {
        if (name) {
            dispatch({
                type: types.UPDATE_MODAL_DATA,
                payload: {
                    name: name,
                    type: 'item-color'
                }
            })
        }
    }

    const handleItemEdit = (name: string | null, type: string | undefined) => {
        if (name && type) {
            dispatch({
                type: types.UPDATE_CLICKED_ITEM,
                payload: {
                    name: name,
                    type: type
                }
            })
        }
    }

    return (
        <Container>
            {dropdownData.name && <SettingsDropdown onItemEditClick={handleItemEdit} onChangeItemColorClick={handleItemColor} onMoveClick={handleMove} onDeleteItemClick={handleItemDelete} onChangeNameClick={handleNameClick} {...dropdownData}/> }
            <SideNav>
                <AddTrack onClick={handleNewTrack} />
                <Wrapper>
                    {
                        trackList && trackList.map((item, index) => {
                            return <TrackEdit onSettingsClick={(e: MouseEvent) => handleSettingsClick(e, item.item?.type, item.name, index)} onDeleteClick={() => handleDeleteTrack(item.name)} key={item.name} name={item.name}/>
                        })
                    }
                </Wrapper>
            </SideNav>
            <TimeLineContainer ref={timelineRef}>
                <TimeStamp videoLength={videoData.videoLength} onTimeClick={handleTimeStampClick}/>
                {
                    trackList && trackList.map(item => {
                        return <Track videoLength={videoData.videoLength} timelineRef={timelineRef} name={item.name} item={item.item} key={item.name} />
                    })
                }
                <TimeArrow timelineRef={timelineRef} positionChange={handlePosition} height={trackHeights} />
            </TimeLineContainer>
        </Container>
    )
}

export default TimeLine;