import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ChromePicker } from 'react-color';
import { useTypedSelector } from '../../store/selector';
import { theme } from '../../themes/theme';

import { useDropDownMenu } from '../../hooks/useDropdownMenu';

import InputRange from '../atoms/InputRange';

import Line from './Line';

interface WrapperProps {
    active: boolean;
}

interface BlockItemEditProps {
    onColorChange: (color: string) => void;
    onOpacityChange: (opacity: number) => void;
    onKeepRatioChange: (value: boolean) => void;
    name: string;
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;
`

const Wrapper = styled.div<WrapperProps>`
    width: 100%;
    transform: ${({active}) => active ? 'scaleY(1)' : 'scaleY(0)'};
    max-height: ${({active}) => active ? '500px' : '0px'};
    transform-origin: top;
    transition: transform 0.3s, max-height 0.3s;
    padding-left: 18px;
    padding-top: 10px;
    padding-bottom: 10px;
    overflow: hidden;
`

const StyledOpacityRange = styled(InputRange)`
    width: 90% !important;
`

const Label = styled.label`
    font-family: ${({theme}) => theme.Lato};
    color: #fff;
    font-size: 20px;
    margin-left: 10px;
    padding: 5px 0px;
`

const CheckInput = styled.input`
    margin-left: 10px;
    position: relative;
    top: 1px;
    transform: scale(1.2);
`

const BlockItemEdit: FC<BlockItemEditProps> = ({onColorChange, onOpacityChange, onKeepRatioChange, name}) => {
    const timelineList = useTypedSelector(state => state.timeline.timeline);
    const {activeElements, changeActiveElement} = useDropDownMenu({
        0: false,
        1: false,
        2: false
    });
    const [color, setColor] = useState('');
    const [opacity, setOpacity] = useState(1);
    const [keepRatio, setKeepRatio] = useState(true);

    useEffect(() => {
        const currentItem = timelineList.filter(item => item.name === name);

        if (currentItem.length !== 0) {
            if (currentItem[0].item) {
                setColor(currentItem[0].item.color);
                setOpacity(currentItem[0].item.opacity);
            }
        }

    }, [name, timelineList]);

    const handleColorChange = (color: string) => {
        setColor(color);
        onColorChange(color);
    }

    const handleOpacityChange = (opacity: number) => {
        setOpacity(opacity);
        onOpacityChange(opacity);
    }

    const handleKeepRatioChange = (value: boolean) => {
        setKeepRatio(!keepRatio);
        onKeepRatioChange(value);
    }

    return (
        <Container>
            <Line onClick={() => changeActiveElement(0)} text="Colors" active={activeElements[0]} />
            <Wrapper active={activeElements[0]}>
                <ChromePicker color={color} onChangeComplete={(color) => handleColorChange(color.hex)}/>
            </Wrapper>
            <Line onClick={() => changeActiveElement(1)} text="Opacity" active={activeElements[1]} />
            <Wrapper active={activeElements[1]}>
                <StyledOpacityRange
                    activeColor={theme.inputRangeActive} 
                    thumbColor={theme.inputRangeThumb} 
                    trackColor={theme.inputRangeTrack}
                    thumbWidth='15px'
                    thumbHeight='15px'
                    step={0.1}
                    min={0}
                    max={1}
                    value={opacity}
                    onChange={handleOpacityChange}
                />
            </Wrapper>
            <Line onClick={() => changeActiveElement(2)} text="Settings" active={activeElements[2]} />
            <Wrapper active={activeElements[2]}>
                <Label>
                    Keep ratio:
                    <CheckInput type="checkbox" checked={keepRatio} onChange={(e) => handleKeepRatioChange(e.target.checked)}/>
                </Label>
            </Wrapper>
        </Container>
    )
}

export default BlockItemEdit;