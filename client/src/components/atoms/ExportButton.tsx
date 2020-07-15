import React, { FC } from 'react';
import styled from 'styled-components';

interface ExportButtonProps {
    onClick: () => void;
}

const Button = styled.button`
    background-color: #36BCFF;
    border: none;
    border-radius: 5px;
    font-family: 'Lato';
    color: #fff;
    padding: 18px 26px;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-size: 16px;
    cursor: pointer;
    outline: none;
`

const ExportButton: FC<ExportButtonProps> = ({onClick}) => {
    return (
        <Button onClick={onClick}>
            Export
        </Button>
    )
}

export default ExportButton;