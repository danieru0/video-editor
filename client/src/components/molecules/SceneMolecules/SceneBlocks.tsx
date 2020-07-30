import React, { FC } from 'react';
import styled from 'styled-components';
import { useTypedSelector } from '../../../store/selector';
import { useDispatch } from 'react-redux';
import { types } from '../../../store/actions/types';

import WithButton from '../../../hoc/withButton';

import Block, { BlocksArray } from '../../atoms/Block';

interface SceneBlocksProps {
    active: boolean;
}

const ButtonBlock = WithButton(Block);

const Container = styled.div<SceneBlocksProps>`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    overflow-y: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding: inherit;
    visibility: ${({active}) => active ? 'visible': 'hidden'};
`

const StyledBlock = styled(ButtonBlock)`
    margin: 5px;
`

const SceneBlocks: FC<SceneBlocksProps> = ({active}) => {
    const dispatch = useDispatch();
    const videoData = useTypedSelector(state => state.video.videoData);
    const trackList = useTypedSelector(state => state.timeline.timeline); 
    const timelineRef = useTypedSelector(state => state.timeline.timelineRef);

    const handleBlockClick = (e: any, type: string) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (timelineRef) {
            const endTime = 134 * videoData.videoLength / timelineRef.offsetWidth;

            if (trackList.length !== 0) {
                const textOptions = {
                    textAlign: 'center',
                    fontSize: '20px',
                    justifyContent: 'center',
                    fontFamily: 'Lato',
                    text: 'TEXT',
                    textColor: '#000',
                    textPosition: null
                }
                const newItem = {
                    type: type === 'text' ? 'drawtext' : 'overlay',
                    itemType: type,
                    width: 134,
                    xPosition: 0,
                    selector: Math.random().toString(36).substring(7),
                    color: '#fff',
                    time: {
                        start: 0,
                        end: endTime
                    },
                    videoPosition: {
                        x: 0,
                        y: 0
                    },
                    textOptions: type === 'text' ? textOptions : null
                }
    
                const tracksWithoutItems = trackList.filter(item => item.item === null);
    
                if (tracksWithoutItems.length !== 0) {
                    dispatch({
                        type: types.ADD_ITEM_TO_TRACK,
                        payload: {
                            item: newItem,
                            name: tracksWithoutItems[0].name
                        }
                    });
                } else {
                    console.log('every track has item!')
                }
            } else {
                console.log('no tracks!')
            }
        }

    }

    return (
        <Container active={active}>
            <StyledBlock onClick={(e: any) => handleBlockClick(e, 'text')} type="text" textAlign="center" fontSize="24px" border justifyContent="center">TEXT</StyledBlock>
            {
                BlocksArray.map((item, key) => {
                    return <StyledBlock key={key} onClick={(e: any) => handleBlockClick(e, item)} type={item} />
                })
            }
        </Container>
    )
}

export default SceneBlocks;