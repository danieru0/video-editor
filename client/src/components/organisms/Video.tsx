import React, { FC } from 'react';
import styled from 'styled-components';

import VideoAtom from '../atoms/VideoAtom';

interface VideoProps {
    [x: string]: any;
}

const Container = styled.div`
    display: flex;
    height: 100%;
    padding: 20px;
    justify-content: center;
    align-items: center;
`

const Video: FC<VideoProps> = ({...props}) => {
    return (
        <Container {...props}>
            <VideoAtom />
        </Container>
    )
}

export default Video;