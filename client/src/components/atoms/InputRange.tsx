import React, { FC } from 'react';
import styled from 'styled-components';
import Slider from 'react-input-slider';

interface InputRangeProps {
    activeColor: string;
    trackColor: string;
    thumbColor: string;
    thumbWidth: string;
    thumbHeight: string;
    step: number;
    min: number;
    max: number;
    value: number;
    onChange: (value: number) => void;
    [x: string]: any;
}

const StyledSlider = styled(Slider)`
    height: 6px !important;
    width: 100% !important;
`

const InputRange: FC<InputRangeProps> = ({ activeColor, trackColor, thumbColor, thumbWidth, thumbHeight, step, min, max, value, onChange, ...props }) => {
    return (
        <StyledSlider {...props} styles={{
            active: {
                backgroundColor: activeColor
            },
            track: {
                backgroundColor: trackColor
            },
            thumb: {
                width: thumbWidth,
                height: thumbHeight,
                backgroundColor: thumbColor
            }
        }} xstep={step} onChange={(value) => onChange(value.x)} x={value} xmin={min} xmax={max} />
    )
}

export default InputRange;