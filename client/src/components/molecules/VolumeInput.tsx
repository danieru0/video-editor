import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../themes/theme';
import { useDispatch } from 'react-redux';
import { types } from '../../store/actions/types';

import InputRange from '../atoms/InputRange';
import Icon from '../atoms/Icon';

const Container = styled.div`
    width: 170px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const StyledIcon = styled(Icon)`
    margin-right: 10px;
`

const VolumeInput: FC = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState(0.5);
    const handleVolumeChange = (value: number) => {
        setInputValue(value);
        dispatch({
            type: types.SET_VIDEO_VOLUME,
            payload: value
        });
    }

    return (
        <Container>
            <StyledIcon name="IoIosVolumeHigh" color="#8DA5D1" size={30}/>
            <InputRange 
                activeColor={theme.inputRangeActive}
                trackColor={theme.inputRangeTrack}
                thumbColor={theme.inputRangeThumb}
                thumbWidth="15px"
                thumbHeight="15px"
                step={0.1}
                min={0}
                max={1}
                value={inputValue}
                onChange={handleVolumeChange}
            />
        </Container>
    )
}

export default VolumeInput;