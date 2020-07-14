import React, { FC, useState } from 'react';
import styled from 'styled-components';

import VideoCore from '../atoms/VideoCore';
import VideoCanvas from '../atoms/VideoCanvas';

const StyledVideoCore = styled(VideoCore)`
    position: absolute;
`

const StyledVideoCanvas = styled(VideoCanvas)`
    z-index: 1;
`

const VideoPlayer: FC = () => {
    const [tick, setTick] = useState<number | undefined>(0);
    const [videoRef, setVideoRef] = useState(undefined);
    const timeUpdate = (tick: number | undefined, videoRef: any) => {
        setTick(tick);
        setVideoRef(videoRef);
    }
    return (
        <>
            <StyledVideoCore  handleTick={timeUpdate} />
            <StyledVideoCanvas videoRef={videoRef} tick={tick} />
        </>
    )
}

export default VideoPlayer;