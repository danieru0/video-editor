import { combineReducers } from 'redux';
import testReducer, { TestState } from './testReducer';
import videoReducer, { VideoState } from './videoReducer';

export default combineReducers({
    test: testReducer,
    video: videoReducer
})

export type RootState = {
    test: TestState
    video: VideoState
}