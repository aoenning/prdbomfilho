import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import { vendedoresUpdate, vendedorAll } from './action';
import types from './types';
import api from '../../../services/api';
import consts from './../../../consts';

export function* allVendedores() {
    try {
        const res = yield call(api.get, '/vendedores', {
            token: consts.token
        });

        if (res.status !== 200) {
            alert(res.message);
            return false;
        }

        // const data = {
        //     vendedores: {
        //         data: res.data,
        //     }
        // }

        yield put(vendedoresUpdate({ vendedores: res.data }));

    } catch (error) {
        alert(error.message);
    }
}

export default all([takeLatest(types.REQUEST_VENDEDOR, allVendedores)]);





