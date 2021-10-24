import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import './styles.css';
import SideBar from './components/SideBar';
import Header from './components/Header';
import Clientes from './pages/Clientes';
import Pedidos from './pages/Pedidos';
import Vendedores from './pages/Vendedores';
import Login from './pages/Auths';
import CadastroUsuario from './pages/CadastroUser';

const Routes = () => {

    const logado = localStorage.getItem('@user');
    return (
        <>
            <BrowserRouter>
                <Route component={CadastroUsuario} path="/" exact />

                <Header />
                <div className="container-fluid h-100" >
                    <div className="row h-100">
                        <BrowserRouter>
                            <SideBar />
                            <Switch>
                                <Route component={Pedidos} path="/Pedidos" exact />
                                <Route component={Clientes} path="/Clientes" />
                                <Route component={Vendedores} path="/Vendedores" />
                            </Switch>
                        </BrowserRouter>
                    </div>
                </div>
            </BrowserRouter>
        </>
    )
}

export default Routes;