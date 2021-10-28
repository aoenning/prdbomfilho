import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Auth from './Auth';
import Main from './Main';
import consts from './../consts';
import { isAuthentcated } from '../components/AuthComponent';
import Pedidos from './../pages/Pedidos';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthentcated() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
    )} />
);



const Routes = () => {
    const [autenticacao, setAutenticacao] = useState(false);
    const { login, usuario } = select(state => state.autenticacao)
    useEffect(() => {
        loginUser();
    }, [])

    function loginUser() {

        const logado = localStorage.getItem('@user');
        if (logado) { setAutenticacao(true) }

    }
    return (
        <>
            {/* {autenticacao ? ( */}
            < Main />
            {/* ) : (
                <Auth />
            )} */}

            {/* <BrowserRouter>
                <Switch>
                    <PrivateRoute path="/Pedidos" component={Pedidos} />
                    <Auth />
                    < Main />
                </Switch>
            </BrowserRouter> */}
        </>
    )
}

export default Routes;