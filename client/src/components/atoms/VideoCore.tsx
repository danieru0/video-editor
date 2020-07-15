import React, { FC, useRef, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../store/selector';
import { types } from '../../store/actions/types';

interface VideoCoreProps {
    handleTick: (tick: number | undefined, videoRef: any) => void;
    [x: string]: any;
}

const StyledVideo = styled.video``;

const VideoCore: FC<VideoCoreProps> = ({ handleTick, ...props }) => {
    const dispatch = useDispatch();
    const videoFile = useTypedSelector(state => state.video.video);
    const videoData = useTypedSelector(state => state.video.videoData);
    const URL = window.URL || window.webkitURL;
    const videoRef = useRef<HTMLVideoElement>(null);

    let getTimeInterval: any;

    useEffect(() => {
        if (videoFile) {
            if (videoRef.current) {
                videoRef.current.src = URL.createObjectURL( videoFile );
                videoRef.current.addEventListener('loadeddata', (e: Event) => {
                    const element = e.target as HTMLVideoElement;
                    dispatch({
                        type: types.SET_VIDEO_DIMENSIONS,
                        payload: { width: element.offsetWidth, height: element.offsetHeight }
                    });
                });
            }
        }
    }, [videoFile, URL, dispatch]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = videoData.muted;
            videoRef.current.volume = videoData.volume;
        }
    }, [videoData.muted, videoData.volume]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = videoData.duration;
            handleTick(videoRef.current.currentTime, videoRef.current);
        }
    }, [videoData.duration]); //eslint-disable-line

    useEffect(() => {
        if (videoRef.current) {
            videoData.play ? videoRef.current.play() : videoRef.current.pause();
        }

        return () => clearInterval(getTimeInterval);
    }, [videoData.play, getTimeInterval])

    const tickStart = () => {
        getTimeInterval = setInterval(() => {
            handleTick(videoRef.current?.currentTime, videoRef.current);
        }, 30)
    }

    return (
        <StyledVideo {...props} onPlay={tickStart} controls={false} ref={videoRef} />
    )
}

export default VideoCore;