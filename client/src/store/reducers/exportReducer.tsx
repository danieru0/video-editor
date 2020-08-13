import { types, Action } from '../actions/types';

export interface exportState {
    exportActive: boolean;
}

const initState: exportState = {
    exportActive: false
}

export default (state = initState, action: Action): exportState => {
    switch(action.type) {
        case types.SET_EXPORT_STATE: {
            return {...state, exportActive: action.payload}
        }
        default: return state;
    }
}