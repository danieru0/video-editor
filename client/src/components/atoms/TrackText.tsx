import React, { FC } from 'react';
import styled from 'styled-components';

interface ComponentProps {
    color: string;
}

interface TextProps extends ComponentProps {
    text: string;
}

const Text = styled.span<ComponentProps>`
    font-family: ${({theme}) => theme.Lato};
    color: ${({color}) => color};
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
`

const SceneBlocks: FC<TextProps> = ({ text, color }) => {
    return (
        <Text color={color}>{ text }</Text>
    )
}

export default SceneBlocks;