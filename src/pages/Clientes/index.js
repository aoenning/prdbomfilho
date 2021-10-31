import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer, Form, ButtonGroup, ButtonToolbar } from 'rsuite';
import 'rsuite-table/dist/css/rsuite-table.css';
import TableComponent from './../../components/Table';
import { clientesAll, clientesUpdate, clientesAdd, clientesResete, clientesDelete } from '../../store/modules/cliente/action';
import {
    Modal,
    Box,
    Typography,
    Input,
    MenuItem,
    Menu,
    Alert,
    IconButton,
    Collapse,
    Button,
    CloseIcon,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@material-ui/core';
import './styles.css';
import consts from './../../consts';
import axios from 'axios';
import { maskPhone, maskCnpj, maskCpf, maskCep } from './../../components/Mask';
import { confirmAlert } from 'react-confirm-alert'; // Import
// import { Alert } from '@mui/material';
// import IconButton from '@mui/material/IconButton';
// import Collapse from '@mui/material/Collapse';
// import Button from '@mui/material/Button';
// import CloseIcon from '@mui/icons-material/Close';



const Clientes = () => {
    const [listClientes, setListClientes] = useState([]);
    const [tipoPorc, setTipoPorc] = useState('');
    const [searchView, setSearchView] = useState('');
    const [open, setOpen] = useState(false);
    const [openMsg, setOpenMsg] = useState(false);
    const [showMsg, setShowMsg] = useState(false);
    const [msg, setMsg] = React.useState('');
    const [ufs, setUfs] = useState([]);
    const [cities, setCities] = useState([]);
    const dispatch = useDispatch();
    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [documento, setDocumento] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [status, setStatus] = useState('');


    const { clientes, cliente, form, behavior, components, mensagem, dialog } = useSelector(function (state) { return state.clientes });

    const setComponent = (component, state) => {
        dispatch(clientesUpdate({
            components: { ...components, [component]: state },
        })
        );
    }


    const setForm = (component, state) => {
        dispatch(clientesUpdate({
            dialog: { ...dialog, [component]: state },
        })
        );
    }

    useEffect(() => {
        intial();
    }, []);




    function intial() {
        setCep('');
        setDocumento('');
        setTelefone('');
        dispatch(clientesAll());
    }

    useEffect(() => {
        setListClientes(clientes);
    }, [clientes]);

    useEffect(() => {
        setListClientes([]);
        clientes.filter(val => {
            if (val.nome.toLowerCase().includes(searchView.toLowerCase())) {
                setListClientes(output => [...output, val])
            }
        })
    }, [searchView]);

    useEffect(() => {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);
            setUfs(ufInitials);
        });
    }, []);

    useEffect(() => {

        if (!cliente.endereco.estado) {
            return;
        }

        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${cliente.endereco.estado}/municipios`)
            .then(response => {
                const cityNames = response.data.map(city => city.nome);
                setCities(cityNames);
            });
    }, [cliente.endereco.estado]);


    async function salvar() {

        if (!cliente.nome) {
            alert('Informe o nome');
            return;
        }

        if (!cliente.email) {
            alert('Informe o email');
            return;
        }

        if (!cliente.telefone) {
            alert('Informe o telefone');
            return;
        }

        if (!cliente.documento.numero) {
            alert('Informe o documento');
            return;
        }

        if (!cliente.endereco.logradouro) {
            alert('Informe o endereco');
            return;
        }

        if (!cliente.endereco.cep) {
            alert('Informe o cep');
            return;
        }

        if (!cliente.endereco.cidade) {
            alert('Informe o cidade');
            return;
        }

        if (!cliente.endereco.estado) {
            alert('Informe o estado');
            return;
        }

        let config = {
            headers: {
                'Authorization': 'Bearer ' + consts.token
            }
        }

        // try {
        //     const res = await api.post('/clientes', cliente, {
        //         config,
        //     })

        //     if (res.status !== 200) {
        //         alert(res.data);
        //         return false;
        //     }

        //     alert('Cliente salvo com sucesso');
        // } catch (error) {
        //     alert('Não foi possivél salvar as informações ' + error.error);
        //     return;

        // }

        dispatch(clientesAdd());
    }





    function setCliente(key, value) {

        switch (key) {
            case 'telefone': {
                const result = maskPhone(value);
                value = result;
            }

            case 'documento': {
                if (value.tipo === 'cpf' && value.numero !== '') {
                    const result = maskCpf(value.numero);
                    value.numero = result;
                    ;
                }
                if (value.tipo === 'cnpj' && value.numero !== '') {
                    const result = maskCnpj(value.numero);
                    value.numero = result;
                    ;
                }

                if (value.tipo === '') {
                    setDocumento('');
                    ;
                }

                if (value.numero === '') {
                    setDocumento('');
                }
            }

            case 'endereco': {
                if (value.cep) {
                    const result = maskCep(value.cep);
                    value.cep = result;
                    ;
                } else {
                    setCep('');
                    ;
                }
            }

            default:
        }
        dispatch(clientesUpdate({
            cliente: { ...cliente, [key]: value },
        })
        );


    }


    function deleteCliente() {
        dispatch(clientesDelete());
        setOpenMsg(false);

    }

    function memorizeCliente(cliente) {
        setOpenMsg(true);
        dispatch(clientesUpdate({
            behavior: 'update',
        })
        );

        dispatch(clientesUpdate({
            cliente,
        })
        );

        setMsg('Deseja realmente excluir?')
    }

    return (
        <>
            <div className="col p-6 owerflow-auto h-100 overflow-scroll">
                {components.drawer ? (
                    <div className="mb-4 mt-4">
                        <div className="w-100 d-flex justify-content-between">
                            <h2 className="mb-2 mt-0">Cadastro de clientes</h2>
                            <div>
                                <button
                                    className="btn btn-primary btn-lg"
                                    onClick={() => {
                                        dispatch(clientesUpdate({
                                            behavior: 'create',
                                        })
                                        );
                                        dispatch(clientesResete());
                                        setComponent('drawer', false);
                                    }}
                                >
                                    <span className="mdi mdi-arrow-left"> Voltar</span>
                                </button>
                            </div>
                        </div>
                        <form>
                            <div class="row mb-3 mt-3">
                                <div class="col-3" >
                                    <b>Nome</b>
                                    <input type="text" class="form-control form-control-sm" placeholder="" value={cliente.nome}
                                        onChange={(e) => setCliente('nome', e.target.value)}
                                    />
                                </div>
                                <div class="col-4">
                                    <b>Email</b>
                                    <input type="email" class="form-control form-control-sm" placeholder="" value={cliente.email}
                                        onChange={(e) => setCliente('email', e.target.value)}
                                    />
                                </div>
                                <div class="col-2">
                                    <b>Telefone</b>
                                    <input type="tel" class="form-control form-control-sm" placeholder="" value={cliente.telefone}
                                        onChange={(e) => setCliente('telefone', e.target.value)} />
                                </div>
                            </div>

                            <h3>Documento</h3>
                            <div class="row mb-4 mt-1">
                                <div class="col-3">
                                    <b>Tipo</b>
                                    <select class="form-control form-control-sm" value={cliente.documento.tipo}
                                        onChange={(e) =>
                                            setCliente('documento', {
                                                ...cliente.documento,
                                                tipo: e.target.value
                                            })
                                        }
                                    >
                                        <option value="" disabled selected>Selecione um tipo de documento</option>
                                        <option value=''></option>
                                        <option value='cpf'>cpf</option>
                                        <option value='cnpj'>cnpj</option>
                                    </select>
                                </div>
                                <div class="col-2">
                                    <b>Numero</b>
                                    <input type="text" class="form-control form-control-sm" placeholder="" value={cliente.documento.numero}
                                        onChange={(e) =>
                                            setCliente('documento', {
                                                ...cliente.documento,
                                                numero: e.target.value
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <h3>Endereço</h3>
                            <div class="row mb-4 mt-1">
                                <div class="col-3">
                                    <b>Estado (UF)</b>
                                    <select class="form-control form-control-sm" value={cliente.endereco.estado}
                                        onChange={(e) =>
                                            setCliente('endereco', {
                                                ...cliente.endereco,
                                                estado: e.target.value
                                            })
                                        }
                                    >
                                        <option value="" disabled selected>Selecione um estado (UF)</option>
                                        {ufs.map(uf => (
                                            <option
                                                key={uf}
                                                value={uf}>{uf}</option>
                                        ))}
                                    </select>
                                </div>
                                <div class="col-3">
                                    <b>Cidade</b>
                                    <select class="form-control form-control-sm" value={cliente.endereco.cidade}
                                        onChange={(e) =>
                                            setCliente('endereco', {
                                                ...cliente.endereco,
                                                cidade: e.target.value
                                            })
                                        }
                                    >
                                        <option value="" disabled selected>Selecione uma cidade</option>
                                        {cities.map(city => (
                                            <option
                                                key={city}
                                                value={city}>{city}</option>
                                        ))}
                                    </select>
                                    {/* <input type="text" class="form-control" placeholder="" value={cliente.endereco.cidade}
                                        onChange={(e) =>
                                            setCliente('endereco', {
                                                ...cliente.endereco,
                                                cidade: e.target.value,
                                            })
                                        }
                                    /> */}
                                </div>
                                <div class="col-2">
                                    <b>Cep</b>
                                    <input type="text" class="form-control form-control-sm" placeholder="" value={cliente.endereco.cep}
                                        onChange={(e) =>
                                            setCliente('endereco', {
                                                ...cliente.endereco,
                                                cep: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                            </div>
                            <div class="row mb-4 mt-1">
                                <div class="col-5">
                                    <b>Rua</b>
                                    <input type="text" class="form-control form-control-sm" placeholder="" value={cliente.endereco.logradouro}
                                        onChange={(e) =>
                                            setCliente('endereco', {
                                                ...cliente.endereco,
                                                logradouro: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div class="col-1">
                                    <b>Numero</b>
                                    <input type="text" class="form-control form-control-sm" placeholder="" value={cliente.endereco.numero}
                                        onChange={(e) =>
                                            setCliente('endereco', {
                                                ...cliente.endereco,
                                                numero: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div class="col-2">
                                    <b>Bairro</b>
                                    <input type="text" class="form-control form-control-sm" placeholder="" value={cliente.endereco.bairro}
                                        onChange={(e) =>
                                            setCliente('endereco', {
                                                ...cliente.endereco,
                                                bairro: e.target.value,
                                            })
                                        }
                                    />
                                </div>


                            </div>
                            <div class="row mb-4 mt-1">
                                <div class="col-3">
                                    <b>Tipo atividade</b>
                                    <input type="text" class="form-control form-control-sm" placeholder="" value={cliente.tipo_atividade}
                                        onChange={(e) =>
                                            setCliente('tipo_atividade', e.target.value)}
                                    />
                                </div>
                                <div class="col-2">
                                    <b>status</b>
                                    <input type="text" class="form-control form-control-sm" placeholder="" disabled={true} value={cliente.status}
                                        onChange={(e) =>
                                            setCliente('status', e.target.value)}
                                    />
                                </div>
                            </div>
                        </form>
                        <div>
                            <button
                                className="btn btn-danger btn-lg"
                                onClick={() => dispatch(clientesResete())}>
                                <span className="mdi mdi-close"> Cancelar</span>
                            </button>
                            {form.saving ? (
                                <button class="btn btn-primary btn-lg m-1" type="button" disabled={form.saving}>
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    salvando...
                                </button>
                            ) : (
                                <button
                                    className="btn btn-primary btn-lg m-1"
                                    onLoad={form.saving}
                                    onClick={() => salvar()}>
                                    <span className="mdi mdi-content-save"> Salvar</span>
                                </button>
                            )}
                        </div>
                        <Dialog open={dialog.show} >
                            <DialogTitle>Atenção!</DialogTitle>
                            <DialogContent style={{ width: 300 }}>{mensagem}</DialogContent>
                            <DialogActions>
                                <Button onClick={() => setForm('show', false)}> Ok</Button>
                            </DialogActions>
                        </Dialog>

                    </div>

                ) : (
                    <div>
                        <h3 className="mb-4 mt-4"> Pesquisar cliente</h3>
                        {/* <b>Nome</b> */}
                        {/* <div className="d-flex input-group mb-4 mt-4 form-control">
                            <span className="mdi mdi-account-search " />
                            <input
                                type="search"
                                className="form-control form-control-sm"
                                placeholder="Nome do cliente"
                                onChange={(txt) => setSearchView(txt.target.value)}
                            />
                        </div> */}

                        <div className="search">
                            <div className="search--input">
                                <div className="mdi mdi-account-search"/>
                                <input
                                    type="search"
                                    placeholder="Nome do cliente"
                                    onChange={(txt) => setSearchView(txt.target.value)}
                                />
                            </div>
                        </div>

                        <div className="row" >
                            <div className="col-12" >
                                <div className="w-100 d-flex justify-content-between">
                                    <h2 className="mb-4 mt-0">Clientes</h2>
                                    <div>
                                        <button
                                            className="btn btn-primary btn-lg"
                                            onClick={() => {
                                                dispatch(clientesUpdate({
                                                    behavior: 'create',
                                                })
                                                );
                                                setComponent('drawer', true);
                                            }}
                                        >
                                            <span className="mdi mdi-plus">Novo Cliente</span>
                                        </button>
                                    </div>

                                </div>

                                <Dialog open={openMsg}>
                                    <DialogTitle>Atenção!</DialogTitle>
                                    <DialogContent>{msg}</DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => setOpenMsg(false)} >Cancelar</Button>
                                        <Button onClick={() => deleteCliente()}> Confirmar</Button>
                                    </DialogActions>
                                </Dialog>



                                <TableComponent
                                    loading={form.filtering}
                                    data={listClientes}
                                    config={[
                                        { label: 'Nome', key: 'nome', width: 230, fixed: true },
                                        { label: 'Email', key: 'email', width: 200, fixed: true },
                                        { label: 'Telefone', key: 'telefone', width: 130, fixed: true },
                                        { label: 'Tipo doc', key: 'documento.tipo', width: 50, fixed: true },
                                        // { label: 'Numero doc', key: 'documento.numero', width: 70, fixed: true },
                                        // { label: 'Endereço', key: 'endereco', width: 230, fixed: true },
                                        // { label: 'Numero', key: 'endereco.numero', width: 70, fixed: true },
                                        { label: 'Cep', key: { cep: documento.cep }, width: 90, fixed: true },
                                        { label: 'Cidade', key: 'cidade', width: 100, fixed: true },
                                        { label: 'Estado', key: 'estado', width: 60, fixed: true },
                                        { label: 'Tipo atividade', key: 'tipo_atividade', width: 110, fixed: true }

                                    ]}
                                    actions={(cliente, acao) =>
                                    (<button
                                        id="update"
                                        className="btn btn-primary btn-m"
                                        onClick={() => {
                                            if (acao === 'update') {
                                                dispatch(clientesUpdate({
                                                    behavior: 'update',
                                                })
                                                );

                                                dispatch(clientesUpdate({
                                                    cliente,
                                                })
                                                );
                                                setComponent('drawer', true);
                                            }
                                        }
                                        }

                                    >
                                        <span className="mdi mdi-account-edit-outline" ></span>
                                    </button>)}

                                    actionsExc={(cliente, acao) => (
                                        <button
                                            id="delete"
                                            className="btn btn-danger btn-m"
                                            onClick={() => memorizeCliente(cliente)}>
                                            <span className="mdi mdi-close"></span>
                                        </button>)}

                                    onRowClick={(cliente) => { }} />
                            </div>
                        </div>
                    </div>
                )
                }
            </div >
        </>
    );
}

export default Clientes;