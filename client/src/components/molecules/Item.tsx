import React, { FC, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Moveable from 'react-moveable';
import { useTypedSelector } from '../../store/selector';
import { useDispatch } from 'react-redux';
import { types } from '../../store/actions/types';

import Block from '../atoms/Block';

interface ItemProps {
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
    name: string;
    color: string;
    textOptions: {
        textAlign: string;
        fontSize: string;
        justifyContent: string;
        fontFamily: string;
        text: string;
        textColor: string;
    } | null;
}

interface isActiveProp {
    isActive: boolean | null;
}

const Container = styled.div<isActiveProp>`
    display: ${({isActive}) => isActive ? 'block' : 'none'};
    position: absolute;
`

const Item: FC<ItemProps> = ({bounds, selector, time, name, color, type, textOptions}) => {
    const dispatch = useDispatch();
    const videoCurrentDuration = useTypedSelector(state => state.video.videoRef.currentDuration);
    const [target, setTarget] = useState<HTMLElement>();
    const [active, setActive] = useState(true);
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
        if (time && videoCurrentDuration >= time.start && videoCurrentDuration <= time.end) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [time, videoCurrentDuration]);

    const handleDragEnd = () => {
        dispatch({
            type: types.UPDATE_ITEM_POSITION,
            payload: {
                name: name,
                x: frame.translate[0],
                y: frame.translate[1]
            }
        })
    }

    const handleItemClick = () => {
        dispatch({
            type: types.UPDATE_CLICKED_ITEM,
            payload: {
                name: name,
                type: type
            }
        })
    }

    return (
        <Container isActive={active}>
            {
                textOptions ? (
                    <Block id={selector} color={color} type={type} {...textOptions}>{textOptions.text}</Block>
                ) : (
                    <Block id={selector} color={color} type={type} />
                )
            }
            <Moveable 
                ref={moveableRef}
                target={target}
                scalable={textOptions ? false : true}
                resizable={textOptions ? true : false}
                dragArea={true}
                rotatable={true}
                origin={false}
                rotationPosition={"top"}
                keepRatio={textOptions ? false : true}
                draggable={true}
                snappable={true}
                throttleScale={0}
                bounds={bounds}
                onClick={handleItemClick}
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
                onDragEnd={handleDragEnd}
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
                onResizeStart={({ setOrigin, dragStart }) => {
                    setOrigin(["%", "%"]);
                    dragStart && dragStart.set(frame.translate);
                }}
                onResize={({ target, width, height, drag }) => {
                    const beforeTranslate = drag.beforeTranslate;
                
                    frame.translate = beforeTranslate;
                    target.style.width = `${width}px`;
                    target.style.height = `${height}px`;
                    target.style.transform 
                        = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`
                        + `rotate(${frame.rotate}deg)`;
                }}
            />
        </Container>
    );
}

export default Item;