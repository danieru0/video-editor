import React, { FC, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../store/selector';
import { types } from '../../store/actions/types';

const StyledVideo = styled.video`

`

const VideoAtom: FC = () => {
    const dispatch = useDispatch();
    const videoFile = useTypedSelector(state => state.video.video);
    const videoData = useTypedSelector(state => state.video.videoData);
    const URL = window.URL || window.webkitURL;
    const videoRef = useRef<HTMLVideoElement>(null);

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
            videoData.play ? videoRef.current.play() : videoRef.current.pause();
            videoRef.current.currentTime = videoData.duration;
            videoRef.current.muted = videoData.muted;
            videoRef.current.volume = videoData.volume;
        }
    }, [videoData.play, videoData.muted, videoData.duration, videoData.volume]);

    const tick = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        dispatch({
            type: types.SET_VIDEO_CURRENT_DURATION,
            payload: { currentDuration: videoRef.current?.currentTime }
        });
    }

    return (
        <StyledVideo onTimeUpdate={tick} controls={false} ref={videoRef} />
    )
}

export default VideoAtom;