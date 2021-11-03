import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import { clientesUpdate, clientesAll as allClientesAction, clientesResete, clientesDelete } from './action';
import types from './types';
import api from '../../../services/api';
import consts from './../../../consts';
import clientes from './reducer';

export function* allClientes() {
    const storageUser = localStorage.getItem('@user');
    const user = JSON.parse(storageUser);
    const { form, mensagem, dialog } = yield select(state => state.clientes)
    try {
        yield put(clientesUpdate({ form: { ...form, filtering: true } }));
        const res = yield call(api.get, '/clientes', {
            token: user.token
        });

        yield put(clientesUpdate({ form: { ...form, filtering: false } }));

        if (res.status !== 200) {
            yield put(clientesUpdate({ mensagem: res.message }));
            return false;
        }

        yield put(clientesUpdate({ clientes: res.data }));


    } catch (error) {
        yield put(clientesUpdate({ form: { ...form, filtering: false } }));
        yield put(clientesUpdate({ mensagem: error.message }));
        yield put(clientesUpdate({ dialog: { ...dialog, show: true } }));


    }
}

export function* addClientes() {
    const storageUser = localStorage.getItem('@user');
    const user = JSON.parse(storageUser);

    let config = {
        headers: {
            'Authorization': 'Bearer ' + user.token
        }
    }
    const { form, cliente, components, behavior, mensagem, dialog } = yield select(state => state.clientes);
    yield put(clientesUpdate({ form: { ...form, saving: true } }));

    try {

        if (behavior === 'create') {
            const res = yield call(api.post, '/clientes', cliente, {
                config,
            });

            yield put(clientesUpdate({ form: { ...form, saving: false } }));

            if (res.status !== 200) {
                yield put(clientesUpdate({ mensagem: res.message }));
                return false;
            }
        } else {
            const url = ("cliente/" + cliente._id);
            const res = yield call(api.put, url, cliente, {
                config,
            });

            yield put(clientesUpdate({ form: { ...form, saving: false } }));

            if (res.status !== 200) {
                yield put(clientesUpdate({ mensagem: res.message }));
                return false;
            }
        }



        yield put(allClientesAction());
        yield put(clientesUpdate({ components: { ...components, drawer: true } }));
        yield put(clientesResete());
        yield put(clientesUpdate({ dialog: { ...dialog, show: true } }));
        yield put(clientesUpdate({ mensagem: 'Cliente salvo com sucesso' }));

    } catch (error) {
        yield put(clientesUpdate({ form: { ...form, saving: false } }));
        yield put(clientesUpdate({ mensagem: error.message }));
        yield put(clientesUpdate({ dialog: { ...dialog, show: true } }));


    }
}

export function* deleteClientes() {
    const storageUser = localStorage.getItem('@user');
    const user = JSON.parse(storageUser);
    let config = {
        headers: {
            'Authorization': 'Bearer ' + user.token
        }
    }
    const { form, cliente, components, mensagem, dialog } = yield select(state => state.clientes);
    yield put(clientesUpdate({ form: { ...form, filtering: true } }));
    try {
        const url = ("cliente/" + cliente._id);
        const res = yield call(api.delete, url, {
            config,
        });

        yield put(clientesUpdate({ form: { ...form, filtering: false } }));

        if (res.status !== 200) {
            yield put(clientesUpdate({ mensagem: 'Não foi possivél excluir cliente' }));
            return false;
        }

        yield put(allClientesAction());
        yield put(clientesUpdate({ components: { ...components, drawer: false } }));
        yield put(clientesResete());



    } catch (error) {
        yield put(clientesUpdate({ form: { ...form, saving: false } }));
        yield put(clientesUpdate({ mensagem: error.message }));
        yield put(clientesUpdate({ dialog: { ...dialog, show: true } }));
    }
}

export default all([
    takeLatest(types.REQUEST_CLIENTE, allClientes),
    takeLatest(types.ADD_CLIENTE, addClientes),
    takeLatest(types.DELETE_CLIENTE, deleteClientes)
]);





