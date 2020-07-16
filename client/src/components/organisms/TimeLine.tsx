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
    const [trackHeights, setTrackHeights] = useState(300);
    const [xPosition, setXPosition] = useState(0);
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

    const handlePosition = (e: any) => {
        if (timelineRef.current) {
            //const calc = (videoRef.currentDuration / videoData.videoLength ) * timelineRef.current.offsetWidth;
            setXPosition(e);
        }
    }

    return (
        <Container height={trackHeights}>
            <SideNav>
                <AddTrack onClick={() => console.log('ye')} />
                <Wrapper>
                    <TrackEdit />
                    <TrackEdit />
                    <TrackEdit />
                </Wrapper>
            </SideNav>
            <TimeLineContainer ref={timelineRef}>
                <TimeStamp videoLength={videoData.videoLength} onTimeClick={handleTimeStampClick}/>
                <Track />
                <Track />
                <Track />
                <TimeArrow xPosition={xPosition} positionChange={handlePosition} height={trackHeights} />
            </TimeLineContainer>
        </Container>
    )
}

export default TimeLine;