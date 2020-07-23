import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ChromePicker } from 'react-color';
import { useTypedSelector } from '../../store/selector';

import WithButton from '../../hoc/withButton';

import Line from './Line';
import Icon from './Icon';

const AlignButton = WithButton(Icon);

interface WrapperProps {
    active: boolean;
}

interface activeElementsState {
    [x: number]: boolean;
}

interface BlockTextEditProps {
    onColorChange: (color: string) => void;
    onAlignChange: (type: string) => void;
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

const AlignButtons = styled.div`
    width: 100%;
    display: flex;
`

const BlockEditText: FC<BlockTextEditProps> = ({onColorChange, onAlignChange, name}) => {
    const timelineList = useTypedSelector(state => state.timeline.timeline);
    const [activeElements, setActive] = useState<activeElementsState>({
        0: false,
        1: false,
    });
    const [color, setColor] = useState('');

    useEffect(() => {
        const currentItem = timelineList.filter(item => item.name === name);

        if (currentItem.length !== 0) {
            if (currentItem[0].item && currentItem[0].item.textOptions) {
                setColor(currentItem[0].item.textOptions.textColor);
            }
        }

    }, [name, timelineList]);

    const handleLineClick = (id: number) => {
        setActive({
            ...activeElements,
            [id]: activeElements[id] === true ? false : true
        });
    }

    const handleColorChange = (color: string) => {
        setColor(color);
        onColorChange(color);
    }

    return (
        <Container>
            <Line onClick={() => handleLineClick(0)} text="Font color" active={activeElements[0]} />
            <Wrapper active={activeElements[0]}>
                <ChromePicker color={color} onChangeComplete={(color) => handleColorChange(color.hex)}/>
            </Wrapper>
            <Line onClick={() => handleLineClick(1)} text="Text alignment" active={activeElements[1]} />
            <Wrapper active={activeElements[1]}>
                <AlignButtons>
                    <AlignButton onClick={() => onAlignChange('flex-start')} square name="align-left" size={26} color="#fff" />
                    <AlignButton onClick={() => onAlignChange('center')} square name="align-center" size={26} color="#fff" />
                    <AlignButton onClick={() => onAlignChange('flex-end')} square name="align-right" size={26} color="#fff" />
                </AlignButtons>
            </Wrapper>
        </Container>
    )
}

export default BlockEditText;