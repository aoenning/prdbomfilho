import React, { useEffect, useState } from 'react';
import Img from './../../assents/avatarMasc.jpg';
import { Link, useHistory } from 'react-router-dom';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@material-ui/core';


const Header = () => {
    const [autenticacao, setAutenticacao] = useState(false);
    const [user, setUser] = useState(null);
    const [showMsg, setShowMsg] = useState(false);
    const [msg, setMsg] = React.useState('');
    const history = useHistory();

    useEffect(() => {
        loginUser();
    }, [])

    function loginUser() {
        const storageUser = localStorage.getItem('@user');
        if (storageUser) {
            // setAutenticacao(true)
            setUser(JSON.parse(storageUser))
        }

    }

    async function logout() {
        try {

            const result = localStorage.clear();
            setShowMsg(false);
            history.push('/');
            // window.location.reload();
            // .then(() => {
            // navigation.reset({
            //     routes: [{ name: 'Login' }]
            // });
            //  navigation.navigate("Login");
            // })
        } catch (error) {
            console.log(error);
        }
    }

    function setOpenMsg() {
        setMsg('Deseja realmente excluir informação?');
        setShowMsg(true);
    }


    return (
        <header className="container-fluid d-flex justify-content-end">
            <div className="d-flex align-items-center">
                <div>
                    <span className="d-block n-0 p-0 text-white">{user ? user.user.name : "Produtos Bom Filho"}</span>
                    <small className="n-0 p-0">{user ? user.user.cpf : ""}</small>
                </div>
                <img src={Img} />
                <span className="mdi mid-chevron-down text-white"></span>
            </div>
            <div className="d-flex  align-items-center justify-content-center" onClick={() => setOpenMsg()}>
                <div>
                    <span className="d-block n-0 p-0 text-white">Sair</span>
                </div>
                <span className="mdi mdi-logout"></span>
            </div>
            <Dialog open={showMsg}>
                <DialogTitle>Atenção!</DialogTitle>
                <DialogContent>{msg}</DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowMsg(false)}> Cancelar</Button>
                    <Button onClick={() => logout()}> Confirmar</Button>
                </DialogActions>
            </Dialog>
        </header >
    );
};

export default Header;