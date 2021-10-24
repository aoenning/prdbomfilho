import { all } from 'redux-saga/effects';
import clientes from './modules/cliente/sagas';
import vendedores from './modules/vendedor/sagas';
import autenticacao from './modules/login/sagas';
import produtos from './modules/produto/sagas';

export default function* rootSaga() {
    return yield all([
        clientes,
        vendedores,
        autenticacao,
        produtos,
    ]);
}