import produce from 'immer';
import types from './types';

const INITIAL_STATE = {
    vendedores: [],
};

function vendedores(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.UPDATE_VENDEDOR: {
            return produce(state, (draft) => {
                draft = { ...draft, ...action.payload };
                return draft;
            });
        }
        default: return state;
    }
}

export default vendedores;