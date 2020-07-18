import { produce } from 'immer';
import { timeLine } from '../../types/timeline';
import { types, Action } from '../actions/types';

export interface timeLineState {
    timeline: timeLine[];
    timelineRef: any;
}

const initState: timeLineState = {
    timeline: [],
    timelineRef: null
}

export default (state = initState, action: Action): timeLineState => {
    switch(action.type) {
        case types.CREATE_NEW_TRACK: {
            return produce(state, draft => {
                draft.timeline.push(action.payload)
            })
        }
        case types.ADD_ITEM_TO_TRACK: {
            return produce(state, draft => {
                draft.timeline.forEach(item => {
                    if (item.name === action.payload.name) {
                        item.item = action.payload.item
                    }
                })
            })
        }
        case types.UPDATE_ITEM_TRACK: {
            return produce(state, draft => {
                draft.timeline.forEach(item => {
                    if (item.name === action.payload.name) {
                        if (item.item) {
                            item.item.time = {start: action.payload.start, end: action.payload.end}
                        }
                    }
                })
            })
        }
        case types.SET_TIMELINE_REF: {
            return {...state, timelineRef: action.payload}
        }
        case types.UPDATE_ITEM_TRACK_POSITION: {
            return produce(state, draft => {
                draft.timeline.forEach(item => {
                    if (item.name === action.payload.name) {
                        if (item.item) {
                            item.item.xPosition = action.payload.xPosition;
                            item.item.time = {start: action.payload.start, end: action.payload.end};
                        }
                    }
                })
            })
        }
        case types.UPDATE_ITEM_TRACK_SIZE: {
            return produce(state, draft => {
                draft.timeline.forEach(item => {
                    if (item.name === action.payload.name) {
                        if (item.item) {
                            item.item.width = action.payload.width;
                            item.item.time = {start: action.payload.start, end: action.payload.end};
                            item.item.xPosition = action.payload.xPosition;   
                        }
                    }
                })
            });
        }
        default: return state;
    }
}