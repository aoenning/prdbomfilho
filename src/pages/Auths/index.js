import React, { useState } from 'react';
import {
    Grid,
    Paper,
    Avatar,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Container,

} from '@material-ui/core';
import Logo from './../../assents/Logo.png';
import './styles.css';
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
    const [name, setName] = useState('');
    const [last_name, setLastName] = useState('');
    const [news, setNews] = useState(true);
    const [promotions, setPromotions] = useState(true);
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
            window.location.reload();
        } catch (error) {
            alert(error);

        }
    }


    const [CPFError, setCPFError] = useState(false);


    return (
        <>
            {/* <Grid> */}
            <Container maxWidth="sm" component="article" className="form" >
                {/* <Paper elevation={10} style={paperStyles}>
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
                    /> */}
                {/* <Link to="/clientes" style={{ textDecoration: 'none' }}> */}
                {/* <Button
                        type="submit"
                        color="primary"
                        style={{ marginTop: 20 }}
                        fullWidth
                        variant="contained"
                        onClick={() => loginUser()}
                    >Entrar</Button>
                    
                </Paper> */}
                <Paper elevation={10} style={paperStyles}>
                    <Grid allgn='center' style={{ alignItems: 'center', justifyContent: 'right' }}>
                        <img src={Logo} />
                    </Grid>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                    }}>

                        {/* <TextField
                            id="name"
                            label="Nome"
                            variant="outlined"
                            margin="dense"
                            fullWidth
                            value={name}
                            onChange={(event) => { setName(event.target.value) }}
                        /> */}


                        <TextField
                            id="cpf"
                            label="CPF"
                            variant="outlined"
                            margin="dense"
                            fullWidth
                            error={CPFError}
                            helperText={CPFError && "Deve conter 11 dígitos. Insira apenas os números."}
                            // value={cpf}
                            onBlur={(event) => {
                                const tmpCPF = event.target.value;

                                if (tmpCPF.length !== 11) {
                                    setCPFError(true);
                                } else {
                                    setCPFError(false);
                                }
                            }}
                            value={credenciais.cpf}
                            onChange={(e) =>
                                setCredenciais({
                                    ...credenciais,
                                    cpf: e.target.value,
                                })
                            }
                        />
                        {/* onChange={(event) => {
                                const tmpCPF = event.target.value;

                                if (tmpCPF.length === 11) {
                                    setCPFError(false);
                                }

                                setCpf(event.target.value)
                            }
                            }
                        /> */}

                        <TextField
                            id="password"
                            label="Senha"
                            variant="outlined"
                            margin="dense"
                            required
                            fullWidth
                            type="password"
                            value={credenciais.password}
                            onChange={(e) =>
                                setCredenciais({
                                    ...credenciais,
                                    password: e.target.value,
                                })
                            }
                        />

                        <div className="checkboxes">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="conected"
                                        color="primary"
                                        name="Manter conectado"
                                        checked={promotions}
                                        onChange={(event) => {
                                            setPromotions(event.target.checked);
                                        }}
                                    />
                                }
                                label="Manter conectado"
                            />

                            {/* <FormControlLabel
                                control={<Checkbox
                                    value="news"
                                    color="primary"
                                    name="Novidades"
                                    checked={news}
                                    onChange={(event) => {
                                        setNews(event.target.checked);
                                    }}
                                />}
                                label="Novidades"
                            /> */}
                        </div>
                        <Button
                            type="submit"
                            color="primary"
                            style={{ marginTop: 20 }}
                            fullWidth
                            variant="contained"
                            onClick={() => loginUser()}
                        >Entrar</Button>

                        {/* <Button className="btn-form" variant="contained" color="primary">
                            Cadastrar
                        </Button> */}
                    </form>
                </Paper>
            </Container>
            {/* </Grid> */}
        </>
    );
}

export default Auths;