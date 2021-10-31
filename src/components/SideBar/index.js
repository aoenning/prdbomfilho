import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import logo from './../../assents/Logo.png';

const SideBar = ({ location }) => {
    return (

        <sidebar className="col-2 h-100 overflow-scroll justify-content-center align-items-center" >
            <img src={logo} className="img-fluid px-0 py-4" />
            <ul className="p-0 n-0">
                <li>
                    <Link to="/Dashboard" className={location.pathname === '/Dashboard' ? 'active' : ''}>
                        <span className="mdi mdi-chart-bar" ></span>
                        <text>Dashboard</text>
                    </Link>
                </li>
                <li>
                    <Link to="/Pedidos" className={location.pathname === '/Pedidos' ? 'active' : ''}>
                        <span className="mdi mdi-clipboard-list-outline" ></span>
                        <text>Pedidos</text>
                    </Link>
                </li>
                <li>
                    <Link to="/Clientes" className={location.pathname === '/Clientes' ? 'active' : ''}>
                        <span className="mdi mdi-account-multiple"></span>
                        <text>Clientes</text>
                    </Link>
                </li>
                <li>
                    <Link to="/Produtos" className={location.pathname === '/Produtos' ? 'active' : ''}>
                        <span className="mdi mdi-briefcase-outline"></span>
                        <text>Produto</text>
                    </Link>
                </li>
                <li>
                    <Link to="/Vendedores" className={location.pathname === '/Vendedores' ? 'active' : ''}>
                        <span className="mdi mdi-account-circle"></span>
                        <text>Vendedores</text>
                    </Link>
                </li>
            </ul>
        </sidebar>
    );
};

export default withRouter(SideBar);