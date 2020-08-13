import { combineReducers } from 'redux';
import testReducer, { TestState } from './testReducer';
import videoReducer, { VideoState } from './videoReducer';
import timeLineReducer, { timeLineState } from './timeLineReducer';
import modalReducer, { ModalState } from './modalReducer';
import exportReducer, { exportState } from './exportReducer';

export default combineReducers({
    test: testReducer,
    video: videoReducer,
    timeline: timeLineReducer,
    modal: modalReducer,
    export: exportReducer
})

export type RootState = {
    test: TestState
    video: VideoState,
    timeline: timeLineState
    modal: ModalState
    export: exportState
}