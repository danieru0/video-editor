import React, { FC, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Moveable from 'react-moveable';
import { useTypedSelector } from '../../store/selector';

import Block from '../atoms/Block';

interface ItemProps {
    containerRef: any;
    type: string;
    bounds: {
        left: number;
        top: number;
        bottom: number;
        right: number;
    } | undefined;
    selector: string;
    time: {
        start: number;
        end: number;
    } | null;
    videoPosition: {
        x: number;
        y: number;
    }
    name: string;
    color: string;
}

interface isActiveProp {
    isActive: boolean | null;
}

const Container = styled.div<isActiveProp>`
    display: ${({isActive}) => isActive ? 'block' : 'none'};
    position: absolute;
`

const Item: FC<ItemProps> = ({containerRef, bounds, selector, time, videoPosition, name, color, type}) => {
    const videoCurrentDuration = useTypedSelector(state => state.video.videoRef.currentDuration);
    const [target, setTarget] = useState<HTMLElement>();
    const [frame, setFrame] = useState({ //eslint-disable-line
        translate: [0,0],
        scale: [1,1],
        rotate: 0
    });
    const moveableRef = useRef<any>();

    useEffect(() => {
        const blockElement = document.getElementById(selector);

        if (blockElement) {
            setTarget(blockElement);
        }
    }, [selector])

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []) //eslint-disable-line

    const handleResize = () => {
        moveableRef.current?.updateRect();
    }

    return (
        <Container isActive={time && videoCurrentDuration >= time.start && videoCurrentDuration <= time.end}>
            <Block id={selector} color={color} type={type} />
            <Moveable 
                ref={moveableRef}
                target={target}
                scalable={true}
                dragArea={true}
                rotatable={true}
                rotationPosition={"top"}
                keepRatio={true}
                draggable={true}
                snappable={true}
                throttleScale={0}
                bounds={bounds}
                onDragStart={({ set }) => {
                    set(frame.translate);
                }}
                onDrag={({ target, beforeTranslate }) => {
                    frame.translate = beforeTranslate;
                    target.style.transform
                        = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`
                        + ` scale(${frame.scale[0]}, ${frame.scale[1]})`
                        + `rotate(${frame.rotate}deg)`;
                }}
                onScaleStart={({ set, dragStart }) => {
                    set(frame.scale);
                    dragStart && dragStart.set(frame.translate);
                }}
                onScale={({ target, scale, drag }) => {
                    const beforeTranslate = drag.beforeTranslate;
                    frame.translate = beforeTranslate;
                    frame.scale = scale;
                    target.style.transform
                        = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`
                        + ` scale(${scale[0]}, ${scale[1]})`
                        + `rotate(${frame.rotate}deg)`;
                }}
                onRotateStart={({ set }) => {
                    set(frame.rotate);
                }}
                onRotate={({ target, beforeRotate }) => {
                    frame.rotate = beforeRotate;
                    target.style.transform
                        = `translate(${frame.translate[0]}px, ${frame.translate[1]}px)`
                        + ` scale(${frame.scale[0]}, ${frame.scale[1]})`
                        + `rotate(${beforeRotate}deg)`;
                }}
            />
        </Container>
    );
}

export default Item;