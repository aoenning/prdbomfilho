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
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@material-ui/core';
import Logo from './../../assents/Logo.png';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import { loginAll, loginUpdate } from '../../store/modules/login/action';
import api from './../../services/api';
import { Link, useHistory } from 'react-router-dom';
const Auths = () => {
    const [saving, setSaving] = useState(false);
    const [openMsg, setOpenMsg] = useState(false);
    const [msg, setMsg] = React.useState('');
    const [credenciais, setCredenciais] = useState({
        cpf: '',
        password: '',
    });
    const history = useHistory();
    const dispatch = useDispatch();
    const [promotions, setPromotions] = useState(true);


    const paperStyles = { padding: 50, height: '70vh', width: 400, margin: '70px auto', backgroundColor: '#f2f2f2' }
    const imgStyle = {}


    async function loginUser() {

        if (!credenciais.cpf) {
            // setOpenMsg(true);
            setMsg('Preenchear o cpf do usuario!');
            return;
        }

        if (!credenciais.password) {
            // setOpenMsg(true);
            setMsg('Preenchear a senha!');
            return;
        }

        setSaving(true);

        try {
            const res = await api.post('/session', credenciais, {
            });

            if (res.status !== 200) {
                setOpenMsg(true);
                setMsg(res.data);
                return;
            }

            const data = res.data;
            localStorage.setItem('@user', JSON.stringify(res.data));
            history.push('/');
            window.location.reload();
        } catch (error) {
            if (!error.response.data.error) {
                setMsg("Usuario não cadastrado");
                setOpenMsg(true);
                setSaving(false);
                return;
            } else {
                setMsg("Erro: " + error.response.data.error);
                setOpenMsg(true);
                setSaving(false);
                return;
            }

        }

    }


    const [CPFError, setCPFError] = useState(false);


    return (
        <>
            <Container maxWidth="sm" component="article" className="form" >
                <Paper elevation={10} style={paperStyles}>
                    <Grid align='center' style={{ alignItems: 'center', justifyContent: 'right' }}>
                        <img src={Logo} />
                    </Grid>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                    }}>

                        <TextField
                            id="cpf"
                            label="Cpf"
                            variant="outlined"
                            margin="dense"
                            required="Preencha o cpf"
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
                                        color='primary'
                                        name="Lembrar"
                                        checked={promotions}
                                        onChange={(event) => {
                                            setPromotions(event.target.checked);
                                        }}
                                    />
                                }
                                label="Lembrar"
                            />
                        </div>
                        {saving ? (
                            <button class="btn btn-primary btn-lg m-1" type="button" disabled={saving}>
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                carregando...
                            </button>
                        ) : (
                            // <button
                            //     className="btn btn-primary btn-lg m-1"
                            //     onLoad={saving}
                            //     onClick={() => { }}>
                            //     <span className="mdi mdi-content-save"> Salvar</span>
                            // </button>
                            <Button
                                type="submit"
                                color="primary"
                                onLoad={saving}
                                style={{ marginTop: 20 }}
                                fullWidth
                                variant="contained"
                                onClick={() => loginUser()}>
                                <span className="mdi mdi-login"> Entrar</span>
                            </Button>
                        )}
                    </form>
                    <Dialog open={openMsg} >
                        <DialogTitle>Atenção!</DialogTitle>
                        <DialogContent style={{ width: 300 }}>{msg}</DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenMsg(false)}> Ok</Button>
                        </DialogActions>
                    </Dialog>
                </Paper>
            </Container>
        </>
    );
}

export default Auths;