import { combineReducers } from 'redux';
// import pedido from './modules/pedido/reducer';
import clientes from './modules/cliente/reducer';
import vendedores from './modules/vendedor/reducer';
import autenticacao from './modules/login/reducer';
import produtos from './modules/produto/reducer';

export default combineReducers({
    clientes,
    vendedores,
    autenticacao,
    produtos,
});

