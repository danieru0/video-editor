import React, { FC } from 'react';
import styled from 'styled-components';
import { theme } from '../../themes/theme';

interface SceneButtonProps {
    text: string;
    selected: boolean;
    id: number;
    handleClick: (id: number) => void;
}

interface ButtonProps {
    isSelected: boolean;
}

const Button = styled.button<ButtonProps>`
    height: 50px;
    background-color: ${({theme, isSelected}) => isSelected ? theme.primary : theme.secondary};
    color: ${({theme, isSelected}) => isSelected ? theme.white : theme.notSelected};
    cursor: pointer;
    flex: 1;
    border: none;
    outline: none;
    font-family: ${theme.Lato};
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 2px;

`

const SceneButton: FC<SceneButtonProps> = ({ text, selected, id, handleClick }) => {
    return (
        <Button onClick={() => handleClick(id)} isSelected={selected}>
            {text}
        </Button>
    );
}

export default SceneButton;