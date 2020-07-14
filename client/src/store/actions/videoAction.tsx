import { videoDimensions, videoCurrentDuration } from '../../types/video'; 
import { types } from './types';

export type videoActions = setVideoFileAction | setVideoDimensionAction | setVideoCurrentDurationAction;

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

interface setVideoCurrentDurationAction {
    type: types.SET_VIDEO_CURRENT_DURATION;
    payload: videoCurrentDuration;
}
export const setVideoCurrentDuration = (value: videoCurrentDuration): setVideoCurrentDurationAction => ({
    type: types.SET_VIDEO_CURRENT_DURATION,
    payload: value
})