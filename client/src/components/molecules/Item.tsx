import React, { FC, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Moveable from 'react-moveable';

import Block from '../atoms/Block';

interface ItemProps {
    containerRef: any;
    bounds: {
        left: number;
        top: number;
        bottom: number;
        right: number;
    } | undefined;
}

const Item: FC<ItemProps> = ({containerRef, bounds}) => {
    const [target, setTarget] = useState<HTMLDivElement>();
    const [frame, setFrame] = useState({ //eslint-disable-line
        translate: [0,0],
        scale: [1,1],
        rotate: 0
    });
    const moveableRef = useRef<any>();

    useEffect(() => {
        const blockElement = document.querySelector<HTMLDivElement>('.siemaneko');

        if (blockElement) {
            setTarget(blockElement);
        }
    }, [])

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []) //eslint-disable-line


    const handleResize = () => {
        moveableRef.current?.updateRect();
     }

    return (
        <>
            <Block className="siemaneko" type="Triangle" />
            <Moveable 
                ref={moveableRef}
                target={target}
                scalable={true}
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
        </>
    )
}

export default Item;