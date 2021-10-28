import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';

import './styles.css';
import SideBar from './../components/SideBar';
import Header from './../components/Header';
import Clientes from './../pages/Clientes';
import Pedidos from './../pages/Pedidos';
import Login from './../pages/Auths';
import Vendedores from './../pages/Vendedores';
import Produtos from './../pages/Produto';
import { isAuthentcated } from '../components/AuthComponent';
import CadastroUsuario from './../pages/CadastroUser';


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthentcated() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
    )} />
);


const Main = () => {
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
                            <Switch>
                                <SideBar />
                                <Route component={Pedidos} exact path="/" />
                                <Route component={Pedidos} path="/Pedidos" />
                                <Route component={Clientes} path="/Clientes" />
                                <Route component={Produtos} path="/Produtos" />
                                <Route component={Vendedores} path="/Vendedores" />
                            </Switch>

                        </div>
                    </div>
                </BrowserRouter>
            ) : (
                <BrowserRouter>
                    <Switch>
                        <>
                            <Redirect
                                path="/"
                            />
                            <Route component={Login}
                                exact
                                path="/" />
                            <Route component={CadastroUsuario}
                                exact
                                path="/CadastroUsuario" />
                        </>

                        <PrivateRoute exact path="/Pedidos" component={Pedidos} />
                    </Switch>
                </BrowserRouter>
            )
            }

        </>
    )

}

export default Main;