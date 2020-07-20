import React, { FC, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTypedSelector } from '../../store/selector';
import { useDispatch } from 'react-redux';
import { types } from '../../store/actions/types';

import AddTrack from '../molecules/AddTrack';
import TrackEdit from '../molecules/TrackEdit';
import Track from '../molecules/Track';
import TimeStamp from '../atoms/TimeStamp';
import TimeArrow from '../molecules/TimeArrow';

interface ContainerProps {
    height: number;
}

const Container = styled.div<ContainerProps>`
    display: flex;
    overflow-y: auto;
    height: ${({height}) => height}px;
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
    const timelineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (timelineRef.current) {
            dispatch({
                type: types.SET_TIMELINE_REF,
                payload: timelineRef.current
            });
        }
    }, [timelineRef, dispatch]);


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
        const newTrack = {
            name: `track ${trackList.length}`,
            item: null
        };
        const newTrackHeight = trackHeights + 70;

        dispatch({
            type: types.CREATE_NEW_TRACK,
            payload: newTrack
        });
        setTrackHeights(newTrackHeight);
    }

    return (
        <Container height={trackHeights}>
            <SideNav>
                <AddTrack onClick={handleNewTrack} />
                <Wrapper>
                    {
                        trackList && trackList.map(item => {
                            return <TrackEdit key={item.name} name={item.name}/>
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