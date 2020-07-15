import { videoData, videoRef } from '../../types/video';
import { types, Action } from '../actions/types';

export interface VideoState {
    video: File | null;
    videoData: videoData;
    videoRef: videoRef;
}

const initState: VideoState = {
    video: null,
    videoData: {
        width: 0,
        height: 0,
        play: false,
        volume: 1,
        duration: 0,
        muted: false
    },
    videoRef: {
        currentDuration: 0,
        videoRef: null
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
        case types.SET_VIDEO_REF: {
            return {...state, videoRef: { ...state.videoRef, currentDuration: action.payload.currentDuration, videoRef: action.payload.videoRef }}
        }
        case types.SET_VIDEO_VOLUME: {
            return {...state, videoData: { ...state.videoData, volume: action.payload }}
        }
        case types.SET_VIDEO_PLAY: {
            return {...state, videoData: { ...state.videoData, play: action.payload }}
        }
        case types.SET_VIDEO_CURRENT_DURATION: {
            return {...state, videoRef: { ...state.videoRef, currentDuration: action.payload }}
        }
        case types.SET_VIDEO_DURATION: {
            return {...state, videoData: { ...state.videoData, duration: action.payload }};
        }
        default: return state;
    }
}