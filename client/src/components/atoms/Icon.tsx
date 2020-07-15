import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import * as Ionicons from 'react-icons/io'

type IconTypes = 'IoIosPlay'
    | 'IoIosVolumeHigh'
    | 'IoIosPause'
    | 'IoIosSkipForward'
    | 'IoIosSkipBackward'
    | 'IoIosPulse'
    | 'IoIosTrash'

interface IconProps {
    size: number;
    color: string;
}

interface WrapperProps extends IconProps {
    circle?: boolean;
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
            width: ${size + 10}px;
            height: ${size + 10}px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-left: ${name === 'IoIosPlay' && '4px'};
        `
    }
`

const Icon: FC<IconComponentProps> = ({ name, color, size, circle = false, ...props }) => {
    const Icon = Ionicons[name];
    
    return (
        <Wrapper {...props} color={color} name={name} circle={circle} size={size}>
            <Icon color={color} size={size} />
        </Wrapper>
    )
}

export default Icon;