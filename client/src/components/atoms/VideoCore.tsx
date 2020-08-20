import React, { FC, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../store/selector';
import { types } from '../../store/actions/types';

import getSizesWithoutPadding from '../../helpers/getSizesWithoutPadding';

interface VideoCoreProps {
    handleTick: (tick: number | undefined, videoRef: HTMLVideoElement) => void;
    [x: string]: any;
}

const StyledVideo = styled.video``;

const VideoCore: FC<VideoCoreProps> = ({ handleTick, ...props }) => {
    const dispatch = useDispatch();
    const videoFile = useTypedSelector(state => state.video.video);
    const videoData = useTypedSelector(state => state.video.videoData);
    const URL = window.URL || window.webkitURL;
    const videoRef = useRef<HTMLVideoElement>(document.createElement('video'));

    let getTimeInterval: any;

    useEffect(() => {
        if (videoFile) {
            videoRef.current.src = URL.createObjectURL(videoFile);
            videoRef.current.addEventListener('loadeddata', (e: Event) => {
                const element = e.target as HTMLVideoElement;
                dispatch({
                    type: types.SET_VIDEO_DIMENSIONS,
                    payload: { width: getSizesWithoutPadding(element)[0], height: getSizesWithoutPadding(element)[1] }
                });
                dispatch({
                    type: types.SET_VIDEO_LENGTH,
                    payload: element.duration
                });
            });
        }
    }, [videoFile, URL, dispatch]);

    useEffect(() => {
        videoRef.current.muted = videoData.muted;
        videoRef.current.volume = videoData.volume;
    }, [videoData.muted, videoData.volume]);

    useEffect(() => {
        videoRef.current.currentTime = videoData.duration;
        handleTick(videoRef.current.currentTime, videoRef.current);
    }, [videoData.duration]); //eslint-disable-line

    useEffect(() => {
        videoData.play ? videoRef.current.play() : videoRef.current.pause();

        return () => clearInterval(getTimeInterval);
    }, [videoData.play, getTimeInterval])

    const tickStart = () => {
        getTimeInterval = setInterval(() => {
            handleTick(videoRef.current.currentTime, videoRef.current);
        }, 30)
    }

    const handleEnd = () => {
        dispatch({
            type: types.SET_VIDEO_PLAY,
            payload: false
        });
    }

    return (
        <StyledVideo {...props} onPlay={tickStart} onEnded={handleEnd} controls={false} ref={videoRef} />
    )
}

export default VideoCore;