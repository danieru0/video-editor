import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../../themes/theme';

import InputRange from '../../atoms/InputRange';

interface ContainerProps {
    active: boolean;
}

interface SceneStyleProps extends ContainerProps {
    onInputChange: (type: string, value: number) => void;
}

const Container = styled.div<ContainerProps>`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    overflow-y: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding: inherit;
    visibility: ${({active}) => active ? 'visible': 'hidden'};
`

const InputWrapper = styled.div`
    width: 95%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const InputText = styled.span`
    font-family: ${({theme}) => theme.Lato};
    color: ${({theme}) => theme.white};
    font-size: 18px;
    text-transform: uppercase;
`

const StyledInputRange = styled(InputRange)`
    width: 75% !important;
    position: relative;

    &::after {
        content: "";
        position: absolute;
        background-color: #fff;
        width: 5px;
        height: 10px;
        transform: translate(-50%, -0%);
        left: 50%;
        top: 110%;
    }
`

const SceneStyle: FC<SceneStyleProps> = ({active, onInputChange}) => {
    const [brightnessValue, setBrightnessValue] = useState(100);
    const [contrastValue, setContrastValue] = useState(100);
    const [saturationValue, setSaturationValue] = useState(100);

    const handleInputChange = (value: number, type: string) => {
        onInputChange(type, value);
        
        switch(type) {
            case 'brightness':
                return setBrightnessValue(value);
            case 'contrast':
                return setContrastValue(value);
            case 'saturation':
                return setSaturationValue(value);
            default: throw new Error('Wrong input style type!');
        }
    }

    return (
        <Container active={active}>
            <InputWrapper>
                <InputText>Brightness</InputText>
                <StyledInputRange 
                activeColor={theme.inputRangeActive}
                trackColor={theme.inputRangeTrack}
                thumbColor={theme.inputRangeThumb}
                thumbWidth="15px"
                thumbHeight="15px"
                step={2}
                min={0}
                max={200}
                value={brightnessValue}
                onChange={(value: number) => handleInputChange(value, 'brightness')}
                />
            </InputWrapper>
            <InputWrapper>
                <InputText>Contrast</InputText>
                <StyledInputRange 
                activeColor={theme.inputRangeActive}
                trackColor={theme.inputRangeTrack}
                thumbColor={theme.inputRangeThumb}
                thumbWidth="15px"
                thumbHeight="15px"
                step={1}
                min={0}
                max={200}
                value={contrastValue}
                onChange={(value: number) => handleInputChange(value, 'contrast')}
                />
            </InputWrapper>
            <InputWrapper>
                <InputText>Saturation</InputText>
                <StyledInputRange 
                activeColor={theme.inputRangeActive}
                trackColor={theme.inputRangeTrack}
                thumbColor={theme.inputRangeThumb}
                thumbWidth="15px"
                thumbHeight="15px"
                step={1}
                min={0}
                max={200}
                value={saturationValue}
                onChange={(value: number) => handleInputChange(value, 'saturation')}
                />
            </InputWrapper>
        </Container>
    )
}

export default SceneStyle;