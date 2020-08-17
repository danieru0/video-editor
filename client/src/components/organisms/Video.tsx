import React, { FC } from 'react';
import styled from 'styled-components';
import { useTypedSelector } from '../../store/selector';
import { useDispatch } from 'react-redux';
import { types } from '../../store/actions/types';

import WithButton from '../../hoc/withButton';

import VideoPlayer from '../molecules/VideoPlayer';
import Icon from '../atoms/Icon';

interface VideoProps {
    [x: string]: any;
}

interface ContainerProps {
    fullScreen: boolean;
}

const Container = styled.div<ContainerProps>`
    display: flex;
    height: 100%;
    padding: 20px;
    justify-content: center;
    align-items: center;
    z-index: 2;
    position: relative;

    ${({fullScreen}) => fullScreen && `
        position: absolute;
        width: 100%;
        z-index: 999;
        background-color: #000;
        padding: 10px;
    `}
`

const Wrapper = styled.div`
    position: absolute;
    top: 15px;
    left: 15px;
`

const WithButtonIcon = WithButton(Icon);

const Video: FC<VideoProps> = ({...props}) => {
    const dispatch = useDispatch();
    const videoFullScreen = useTypedSelector(state => state.video.fullScreen);

    const handleFullScreenClick = () => {
        dispatch({
            type: types.SET_VIDEO_FULLSCREEN,
            payload: !videoFullScreen
        });
    }

    return (
        <Container fullScreen={videoFullScreen} {...props}>
            <VideoPlayer />
            <Wrapper>
                <WithButtonIcon onClick={handleFullScreenClick} square name="expand" color="#fff" size={20} />
            </Wrapper>
        </Container>
    )
}

export default Video;