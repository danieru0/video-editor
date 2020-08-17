import React, { FC, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Moveable from 'react-moveable';
import { useTypedSelector } from '../../store/selector';
import { useDispatch } from 'react-redux';
import { types } from '../../store/actions/types';
import { OnDragEnd, OnRotateEnd, OnResizeEnd } from 'react-moveable'

import Block from '../atoms/Block';

interface ItemProps {
    type: string;
    index: number;
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
    imageSrc: string | null;
}

interface settingsProps {
    isActive: boolean | null;
    index: number;
}

const StyledBlock = styled(Block)<settingsProps>`
    display: ${({isActive}) => isActive ? 'flex' : 'none'};
    position: absolute;
    z-index: ${({index}) => index}!important;
`

const StyledMoveable = styled(Moveable)<settingsProps>`
    display: ${({isActive}) => isActive ? 'block' : 'none'}!important;
    z-index: ${({index}) => index}!important;
`

const Item: FC<ItemProps> = ({bounds, selector, time, name, color, type, textOptions, index, imageSrc}) => {
    const dispatch = useDispatch();
    const videoCurrentDuration = useTypedSelector(state => state.video.videoRef.currentDuration);
    const videoRef = useTypedSelector(state => state.video.videoRef.videoRef);
    const [target, setTarget] = useState<HTMLElement>();
    const [active, setActive] = useState(true);
    const [frame, setFrame] = useState({ //eslint-disable-line
        translate: [0,0],
        scale: [1,1],
        rotate: 0
    });
    const moveableRef = useRef<any>();
    const blockTextRef = useRef<HTMLDivElement>();
    const alignment = textOptions?.justifyContent;
    const fontSize = textOptions?.fontSize;

    useEffect(() => {
        if (type === 'text') {
            if (blockTextRef.current) {
                const videoRect = videoRef.getBoundingClientRect();
                const textRect = blockTextRef.current.children[0].getBoundingClientRect();
                const x = textRect.x - videoRect.x;
                const y = textRect.y - videoRect.y;

                dispatch({
                    type: types.UPDATE_TEXT_OPTIONS,
                    payload: {
                        name: name,
                        x: x,
                        y: y
                    }
                })

            }
        }
    }, [alignment, videoRef, type, dispatch, name])

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

    useEffect(() => {
        if (target && type === 'text') {
            const textRect = target.children[0].getBoundingClientRect();
            updateOptionsTextPosition(textRect.x, textRect.y);   
        }
    }, [fontSize, target, type]); //eslint-disable-line

    useEffect(() => {
        if (active && type === 'image') {
            moveableRef.current.updateRect();
        }
    }, [active, type])

    const updateOptionsTextPosition = (xRect: number, yRect: number) => {
        const videoRect = videoRef.getBoundingClientRect();
        dispatch({
            type: types.UPDATE_TEXT_OPTIONS,
            payload: {
                name: name,
                x: xRect - videoRect.x,
                y: yRect - videoRect.y
            }
        })
    }

    const handleDragEnd = (e: OnDragEnd) => {
        const targetRect = e.target.getBoundingClientRect();
        const videoRect = videoRef.getBoundingClientRect();
        dispatch({
            type: types.UPDATE_ITEM_POSITION,
            payload: {
                name: name,
                x: targetRect.x - videoRect.x,
                y: targetRect.y - videoRect.y
            }
        })

        if (type === 'text') {
            const textRect = e.target.children[0].getBoundingClientRect();
            updateOptionsTextPosition(textRect.x, textRect.y);
        }
    }

    const handleEndEvent = (e: OnRotateEnd | OnResizeEnd) => {
        if (type === 'text') {
            const textRect = e.target.children[0].getBoundingClientRect();
            updateOptionsTextPosition(textRect.x, textRect.y);
        }   
    }

    const handleItemClick = () => {
        if (type !== 'image') {
            dispatch({
                type: types.UPDATE_CLICKED_ITEM,
                payload: {
                    name: name,
                    type: type
                }
            })
        }
    }

    return (
        <>
            <StyledBlock onLoad={() => moveableRef.current.updateRect()} index={index + 4} isActive={active} ref={blockTextRef} id={selector} color={color} type={type} {...textOptions} text={textOptions?.text} imageSrc={imageSrc} />
            <StyledMoveable 
                index={index + 4}
                isActive={active}
                ref={moveableRef}
                target={target}
                scalable={textOptions ? false : true}
                resizable={textOptions ? true : false}
                rotatable={true}
                origin={false}
                dragArea={true}
                rotationPosition={"top"}
                keepRatio={textOptions ? false : true}
                onClick={handleItemClick}
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
                onScaleEnd={handleDragEnd}
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
                onRotateEnd={handleEndEvent}
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
                onResizeEnd={handleEndEvent}
            />
        </>
    );
}

export default Item;