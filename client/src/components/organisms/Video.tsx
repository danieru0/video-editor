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
    z-index: 2;
    position: relative;
    overflow: auto;

    &:after {
        content: '';
        display: block;
        height: 20px;
        width: 100%;
    }

    ${({fullScreen}) => fullScreen && `
        position: absolute;
        width: 100%;
        z-index: 999;
        background-color: #000;
    `}
`

const Wrapper = styled.div`
    position: sticky;
    top: 15px;
    left: 15px;
    z-index: 3;
    height: 35px;
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