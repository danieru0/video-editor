import { combineReducers } from 'redux';
import videoReducer, { VideoState } from './videoReducer';
import timeLineReducer, { timeLineState } from './timeLineReducer';
import modalReducer, { ModalState } from './modalReducer';
import exportReducer, { exportState } from './exportReducer';
import renderReducer, { RenderState } from './renderReducer';

export default combineReducers({
    video: videoReducer,
    timeline: timeLineReducer,
    modal: modalReducer,
    export: exportReducer,
    render: renderReducer
})

export type RootState = {
    video: VideoState,
    timeline: timeLineState
    modal: ModalState
    export: exportState
    render: RenderState
}