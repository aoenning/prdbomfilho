import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import Auth from './Auth';
import Main from './Main';
import consts from './../consts'

const Routes = () => {
    const [autenticacao, setAutenticacao] = useState(false);
    const { login, usuario } = select(state => state.autenticacao)
    useEffect(() => {
        loginUser();
    }, [])

    function loginUser() {        const logado = localStorage.getItem('@user');
        if (logado) { setAutenticacao(true) }       

    }
    return (
        <>
            {autenticacao ? (
                < Main />
            ) : (
                <Auth />
            )}

            {/* <Auth /> */}
        </>
    )
}

export default Routes;