import React, { FC, useRef } from 'react';
import styled from 'styled-components';
import { Rnd } from 'react-rnd';
import Icon from '../atoms/Icon';

interface TimeArrowProps {
    height: number;
    positionChange: (x: number, e: any) => void;
    xPosition: number;
    yPosition: number;
}

const Timer = styled.div`
    width: 5px;
    height: 100%;
    background: #CFD4E1;
    position: relative;
`

const StyledIcon = styled(Icon)`
    transform: rotate(90deg);
    position: absolute;
    left: -12px;
    top: 7px;
`

const TimeArrow: FC<TimeArrowProps> = ({height, positionChange, xPosition, yPosition }) => {
    return (
        <Rnd
            position={{
                x: xPosition,
                y: yPosition
            }}
            style={{
                position: 'relative',
                display: 'block'
            }}
            dragAxis='x'
            size={{
                width: 5,
                height: height - 63
            }}
            onDrag={(e, d) => positionChange(d.x, e)}
            enableResizing={{
                top: false,
                right: false,
                bottom: false,
                left: false,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false,
            }}
            >
                <Timer>
                    <StyledIcon size={26} color='#fff' name="IoIosPlay" />
                </Timer>
            </Rnd>
    )
}

export default TimeArrow;