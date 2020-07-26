import { types, Action } from '../actions/types';

export interface ModalState {
    modalData: {
        type: string | null;
        name: string | null;
    }
}

const initState: ModalState = {
    modalData: {
        type: null,
        name: null
    }
}

export default (state = initState, action: Action): ModalState => {
    switch(action.type) {
        case types.UPDATE_MODAL_DATA: {
            return {...state, modalData: { ...state.modalData, type: action.payload.type, name: action.payload.name }}
        }
        default: return state;
    }
}
