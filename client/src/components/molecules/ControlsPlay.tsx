import React, { FC } from 'react';
import styled from 'styled-components';
import { useTypedSelector } from '../../store/selector';
import { useDispatch } from 'react-redux';
import { types } from '../../store/actions/types';

import WithButton from '../../hoc/withButton';

import Icon from '../atoms/Icon';
import Time from '../atoms/Time';

const ButtonIcon = WithButton(Icon);

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 350px;
    margin-left: -50px;
`

const ControlsPlay: FC = () => {
    const dispatch = useDispatch();
    const videoData = useTypedSelector(state => state.video.videoData);
    const videoRef = useTypedSelector(state => state.video.videoRef);

    const toggleVideo = () => {
        dispatch({
            type: types.SET_VIDEO_PLAY,
            payload: videoData.play ? false : true
        });
    }

    const goBackward = () => {
        dispatch({
            type: types.SET_VIDEO_DURATION,
            payload: videoRef.currentDuration - 1
        });
    }

    const goForward = () => {
        dispatch({
            type: types.SET_VIDEO_DURATION,
            payload: videoRef.currentDuration + 1
        });
    }

    return (
        <Container>
            <Time time={0} />
            <ButtonIcon onClick={goBackward} name="backward" size={26} color="#E0E5EE" />
            <ButtonIcon onClick={toggleVideo} name={videoData.play ? "pause" : "play"} circle size={24} color="#E0E5EE" />
            <ButtonIcon onClick={goForward} name="forward" size={26} color="#E0E5EE" />
            <Time time={videoRef.currentDuration} />
        </Container>
    )
}

export default ControlsPlay;