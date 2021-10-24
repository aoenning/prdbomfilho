import produce from 'immer';
import types from './types';

const INITIAL_STATE = {
    mensagem: '',
    behavior: 'create',
    components: {
        drawer: false,
        confirmDelete: false,

    },
    dialog: {
        show: false,
    },
    form: {
        filtering: false,
        disabled: true,
        saving: false,

    },
    produtos: [],
    produto: {
        descricao: '',
        unidade: '',
        preco: '',
        status: ''
    }
};

function produtos(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.UPDATE_PRODUTO: {
            return produce(state, (draft) => {
                draft = { ...draft, ...action.payload };
                return draft;
            });
        }

        case types.RESETE_PRODUTO: {
            return produce(state, (draft) => {
                draft.produto = INITIAL_STATE.produto;
                return draft;
            });
        }
        default: return state;
    }
}

export default produtos;