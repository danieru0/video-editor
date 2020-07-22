import React, { FC } from 'react';
import styled from 'styled-components';
import { useTypedSelector } from '../../../store/selector';
import { useDispatch } from 'react-redux';
import { types } from '../../../store/actions/types';

import WithButton from '../../../hoc/withButton';

import Block from '../../atoms/Block';

const ButtonBlock = WithButton(Block);

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
`

const StyledBlock = styled(ButtonBlock)`
    margin: 5px;
`

const SceneBlocks: FC = () => {
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
                    textColor: '#000'
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
        <Container>
            <StyledBlock onClick={(e: any) => handleBlockClick(e, 'text')} type="text" textAlign="center" fontSize="24px" border justifyContent="center">TEXT</StyledBlock>
            <StyledBlock onClick={(e: any) => handleBlockClick(e, 'Triangle')} type="Triangle"/>
            <StyledBlock onClick={(e: any) => handleBlockClick(e, 'Octagon')} type="Octagon"/>
            <StyledBlock onClick={(e: any) => handleBlockClick(e, 'Trapezoid')} type="Trapezoid"/>
        </Container>
    )
}

export default SceneBlocks;