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
`

const StyledIconPlay = styled(ButtonIcon)``

const StyledIcon = styled(ButtonIcon)`
    margin-top: 5px;
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
            <StyledIcon onClick={goBackward} name="IoIosSkipBackward" size={26} color="#E0E5EE" />
            <StyledIconPlay onClick={toggleVideo} name={videoData.play ? "IoIosPause" : "IoIosPlay"} circle size={33} color="#E0E5EE" />
            <StyledIcon onClick={goForward} name="IoIosSkipForward" size={26} color="#E0E5EE" />
            <Time time={videoRef.currentDuration} />
        </Container>
    )
}

export default ControlsPlay;