import React, { FC, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTypedSelector } from '../../store/selector';
import { timeLine } from '../../types/timeline';

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

interface reversedItemsState {
    [x: number]: []
}

const Container = styled.div`
    position: relative;
`

const VideoItems: FC<VideoItemsProps> = ({...props}) => {
    const videoData = useTypedSelector(state => state.video.videoData);
    const timelineItems = useTypedSelector(state => state.timeline.timeline);
    const [bounds, setBounds] = useState<Bounds>()
    const [timelineItemsClone, setTimelineItemsClone] = useState<timeLine[]>();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.style.width = `${videoData.width}px`;
            containerRef.current.style.height = `${videoData.height}px`;
        }
    }, [containerRef, videoData.width, videoData.height])

    useEffect(() => {
        if (containerRef.current) {
            setBounds({
                "left": 0,
                "top": 0,
                "right": containerRef.current.offsetWidth,
                "bottom": containerRef.current.offsetHeight
            });
        }
    }, [containerRef, videoData.width])

    useEffect(() => {
        if (timelineItems) {
            setTimelineItemsClone([...timelineItems].reverse());

        }
    }, [timelineItems])

    return (
        <Container ref={containerRef} {...props}>
            {
                timelineItemsClone && timelineItemsClone.map((item, key) => {
                    if (item.item) {
                        return <Item key={item.name} type={item.item.itemType} name={item.name} color={item.item.color} selector={item.item.selector} time={item.item.time} bounds={bounds} />
                    }

                    return null;
                })
            }
        </Container>
    )
}

export default React.memo(VideoItems);