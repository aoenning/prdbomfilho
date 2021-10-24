import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import { loginUpdate, loginAll } from './action';
import types from './types';
import api from '../../../services/api';
import consts from './../../../consts';

export function* allAutenticacao() {

    const { login, usuario } = yield select(state => state.autenticacao)

    try {
        const res = yield call(api.post, '/session', {
            usuario
        });

        if (res.status !== 200) {
            alert(res.message);
            return false;
        }

        yield put(loginUpdate({ login: { ...login, token: res.data.token } }));
        yield put(loginUpdate({ autenticacao: res.data }));

    } catch (error) {

        alert(error.message);

    }
}

export default all([takeLatest(types.REQUEST_AUTENTICACAO, allAutenticacao)]);





