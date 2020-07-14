import { videoDimensions, videoCurrentDuration, videoRef } from '../../types/video'; 
import { types } from './types';

export type videoActions = setVideoFileAction | setVideoDimensionAction | setVideoRefAction;

interface setVideoFileAction {
    type: types.SET_VIDEO_FILE,
    payload: File;
}
export const setVideoFile = (value: File): setVideoFileAction => ({
    type: types.SET_VIDEO_FILE,
    payload: value
})

interface setVideoDimensionAction {
    type: types.SET_VIDEO_DIMENSIONS,
    payload: videoDimensions;
}
export const setVideoDimensions = (value: videoDimensions): setVideoDimensionAction => ({
    type: types.SET_VIDEO_DIMENSIONS,
    payload: value
})

interface setVideoRefAction {
    type: types.SET_VIDEO_REF;
    payload: videoRef;
}
export const setVideoRef = (value: videoRef): setVideoRefAction => ({
    type: types.SET_VIDEO_REF,
    payload: value
});

