import React, { FC } from 'react';
import styled from 'styled-components';

import Icon from './Icon';

interface IconProps {
    active: boolean;
}

interface LineProps extends IconProps {
    text: string;
    [x: string]: any;
    onClick: () => void;
}

const Container = styled.button`
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
`

const LineComponent = styled.div`
    width: 100%;
    height: 4px;
    background-color: ${({theme}) => theme.secondary};
`

const Text = styled.span`
    position: absolute;
    font-size: 20px;
    background-color: ${({theme}) => theme.primary};
    color: ${({theme}) => theme.white};
    font-family: ${({theme}) => theme.Lato};
    top: 2px;
    left: 40px;
    padding: 0px 10px;
`

const StyledIcon = styled(Icon)<IconProps>`
    position: relative;
    transform: ${({active}) => active ? 'rotate(0deg)' : 'rotate(-90deg)'};
    transition: transform 0.3s;
`

const Line: FC<LineProps> = ({active, text, onClick, ...props}) => {
    return (
        <Container onClick={onClick} {...props}>
            <StyledIcon active={active} name="IoIosArrowDown" size={30} color="#fff" />
            <LineComponent />
            <Text>{text}</Text>
        </Container>
    )
}

export default Line;