import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';

import './styles.css';
import SideBar from './components/SideBar';
import Header from './components/Header';
import Clientes from './pages/Clientes';
import Pedidos from './pages/Pedidos';
import Produtos from './pages/Produto';
import Login from './pages/Auths';
import CadastroUsuario from './pages/CadastroUser';
import Dashboard from './pages/Dashboard';

const Routes = () => {
    const [autenticacao, setAutenticacao] = useState(false);
    useEffect(() => {
        loginUser();
    }, [])

    function loginUser() {
        const logado = localStorage.getItem('@user');
        if (logado) { setAutenticacao(true) }

    }

    return (
        <>
            {autenticacao ? (
                <BrowserRouter>
                    <Header />
                    <div className="container-fluid h-100" >
                        <div className="row h-100">
                            <BrowserRouter>
                                <SideBar />
                                <Switch>
                                    <Route component={Clientes} exact path="/" />
                                    <Route component={Clientes} exact path="/Clientes" />
                                    <Route component={Pedidos} path="/Pedidos" />
                                    <Route component={Produtos} path="/Produtos" />
                                </Switch>
                            </BrowserRouter>
                        </div>
                    </div>
                </BrowserRouter>
            ) : (
                <BrowserRouter>
                    <Switch>
                        <>
                            <Redirect path="/" />
                            <Route component={Login} exact path="/" />
                            <Route component={CadastroUsuario} exact path="/CadastroUsuario" />
                        </>

                        {/* <PrivateRoute exact path="/Pedidos" component={Pedidos} /> */}
                    </Switch>
                </BrowserRouter>
            )}
        </>
    )
}

export default Routes;