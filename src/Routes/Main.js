import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import './styles.css';
import SideBar from './../components/SideBar';
import Header from './../components/Header';
import Clientes from './../pages/Clientes';
import Pedidos from './../pages/Pedidos';
import Login from './../pages/Auths';
import Vendedores from './../pages/Vendedores';
import Produtos from './../pages/Produto';

const Main = () => {
    return (
        <>
            <Header />
            <div className="container-fluid h-100" >
                <div className="row h-100">
                    <BrowserRouter>
                        <SideBar />
                        <Switch>
                            <Route component={Pedidos} exact path="/" />
                            <Route component={Pedidos} exact path="/Pedidos" />
                            <Route component={Clientes} exact path="/Clientes" />
                            <Route component={Produtos} exact path="/Produtos" />
                            <Route component={Vendedores} exact path="/Vendedores" />
                        </Switch>
                    </BrowserRouter>
                </div>
            </div>
        </>
    )
}

export default Main;