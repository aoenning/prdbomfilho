import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core';
import Logo from './../../assents/Logo.png';
import './styles.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import { loginAll, loginUpdate } from '../../store/modules/login/action';
import api from './../../services/api';
import { Link, useHistory } from 'react-router-dom';
const Auths = () => {
    const [cpf, setCpf] = useState('');
    const [password, setPassord] = useState('');
    const [credenciais, setCredenciais] = useState({
        cpf: '',
        password: '',
    });
    const history = useHistory();
    const dispatch = useDispatch();
    const paperStyles = { padding: 50, width: 400, margin: '70px auto' }
    const { login, usuario } = select(state => state.autenticacao)
    const { autenticacao } = useSelector(function (state) { return state.autenticacao });
    function setAutenticacao() {
        // put(loginUpdate({ usuario: { ...usuario, cpf: cpf } }));
        // put(loginUpdate({ usuario: { ...usuario, password: password } }));

        // dispatch(loginUpdate({
        //     usuario: { ...usuario, cpf: cpf, password: password },
        // })
        // );

    }

    async function loginUser() {
        try {
            const res = await api.post('/session', credenciais, {
            });

            if (res.status !== 200) {
                alert(res);
                return false;
            }

            const data = res.data;
            localStorage.setItem('@user', JSON.stringify(res.data));
            history.push('/');
            // window.location.reload();
        } catch (error) {
            alert(error);

        }
    }



    return (
        <>
            <Grid>
                <Paper elevation={10} style={paperStyles}>
                    <Grid allgn='center' style={{ alignItems: 'center', justifyContent: 'right' }}>
                        <img src={Logo} />
                    </Grid>
                    <TextField
                        laber="Cpf"
                        placeholder="Informe o cpf"
                        fullWidth required style={{ marginTop: 20 }}
                        value={credenciais.cpf}
                        onChange={(e) =>
                            setCredenciais({
                                ...credenciais,
                                cpf: e.target.value,
                            })
                        }
                    />
                    <TextField
                        laber="Senha"
                        placeholder="Informe a senha"
                        fullWidth
                        required
                        style={{ marginTop: 30 }}
                        type="password"
                        value={credenciais.password}
                        onChange={(e) =>
                            setCredenciais({
                                ...credenciais,
                                password: e.target.value,
                            })
                        }
                    />
                    {/* <Link to="/clientes" style={{ textDecoration: 'none' }}> */}
                    <Button
                        type="submit"
                        color="primary"
                        style={{ marginTop: 20 }}
                        fullWidth
                        variant="contained"
                        onClick={() => loginUser()}
                    >Entrar</Button>
                    {/* </Link> */}
                </Paper>
            </Grid>
        </>
    );
}

export default Auths;