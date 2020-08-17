import React, { FC, useRef, useEffect } from 'react';
import { useTypedSelector } from '../../store/selector';

interface VideoCanvasProps {
    videoRef: HTMLVideoElement;
    tick: number | undefined;
    [x: string]: any;
}

const VideoCanvas: FC<VideoCanvasProps> = ({ videoRef, tick, ...props }) => {
    const videoData = useTypedSelector(state => state.video.videoData);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasObj = canvasRef.current;
    const ctx = canvasObj?.getContext('2d');

    useEffect(() => {
            if (canvasObj) {
                canvasObj.width = videoData.width;
                canvasObj.height = videoData.height;
            }
    }, [videoData.width, videoData.height, canvasObj]);

    useEffect(() => {
        if (videoRef && ctx) {
            ctx.drawImage(videoRef, 0, 0)
        }
    }, [videoRef, tick, ctx]);

    return (
        <canvas {...props} ref={canvasRef}></canvas>
    )
}

export default VideoCanvas;