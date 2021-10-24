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
    clientes: [],
    cliente: {
        nome: '',
        email: '',
        telefone: '',
        documento: {
            tipo: '',
            numero: '',
        },
        endereco: {
            logradouro: '',
            numero: '',
            cep: '',
            bairro: '',
            cidade: '',
            estado: '',
        },
        tipo_atividade: '',
        status: '',
    }
};

function clientes(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.UPDATE_CLIENTE: {
            return produce(state, (draft) => {
                draft = { ...draft, ...action.payload };
                return draft;
            });
        }

        case types.RESETE_CLIENTE: {
            return produce(state, (draft) => {
                draft.cliente = INITIAL_STATE.cliente;
                return draft;
            });
        }
        default: return state;
    }
}

export default clientes;