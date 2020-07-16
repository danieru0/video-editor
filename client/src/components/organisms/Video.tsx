import React, { FC } from 'react';
import styled from 'styled-components';

import VideoPlayer from '../molecules/VideoPlayer';

interface VideoProps {
    [x: string]: any;
}

const Container = styled.div`
    display: flex;
    height: 100%;
    padding: 20px;
    justify-content: center;
    align-items: center;
    z-index: 2;
`

const Video: FC<VideoProps> = ({...props}) => {
    return (
        <Container {...props}>
            <VideoPlayer />
        </Container>
    )
}

export default Video;