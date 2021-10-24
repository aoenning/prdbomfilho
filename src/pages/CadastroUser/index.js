import React from 'react';
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core';
import Logo from './../../assents/Logo.png';
import './styles.css';
import { Link } from 'react-router-dom';
const Auths = () => {
    const paperStyles = { padding: 50, heigth: 700, width: 400, margin: '20px auto' }
    return (
        <>
            <div>
                <form>
                    <div class="row">
                        <div class="col">
                            <input type="text" class="form-control" placeholder="Nome" />
                        </div>
                        <div class="col">
                            <h1>Sobrenome</h1>
                            <input type="text" class="form-control" placeholder="Sobrenome" />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Auths;