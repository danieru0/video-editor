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
`

const Wrapper = styled.div`
    margin-top: 30px;
    margin-left: 17px;
`

const TimeLine: FC = () => {
    const dispatch = useDispatch();
    const videoData = useTypedSelector(state => state.video.videoData);
    const videoRef = useTypedSelector(state => state.video.videoRef);
    const trackList = useTypedSelector(state => state.timeline.timeline);
    const [trackHeights, setTrackHeights] = useState(100);
    const [xPosition, setXPosition] = useState(0);
    const [yPosition, setYPosition] = useState(0);
    const timelineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (timelineRef.current) {
            const calc = (videoRef.currentDuration / videoData.videoLength ) * timelineRef.current.offsetWidth;
            setXPosition(calc);
        }
    }, [videoRef.currentDuration, videoData.videoLength]);

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
        
        if (timelineRef.current) {
            const allTrackSize = newTrackHeight - 100;
            setYPosition(((-15 - 10) - allTrackSize) + 15);

            // -15 is TimeStamp height
            // 10 is margin in first track
            // allTrackSize is size of every track created
            // oneTrack is 70px
            // Initial height for track container is 100
            // +15 at the end is because RND make it's own calculation and add TimeStamp height
        }
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
                        return <Track key={item.name} />
                    })
                }
                <TimeArrow yPosition={yPosition} xPosition={xPosition} positionChange={handlePosition} height={trackHeights} />
            </TimeLineContainer>
        </Container>
    )
}

export default TimeLine;