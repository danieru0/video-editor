import { combineReducers } from 'redux';
import testReducer, { TestState } from './testReducer';
import videoReducer, { VideoState } from './videoReducer';
import timeLineReducer, { timeLineState } from './timeLineReducer';

export default combineReducers({
    test: testReducer,
    video: videoReducer,
    timeline: timeLineReducer
})

export type RootState = {
    test: TestState
    video: VideoState,
    timeline: timeLineState
}