import React, { FC } from 'react';
import { useTypedSelector } from '../../../store/selector';
import { useDispatch } from 'react-redux';
import { types } from '../../../store/actions/types';

import SceneBlocks from './SceneBlocks';
import SceneMedia from './SceneMedia';

interface SceneConnectorProps {
    activeScene: number;
}

const SceneConnector: FC<SceneConnectorProps> = ({ activeScene }) => {
    const dispatch = useDispatch();
    const videoData = useTypedSelector(state => state.video.videoData);
    const trackList = useTypedSelector(state => state.timeline.timeline); 
    const timelineRef = useTypedSelector(state => state.timeline.timelineRef);

    const handleItemClick = (e: any, type: string, image?: string) => {
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
                    textOptions: type === 'text' ? textOptions : null,
                    imageSrc: image ? image : null
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
                    console.log('every track has item!');
                }
            } else {
                console.log('no tracks!');
            }
        }
    }

    return (
        <>
            <SceneBlocks onItemClick={handleItemClick} active={activeScene === 0} />
            <SceneMedia onItemClick={handleItemClick} active={activeScene === 1} />
        </>
    )
}

export default SceneConnector;