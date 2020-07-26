import { combineReducers } from 'redux';
import testReducer, { TestState } from './testReducer';
import videoReducer, { VideoState } from './videoReducer';
import timeLineReducer, { timeLineState } from './timeLineReducer';
import modalReducer, { ModalState } from './modalReducer';

export default combineReducers({
    test: testReducer,
    video: videoReducer,
    timeline: timeLineReducer,
    modal: modalReducer
})

export type RootState = {
    test: TestState
    video: VideoState,
    timeline: timeLineState
    modal: ModalState
}