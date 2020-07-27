import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { ChromePicker } from 'react-color';

interface ChangeItemColorModalProps {
    handleColorChange: (color: string) => void;
}

const Container = styled.div`
    width: 400px;
    height: 300px;
    background: #424242;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ChangeItemColorModal: FC<ChangeItemColorModalProps> = ({handleColorChange}) => {
    const [color, setColor] = useState('#fff');

    const handleColorSet = (color: string) => {
        setColor(color);
        handleColorChange(color);
    }

    return (
        <Container>
            <ChromePicker color={color} onChangeComplete={(color) => handleColorSet(color.hex)} />
        </Container>
    )
}

export default ChangeItemColorModal;