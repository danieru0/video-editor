import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch } from 'react-redux';
import { types } from '../../store/actions/types';

import VideoCore from '../atoms/VideoCore';
import VideoCanvas from '../atoms/VideoCanvas';
import VideoItems from './VideoItems';

const positionStyle = css`
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    padding: 20px;
`

const StyledVideoCore = styled(VideoCore)`
    ${positionStyle};
`

const StyledVideoCanvas = styled(VideoCanvas)`
    z-index: 1;
    ${positionStyle};
`

const StyledVideoItems = styled(VideoItems)`
    z-index: 2;
    ${positionStyle};
`

const VideoPlayer: FC = () => {
    const dispatch = useDispatch();
    const [tick, setTick] = useState<number | undefined>(0);
    const [videoRef, setVideoRef] = useState<HTMLVideoElement>();

    const timeUpdate =  (tick: number | undefined, videoRef: HTMLVideoElement) => {
        setTick(tick);
        setVideoRef(videoRef);
        dispatch({
            type: types.SET_VIDEO_REF,
            payload: {
                currentDuration: tick,
                videoRef: videoRef
            }
        });
    }

    return (
        <>
            <StyledVideoCore handleTick={timeUpdate} />
            <StyledVideoCanvas videoRef={videoRef} tick={tick} />
            <StyledVideoItems />
        </>
    )
}

export default VideoPlayer;