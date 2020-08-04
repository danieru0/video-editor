import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useTypedSelector } from '../../store/selector';
import { useDispatch } from 'react-redux';
import { types } from '../../store/actions/types';
import domtoimage from 'dom-to-image';
import axios from 'axios';

import getRotationAngle from '../../helpers/getRotationAngle';
import imageSizeAfterRotation from '../../helpers/imageSizeAfterRotation';
import dataURLtoFile from '../../helpers/dataURLtoFile';

import VolumeInput from '../molecules/VolumeInput';
import ControlsPlay from '../molecules/ControlsPlay';
import ExportButton from '../atoms/ExportButton';

const Container = styled.div`
    width: 100%;
    height: 70px;
    background-color: ${({theme}) => theme.secondary};
    display: flex;
    align-items: center;
    padding: 0px 20px;
    justify-content: space-between;
    z-index: 2;
`


async function asyncForEach(array: any, callback: any) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

const Controls: FC = () => {
    const dispatch = useDispatch();
    const videoData = useTypedSelector(state => state.video.videoData);
    const videoFile = useTypedSelector(state => state.video.video);
    const trackList = useTypedSelector(state => state.timeline.timeline);

    const handleExportClick = async () => {
        if (videoFile) {            
            const ffmpegData: any[] = [];
            const formData = new FormData();

            await asyncForEach(trackList, async (item: any) => {
                if (item.item && item.item.time) {
                    if (item.item.type === 'overlay') {
                        const node = document.getElementById(item.item.selector) as HTMLElement;
                        let toRender: any;
                        
                        if (item.item.itemType === 'image') {
                            toRender = node.children[0]
                        } else {
                            toRender = node;
                        }

                        const rect = node.getBoundingClientRect();
                        const rotation = getRotationAngle(node);
                        const size = imageSizeAfterRotation([rect.width, rect.height], rotation);
                        const dataUrl = await domtoimage.toPng(toRender, { width: rect.width, height: rect.height, style: {width: rect.width, transformOrigin: 'center', transform: `translate(0) scale(${rect.width / size[0]}) rotate(${rotation}deg)`} });
                        const imageFile = dataURLtoFile(dataUrl, `${item.item.selector}.png`);
                        const time = `t,${item.item.time.start}, ${item.item.time.end}`;

                        ffmpegData.push({
                            type: 'overlay',
                            image: `${item.item.selector}.png`,
                            time: time,
                            position: {
                                x: item.item.videoPosition.x,
                                y: item.item.videoPosition.y
                            }
                        })

                        formData.append('images', imageFile);
                    }
                }
            })
    
            formData.append('video', videoFile);
            formData.append('videoEditor', JSON.stringify(ffmpegData));

            try {
                const result = await axios({
                    url: 'upload-video',
                    method: 'post',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                console.log(result);
            } catch (err) {
                throw err;
            }
        }
    }

    return (
        <Container>
            <VolumeInput />
            <ControlsPlay />
            <ExportButton onClick={handleExportClick}/>
        </Container>
    )
}

export default Controls;