import React, { FC } from 'react';
import styled from 'styled-components';
import { useTypedSelector } from '../../store/selector';
import { useDispatch } from 'react-redux';
import { types } from '../../store/actions/types';
import { item } from '../../types/timeline';
import domtoimage from 'dom-to-image';
import axios from 'axios';
import download from 'downloadjs';

import getRotationAngle from '../../helpers/getRotationAngle';
import imageSizeAfterRotation from '../../helpers/imageSizeAfterRotation';
import dataURLtoFile from '../../helpers/dataURLtoFile'
import asyncForEach from '../../helpers/asyncForEach';

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

const Controls: FC = () => {
    const dispatch = useDispatch();
    const videoFile = useTypedSelector(state => state.video.video);
    const trackList = useTypedSelector(state => state.timeline.timeline);
    const exportState = useTypedSelector(state => state.export.exportActive);

    const handleExportClick = async () => {
        if (videoFile && trackList.length !== 0 && exportState !== true && window.confirm('Are you sure?')) {      
            dispatch({
                type: types.SET_EXPORT_STATE,
                payload: true
            });
            dispatch({
                type: types.UPDATE_MODAL_DATA,
                payload: {
                    type: 'rendering',
                    name: 'render'
                }
            })
            dispatch({
                type: types.SET_RENDER_STATUS,
                payload: true
            })
            dispatch({
                type: types.SET_RENDER_MESSAGE,
                payload: 'Converting all into images'
            })

            const ffmpegData: any[] = [];
            const formData = new FormData();

            await asyncForEach([...trackList].reverse(), async (item: {name: string, item: item}) => {
                if (item.item && item.item.time) {
                    const node = document.getElementById(item.item.selector) as HTMLElement;
                    const position: {x: number, y: number} = {
                        x: 0,
                        y: 0,
                    }
                    let toRender: HTMLElement | Element;
                    let prevDisplay: string = '';

                    if (item.item.itemType === 'text' && item.item.textOptions?.textPosition) {
                        toRender = node.children[0];
                        position.x = item.item.textOptions.textPosition.x;
                        position.y = item.item.textOptions.textPosition.y;
                    } else {
                        toRender = item.item.itemType === 'image' ? node.children[0] : node;
                        position.x = item.item.videoPosition.x;
                        position.y = item.item.videoPosition.y;
                    }

                    prevDisplay = node.style.display;
                    node.style.display = 'flex';

                    const rect = toRender.getBoundingClientRect();
                    const rotation = getRotationAngle(node);
                    const size = imageSizeAfterRotation([rect.width, rect.height], rotation);
                    const dataUrl = await domtoimage.toPng(toRender, { width: rect.width, height: rect.height, style: {width: rect.width, transformOrigin: 'center', transform: `translate(0) scale(${rect.width / size[0]}) rotate(${rotation}deg)`} });
                    const imageFile = dataURLtoFile(dataUrl, `${item.item.selector}.png`);
                    const time = `t,${item.item.time.start}, ${item.item.time.end}`;

                    ffmpegData.push({
                        type: 'overlay',
                        image: `${item.item.selector}.png`,
                        time: time,
                        position: position
                    });

                    formData.append('images', imageFile);
                    node.style.display = prevDisplay;
                }
            })
    
            formData.append('video', videoFile);
            formData.append('videoEditor', JSON.stringify(ffmpegData));

            if (formData.has('images')) {
                try {
                    const result = await axios({
                        url: 'upload-video',
                        method: 'post',
                        data: formData,
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        responseType: 'blob',
                        onUploadProgress: progress => {
                            const { total, loaded } = progress;
                            const totalSize = total / 1000000;
                            const loadedSize = loaded / 1000000;
                            const percentage = (loadedSize / totalSize) * 100;
                            if (percentage !== 100) {
                                dispatch({
                                    type: types.SET_RENDER_MESSAGE,
                                    payload: `Uploading video: ${Math.floor(percentage)}%`
                                });
                            } else {
                                dispatch({
                                    type: types.SET_RENDER_MESSAGE,
                                    payload: `Rendering video! Please wait...`
                                });
                            }
                        }
                    });
    
                    if (result) {
                        dispatch({
                            type: types.SET_EXPORT_STATE,
                            payload: false
                        });
                        dispatch({
                            type: types.SET_RENDER_STATUS,
                            payload: false
                        })
                        dispatch({
                            type: types.SET_RENDER_MESSAGE,
                            payload: 'Done!'
                        });
                        download(result.data, 'video.mp4');
                    }
                } catch (err) {
                    throw err;
                }
            } else {
                dispatch({
                    type: types.SET_EXPORT_STATE,
                    payload: false
                });
                dispatch({
                    type: types.SET_RENDER_STATUS,
                    payload: false
                })
                dispatch({
                    type: types.SET_RENDER_MESSAGE,
                    payload: ''
                })
                dispatch({
                    type: types.SET_RENDER_ERROR,
                    payload: 'Nothing to render!'
                })
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