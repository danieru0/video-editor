import React, { FC, useRef, useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../store/selector';
import { types } from '../../store/actions/types';

import Item from './Item';

interface VideoItemsProps {
    [x: string]: any;
}

interface Bounds {
    left: number;
    top: number;
    right: number;
    bottom: number;
}

const Container = styled.div`

`

const VideoItems: FC<VideoItemsProps> = ({...props}) => {
    const videoData = useTypedSelector(state => state.video.videoData);
    const [bounds, setBounds] = useState<Bounds>()
    const containerRef = useRef<HTMLDivElement>(null);

    const calculateBounds = useCallback(() => {
        const containerRect = containerRef.current?.getBoundingClientRect();

        if (containerRect) {
            return {
                "left": containerRect.left,
                "top": containerRect.top,
                "right": videoData.width + containerRect.left,
                "bottom": videoData.height + containerRect.top
            }
        }
    }, [videoData.height, videoData.width]);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
    })

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.style.width = `${videoData.width}px`;
            containerRef.current.style.height = `${videoData.height}px`;
        }
    }, [containerRef, videoData.width, videoData.height])

    useEffect(() => {
        if (containerRef.current) {
            setBounds(calculateBounds());
        }
    }, [containerRef, calculateBounds])


    const handleResize = () => {
       setBounds(calculateBounds());
    }

    return (
        <Container ref={containerRef} {...props}>
            {
                videoData.width && (
                    <Item bounds={bounds} containerRef={containerRef.current} />
                )
            }
        </Container>
    )
}

export default React.memo(VideoItems);