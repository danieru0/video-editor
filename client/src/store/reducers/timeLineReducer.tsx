import { produce } from 'immer';
import { timeLine } from '../../types/timeline';
import { types, Action } from '../actions/types';

export interface timeLineState {
    timeline: timeLine[];
}

const initState: timeLineState = {
    timeline: []
}

export default (state = initState, action: Action): timeLineState => {
    switch(action.type) {
        case types.CREATE_NEW_TRACK: {
            return produce(state, draft => {
                draft.timeline.push(action.payload)
            })
        }
        default: return state;
    }
}