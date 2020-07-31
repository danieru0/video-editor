import React, { FC } from 'react';
import styled from 'styled-components';
import { Rnd } from 'react-rnd';
import { useDispatch } from 'react-redux';
import { types } from '../../store/actions/types';
import { item } from '../../types/timeline';

interface TrackProps {
    item: item | null;
    timelineRef: any;
    videoLength: number;
    name: string;
}

const Container = styled.div`
    width: 100%;
    height: 60px;
    background-color: ${({theme}) => theme.secondary};
    margin: 10px 0px;
`

const Image = styled.img`
    width: 100%;
`

const Track: FC<TrackProps> = ({name, item, timelineRef, videoLength}) => {
    const dispatch = useDispatch();
    let trackItemElement: any;

    const handleDragStop = (e: any, x: number) => {
        if (timelineRef && item) {
            const startTime = x * videoLength / timelineRef.current.offsetWidth;
            const endTime = (e.target.offsetWidth * videoLength / timelineRef.current.offsetWidth) + startTime;

            dispatch({
                type: types.UPDATE_ITEM_TRACK_POSITION,
                payload: {
                    xPosition: x,
                    start: startTime,
                    end: endTime,
                    name: name
                }
            })
        }
    }

    const handleResizeStop = (e: any, ref: any, x: number) => {
        if (timelineRef) {
            const startTime = x * videoLength / timelineRef.current.offsetWidth;
            const endTime = (Number(ref.style.width.replace('px', '')) * videoLength / timelineRef.current.offsetWidth) + startTime;

            dispatch({
                type: types.UPDATE_ITEM_TRACK_SIZE,
                payload: {
                    name: name,
                    width: ref.style.width,
                    xPosition: x,
                    start: startTime,
                    end: endTime
                }
            })
        }
    }

    switch(item?.itemType) {
        case 'image':
            trackItemElement = <Image src={item.imageSrc ? item.imageSrc : undefined} />
            break;
        case 'text':
            trackItemElement = item.textOptions?.text;
            break;
        default:
            trackItemElement = null;
            break;
    }
    
    return (
        <Container>
            {item && (
                <Rnd
                    style={{
                        position: 'relative',
                        display: 'flex',
                        background: item.color,
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden',
                        fontSize: '18px',
                        fontFamily: 'Lato',
                        color: item.textOptions ? item.textOptions.textColor : '',
                    }}
                    position={{
                        x: item.xPosition,
                        y: 0,
                    }}
                    onResizeStop={(e, d, ref, delta, position) => handleResizeStop(e, ref, position.x)}
                    onDragStop={(e, d) => handleDragStop(e, d.x)}
                    bounds="parent"
                    dragAxis="x"
                    size={{
                        width: item.width,
                        height: 60
                    }}
                    enableResizing={{
                        top: false,
                        right: true,
                        bottom: false,
                        left: true,
                        topRight: false,
                        bottomRight: false,
                        bottomLeft: false,
                        topLeft: false,
                    }}
                >
                    {
                        trackItemElement
                    }
                </Rnd>
            )}
        </Container>
    )
}

export default Track;