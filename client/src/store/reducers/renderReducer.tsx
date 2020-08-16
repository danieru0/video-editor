import { types, Action } from '../actions/types';

export interface RenderState {
    status: boolean;
    message: string;
    error: string;
}

const initState: RenderState = {
    status: false,
    message: '',
    error: ''
}

export default (state = initState, action: Action): RenderState => {
    switch(action.type) {
        case types.SET_RENDER_STATUS: {
            return {...state, status: action.payload};
        }
        case types.SET_RENDER_MESSAGE: {
            return {...state, message: action.payload};
        }
        case types.SET_RENDER_ERROR: {
            return {...state, error: action.payload};
        }
        default: return state;   
    }
}