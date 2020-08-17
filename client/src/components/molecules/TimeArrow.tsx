import React, { FC, useState, useEffect, RefObject } from 'react';
import styled from 'styled-components';
import { Rnd } from 'react-rnd';
import Icon from '../atoms/Icon';
import { useTypedSelector } from '../../store/selector';

interface TimeArrowProps {
    height: number;
    positionChange: (x: number, e: any) => void;
    timelineRef: RefObject<HTMLDivElement>
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
    left: -7px;
    top: 12px;
`

const TimeArrow: FC<TimeArrowProps> = ({height, positionChange, timelineRef}) => {
    const [xPosition, setXPosition] = useState(0);
    const videoRef = useTypedSelector(state => state.video.videoRef);
    const videoData = useTypedSelector(state => state.video.videoData);

    useEffect(() => {
        if (timelineRef.current) {
            const calc = (videoRef.currentDuration / videoData.videoLength ) * timelineRef.current.offsetWidth;
            setXPosition(calc);
        }
    }, [videoRef.currentDuration, videoData.videoLength, timelineRef]);

    useEffect(() => {
        const updatePosition = () => {
            if (timelineRef.current) {
                const calc = (videoRef.currentDuration / videoData.videoLength ) * timelineRef.current.offsetWidth;
                setXPosition(calc);
            }
        }

        window.addEventListener('resize', updatePosition);

        return () => window.removeEventListener('resize', updatePosition);
    }, [timelineRef, videoData.videoLength, videoRef.currentDuration]);

    return (
        <Rnd
            position={{
                x: xPosition,
                y: 0
            }}
            style={{
                position: 'absolute',
                display: 'block'
            }}
            bounds="parent"
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
                    <StyledIcon size={20} color='#fff' name="play" />
                </Timer>
            </Rnd>
    )
}

export default TimeArrow;