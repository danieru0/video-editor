import { videoDimensions, videoRef } from '../../types/video'; 
import { types } from './types';

export type videoActions = setVideoFileAction 
    | setVideoDimensionAction 
    | setVideoRefAction
    | setVideoVolumeAction
    | setVideoPlayAction
    | setVideoCurrentDurationAction
    | setVideoDurationAction
    | setVideoLengthAction
    | updateClickedItemAction
    | setVideoStyleAction;

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

interface setVideoVolumeAction {
    type: types.SET_VIDEO_VOLUME,
    payload: number;
}
export const setVideoVolume = (value: number): setVideoVolumeAction => ({
    type: types.SET_VIDEO_VOLUME,
    payload: value
});

interface setVideoPlayAction {
    type: types.SET_VIDEO_PLAY,
    payload: boolean;
}
export const setVideoPlay = (value: boolean): setVideoPlayAction => ({
    type: types.SET_VIDEO_PLAY,
    payload: value
});

interface setVideoCurrentDurationAction {
    type: types.SET_VIDEO_CURRENT_DURATION,
    payload: number;
}
export const setVideoCurrentDuration = (value: number): setVideoCurrentDurationAction => ({
    type: types.SET_VIDEO_CURRENT_DURATION,
    payload: value
});

interface setVideoDurationAction {
    type: types.SET_VIDEO_DURATION,
    payload: number;
}
export const setVideoDuration = (value: number): setVideoDurationAction => ({
    type: types.SET_VIDEO_DURATION,
    payload: value
});

interface setVideoLengthAction {
    type: types.SET_VIDEO_LENGTH,
    payload: number;
}
export const setVideoLength = (value: number): setVideoLengthAction => ({
    type: types.SET_VIDEO_LENGTH,
    payload: value
});

interface updateClickedItemAction {
    type: types.UPDATE_CLICKED_ITEM,
    payload: {name: string, type: string}
}
export const updateClickedItem = (value: {name: string, type: string}): updateClickedItemAction => ({
    type: types.UPDATE_CLICKED_ITEM,
    payload: value
});

interface setVideoStyleAction {
    type: types.SET_VIDEO_STYLE,
    payload: {type: string, value: number}
}
export const setVideoStyle = (value: {type: string, value: number}): setVideoStyleAction => ({
    type: types.SET_VIDEO_STYLE,
    payload: value
});