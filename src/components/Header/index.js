import React, { useEffect, useState } from 'react';
import Img from './../../assents/avatarMasc.jpg'

const Header = () => {
    const [autenticacao, setAutenticacao] = useState(false);
    const [user, setUser] = useState(null);
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
        </header>
    );
};

export default Header;