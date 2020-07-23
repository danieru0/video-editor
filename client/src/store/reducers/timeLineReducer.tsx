import { produce } from 'immer';
import { timeLine } from '../../types/timeline';
import { types, Action } from '../actions/types';

export interface timeLineState {
    timeline: timeLine[];
    timelineRef: any;
    clickedItem: {
        name: string;
        type: string;
    }
}

const initState: timeLineState = {
    timeline: [],
    timelineRef: null,
    clickedItem: {
        name: '',
        type: ''
    }
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
        case types.UPDATE_ITEM_POSITION: {
            return produce(state, draft => {
                draft.timeline.forEach(item => {
                    if (item.name === action.payload.name) {
                        if (item.item) {
                            item.item.videoPosition = {
                                x: action.payload.x,
                                y: action.payload.y
                            }
                        }
                    }
                })
            })
        }
        case types.UPDATE_CLICKED_ITEM: {
            return {...state, clickedItem: action.payload}
        }
        case types.UPDATE_ITEM_COLOR: {
            return produce(state, draft => {
                draft.timeline.forEach(item => {
                    if (item.name === action.payload.name) {
                        if (item.item) {
                            item.item.color = action.payload.color
                        }
                    }
                })
            })
        }
        case types.UPDATE_TEXT_OPTIONS_COLOR: {
            return produce(state, draft => {
                draft.timeline.forEach(item => {
                    if (item.name === action.payload.name) {
                        if (item.item && item.item.textOptions) {
                            item.item.textOptions.textColor = action.payload.color;
                        }
                    }
                })
            })
        }
        case types.UPDATE_TEXT_OPTIONS_POSITION: {
            return produce(state, draft => {
                draft.timeline.forEach(item => {
                    if (item.name === action.payload.name) {
                        if (item.item && item.item.textOptions) {
                            item.item.textOptions.textPosition = {
                                x: action.payload.x,
                                y: action.payload.y
                            }
                        }
                    }
                })
            })
        }
        case types.UPDATE_TEXT_OPTIONS_ALIGN: {
            return produce(state, draft => {
                draft.timeline.forEach(item => {
                    if (item.name === action.payload.name) {
                        if (item.item && item.item.textOptions) {
                            item.item.textOptions.justifyContent = action.payload.align;
                        }
                    }
                })
            })
        }
        default: return state;
    }
}