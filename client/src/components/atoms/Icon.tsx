import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type IconTypes = 'play'
    | 'volume-up'
    | 'pause'
    | 'forward'
    | 'backward'
    | 'plus'
    | 'trash'
    | 'sliders-h'
    | 'chevron-left'
    | 'chevron-down'
    | 'arrow-left'
    | 'align-left'
    | 'align-center'
    | 'align-right'
    | 'times'
    | 'search'
    | 'expand'

interface IconProps {
    size: number;
    color: string;
}

interface WrapperProps extends IconProps {
    circle?: boolean;
    square?: boolean;
    name: string;
}

interface IconComponentProps extends IconProps, WrapperProps {
    name: IconTypes;
    [x: string]: any;
}

const Wrapper = styled.div<WrapperProps>`
    ${({circle, size, color, name}) =>
        circle &&
        css `
            border: 2px solid ${color};
            border-radius: 50%;
            width: ${size + 20}px;
            height: ${size + 20}px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-left: ${name === 'play' && '4px'};
        `
    }

    ${({square, size}) =>
        square &&
        css `
            width: ${size + 15}px;
            height: ${size + 15}px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 4px;
            background-color: #2C3045;
        `
    }
`

const Icon: FC<IconComponentProps> = ({ name, color, size, circle = false, square = false, ...props }) => {
    return (
        <Wrapper {...props} color={color} name={name} circle={circle} square={square} size={size}>
            <FontAwesomeIcon color={color} icon={name} style={{fontSize: size}} />
        </Wrapper>
    )
}

export default Icon;