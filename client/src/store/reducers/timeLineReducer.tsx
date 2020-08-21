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
        case types.DELETE_TRACK: {
            return {
                ...state,
                timeline: state.timeline.filter(item => item.name !== action.payload)
            }
        }
        case types.UPDATE_TRACK_NAME: {
            return produce(state, draft => {
                if (draft.timeline.filter(item => item.name === action.payload.newName).length === 0) {
                    draft.timeline.forEach(item => {
                        if (item.name === action.payload.name) {
                            item.name = action.payload.newName;
                        }
                    })
                }
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
        case types.DELETE_ITEM_FROM_TRACK: {
            return produce(state, draft => {
                draft.timeline.forEach(item => {
                    if (item.name === action.payload) {
                        item.item = null;
                    }
                })
            })
        }
        case types.MOVE_TRACK: {
            return produce(state, draft => {
                draft.timeline.forEach((item, index) => {
                    if (item.name === action.payload.name) {
                        const selectedTimeline = draft.timeline.splice(index, 1)[0];
                        
                        if (action.payload.type === 'up') {
                            draft.timeline.splice(--index, 0, selectedTimeline);
                        } else if (action.payload.type === 'down') {
                            draft.timeline.splice(++index, 0, selectedTimeline);
                        }
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
        case types.UPDATE_ITEM_OPACITY: {
            return produce(state, draft => {
                draft.timeline.forEach(item => {
                    if (item.name === action.payload.name) {
                        if (item.item) {
                            item.item.opacity = action.payload.opacity;
                        }
                    }
                })
            })
        }
        case types.UPDATE_TEXT_OPTIONS: {
            return produce(state, draft => {
                draft.timeline.forEach(item => {
                    if (item.name === action.payload.name) {
                        if (item.item && item.item.textOptions) {
                            const payloadCopy = (JSON.parse(JSON.stringify(action.payload)));
                            const { x, y, name, textAlign, ...rest } = payloadCopy;

                            if (x !== undefined && y !== undefined) {
                                item.item.textOptions.textPosition = {
                                    x: x,
                                    y: y
                                }
                            }

                            if (textAlign) {
                                item.item.textOptions.justifyContent = textAlign;

                                switch(textAlign) {
                                    case 'flex-start':
                                        return item.item.textOptions.textAlign = 'left';
                                    case 'center':
                                        return item.item.textOptions.textAlign = 'center';
                                    case 'flex-end':
                                        return item.item.textOptions.textAlign = 'right';
                                    default: throw new Error('wrong type!');
                                }
                            }

                            item.item.textOptions = {
                                ...item.item.textOptions,
                                ...rest
                            }

                        }
                    }
                })
            })
        }
        default: return state;
    }
}