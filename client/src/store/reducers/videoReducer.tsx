import { videoData } from '../../types/video';
import { types, Action } from '../actions/types';

export interface VideoState {
    video: File | null;
    videoData: videoData;
}

const initState: VideoState = {
    video: null,
    videoData: {
        width: 0,
        height: 0,
        play: false,
        volume: 1,
        duration: 0,
        currentDuration: 0,
        muted: false
    }
}

export default (state = initState, action: Action): VideoState => {
    switch(action.type) {
        case types.SET_VIDEO_FILE: {
            return {...state, video: action.payload}
        }
        case types.SET_VIDEO_DIMENSIONS: {
            return {...state, videoData: { ...state.videoData, width: action.payload.width, height: action.payload.height }}
        }
        case types.SET_VIDEO_CURRENT_DURATION: {
            return {...state, videoData: { ...state.videoData, currentDuration: action.payload.currentDuration }}
        }
        default: return state;
    }
}