import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './styles.css';
import Login from './../pages/Auths';
import CadastroUsuario from './../pages/CadastroUser';

const Auth = () => {
    return (
        <>
            <BrowserRouter>
                <Route
                    component={Login}
                    path="/"
                    exact />
                <Route component={CadastroUsuario}
                    exact
                    path="/CadastroUsuario" />
            </BrowserRouter>
        </>
    )
}

export default Auth;