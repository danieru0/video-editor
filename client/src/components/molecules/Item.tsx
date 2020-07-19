import React, { FC, useState, useEffect } from 'react';
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
        translate: [0,0]
    });

    useEffect(() => {
        const blockElement = document.querySelector<HTMLDivElement>('.siemaneko');

        if (blockElement) {
            setTarget(blockElement);
        }
    }, [])

    return (
        <>
            <Block className="siemaneko" type="Triangle" />
            <Moveable 
                target={target}
                origin={true}
                draggable={true}
                bounds={bounds}
                snappable={true}
                onDragStart={({ set }) => {
                    set(frame.translate);
                }}
                onDrag={({ target, beforeTranslate }) => {
                    frame.translate = beforeTranslate;
                    target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
                }}
            />
        </>
    )
}

export default Item;