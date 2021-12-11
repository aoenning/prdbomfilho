import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import { produtosUpdate, produtosAll as allProdutosAction, produtosResete, produtosDelete } from './action';
import types from './types';
import api from '../../../services/api';
import consts from './../../../consts';
import produtos from './reducer';

export function* allProdutos() {
    const storageUser = localStorage.getItem('@user');
    const user = JSON.parse(storageUser);


    const { form, mensagem, dialog } = yield select(state => state.produtos)
    try {
        yield put(produtosUpdate({ form: { ...form, filtering: true } }));
        const res = yield call(api.get, '/produtos', {
            token: user.token
        });

        yield put(produtosUpdate({ form: { ...form, filtering: false } }));

        if (res.status !== 200) {
            yield put(produtosUpdate({ mensagem: res.message }));
            return false;
        }

        yield put(produtosUpdate({ produtos: res.data }));


    } catch (error) {
        yield put(produtosUpdate({ form: { ...form, filtering: false } }));
        yield put(produtosUpdate({ mensagem: error.message }));
        yield put(produtosUpdate({ dialog: { ...dialog, show: true } }));
    }
}

export function* addProdutos() {
    const storageUser = localStorage.getItem('@user');
    const user = JSON.parse(storageUser);

    let config = {
        headers: {
            'Authorization': 'Bearer ' + user.token
        }
    }
    const { form, produto, components, behavior, mensagem, dialog, file } = yield select(state => state.produtos);
    yield put(produtosUpdate({ form: { ...form, saving: true } }));

    const data = new FormData();
    // data.append('produto', JSON.stringify(produto));
    data.append('descricao', JSON.stringify(produto.descricao));
    data.append('unidade', JSON.stringify(produto.unidade));
    data.append('preco', JSON.stringify(produto.preco));
    data.append('file', file);
    try {

        if (behavior === 'create') {
            const res = yield call(api.post, '/produtos', data, {
                config,
            });

            yield put(produtosUpdate({ form: { ...form, saving: false } }));

            if (res.status !== 200) {
                yield put(produtosUpdate({ mensagem: res.message }));
                return false;
            }
        } else {
            const url = ("produto/" + produto._id);
            const res = yield call(api.put, url, produto, {
                config,
            });

            yield put(produtosUpdate({ form: { ...form, saving: false } }));

            if (res.status !== 200) {
                yield put(produtosUpdate({ mensagem: res.message }));
                return false;
            }
        }



        yield put(allProdutosAction());
        yield put(produtosUpdate({ components: { ...components, drawer: true } }));
        yield put(produtosResete());
        yield put(produtosUpdate({ dialog: { ...dialog, show: true } }));
        yield put(produtosUpdate({ mensagem: 'Produto salvo com sucesso' }));

    } catch (error) {
        yield put(produtosUpdate({ form: { ...form, saving: false } }));
        yield put(produtosUpdate({ mensagem: error.message }));
        yield put(produtosUpdate({ dialog: { ...dialog, show: true } }));


    }
}

export function* deleteProdutos() {
    const storageUser = localStorage.getItem('@user');
    const user = JSON.parse(storageUser);

    let config = {
        headers: {
            'Authorization': 'Bearer ' + user.token
        }
    }
    const { form, produto, components, mensagem, dialog } = yield select(state => state.produtos);
    yield put(produtosUpdate({ form: { ...form, filtering: true } }));
    try {
        const url = ("produto/" + produto._id);
        const res = yield call(api.delete, url, {
            config,
        });

        yield put(produtosUpdate({ form: { ...form, filtering: false } }));

        if (res.status !== 200) {
            yield put(produtosUpdate({ mensagem: 'Não foi possivél excluir produto' }));
            return false;
        }

        yield put(allProdutosAction());
        yield put(produtosUpdate({ components: { ...components, drawer: false } }));
        yield put(produtosResete());



    } catch (error) {
        yield put(produtosUpdate({ form: { ...form, saving: false } }));
        yield put(produtosUpdate({ mensagem: error.message }));
        yield put(produtosUpdate({ dialog: { ...dialog, show: true } }));
    }
}

export default all([
    takeLatest(types.REQUEST_PRODUTO, allProdutos),
    takeLatest(types.ADD_PRODUTO, addProdutos),
    takeLatest(types.DELETE_PRODUTO, deleteProdutos)
]);





