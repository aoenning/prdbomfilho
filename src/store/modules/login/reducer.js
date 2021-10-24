import produce from 'immer';
import types from './types';

const INITIAL_STATE = {
    autenticacao: [],
    usuario: {
        cpf: '',
        password: '',
    },
    login: {
        nome: '',
        email: '',
        cpf: '',
        token: '',
    },
};

function autenticacao(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.UPDATE_AUTENTICACAO: {
            return produce(state, (draft) => {
                draft = { ...draft, ...action.payload };
                return draft;
            });
        }
        default: return state;
    }
}

export default autenticacao;