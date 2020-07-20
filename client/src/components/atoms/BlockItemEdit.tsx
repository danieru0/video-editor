import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ChromePicker } from 'react-color';
import { useTypedSelector } from '../../store/selector';

import Line from './Line';

interface WrapperProps {
    active: boolean;
}

interface activeElementsState {
    [x: number]: boolean;
}

interface BlockItemEditProps {
    onColorChange: (color: string) => void;
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
    transform-origin: top;
    transition: transform 0.3s;
    padding-left: 18px;
    padding-top: 10px;
    overflow: hidden;
`

const BlockItemEdit: FC<BlockItemEditProps> = ({onColorChange, name}) => {
    const timelineList = useTypedSelector(state => state.timeline.timeline);
    const [activeElements, setActive] = useState<activeElementsState>({
        0: false,
    });
    const [color, setColor] = useState('');

    useEffect(() => {
        const currentItem = timelineList.filter(item => item.name === name);

        if (currentItem.length !== 0) {
            if (currentItem[0].item) {
                setColor(currentItem[0].item.color);
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
            <Line onClick={() => handleLineClick(0)} text="Colors" active={activeElements[0]} />
            <Wrapper active={activeElements[0]}>
                <ChromePicker color={color} onChangeComplete={(color) => handleColorChange(color.hex)}/>
            </Wrapper>
        </Container>
    )
}

export default BlockItemEdit;