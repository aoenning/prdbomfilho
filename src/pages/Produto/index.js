import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer, Form, ButtonGroup, ButtonToolbar } from 'rsuite';
import 'rsuite-table/dist/css/rsuite-table.css';
import TableComponent from './../../components/Table';
import { produtosAll, produtosUpdate, produtosAdd, produtosResete, produtosDelete } from '../../store/modules/produto/action';
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
import { maskPhone, maskCnpj, maskCpf, maskCep, maskCurrency } from './../../components/Mask';
import { confirmAlert } from 'react-confirm-alert';

const Produto = () => {
    const [listProdutos, setListProdutos] = useState([]);
    const [tipoPorc, setTipoPorc] = useState('');
    const [searchView, setSearchView] = useState('');
    const [open, setOpen] = useState(false);
    const [openMsg, setOpenMsg] = useState(false);
    const [showMsg, setShowMsg] = useState(false);
    const [msg, setMsg] = React.useState('');
    const [ufs, setUfs] = useState([]);
    const [cities, setCities] = useState([]);
    const dispatch = useDispatch();
    // const [image, setImage] = useState('');
    const { produtos, produto, form, behavior, components, mensagem, dialog, file, image } = useSelector(function (state) { return state.produtos });

    const setComponent = (component, state) => {
        dispatch(produtosUpdate({
            components: { ...components, [component]: state },
        })
        );
    }


    const setForm = (component, state) => {
        dispatch(produtosUpdate({
            dialog: { ...dialog, [component]: state },
        })
        );
    }

    useEffect(() => {
        intial();
    }, []);




    function intial() {
        dispatch(produtosAll());
    }

    useEffect(() => {
        setListProdutos(produtos);
    }, [produtos]);

    useEffect(() => {
        if (behavior === 'update') {
            dispatch(produtosUpdate({ image: produto.image }));
        }
    }, [behavior])

    useEffect(() => {
        console.log(produto);
    }, [produto]);

    useEffect(() => {
        setListProdutos([]);
        produtos.filter(val => {
            if (val.descricao.toLowerCase().includes(searchView.toLowerCase())) {
                setListProdutos(output => [...output, val])
            }
        })
    }, [searchView]);




    async function salvar() {

        if (!produto.descricao) {
            alert('Informe o descricao');
            return;
        }

        if (!produto.unidade) {
            alert('Informe o unidade');
            return;
        }

        if (!produto.preco) {
            alert('Informe o preco');
            return;
        }


        dispatch(produtosAdd());
    }





    function setProduto(key, value) {

        switch (key) {
            case 'preco': {
                const result = maskCurrency(value);
                value = result;
            }

            default:
        }
        dispatch(produtosUpdate({
            produto: { ...produto, [key]: value },
        })
        );


    }


    function deleteProduto() {
        dispatch(produtosDelete());
        setOpenMsg(false);

    }

    function memorizeProdutos(produto) {
        setOpenMsg(true);
        dispatch(produtosUpdate({
            behavior: 'update',
        })
        );

        dispatch(produtosUpdate({
            produto,
        })
        );

        setMsg('Deseja realmente excluir?')
    }

    const formtData = (file) => {
        // const formData = new FormData();
        // formData.append('image', file);


        if (file) {
            // const img = URL.createObjectURL(file)
            dispatch(produtosUpdate({ file: file }));
            dispatch(produtosUpdate({ image: URL.createObjectURL(file) }));
        }
    }

    return (
        <>
            <div className="col p-6 owerflow-auto h-100">
                {components.drawer ? (
                    <div className="mb-4 mt-4">
                        <div className="w-100 d-flex justify-content-between">
                            <h2 className="mb-2 mt-0">Cadastro de produtos</h2>
                            <div>
                                <button
                                    className="btn btn-primary btn-lg"
                                    onClick={() => {
                                        dispatch(produtosUpdate({
                                            behavior: 'create',
                                        })
                                        );
                                        dispatch(produtosResete());
                                        setComponent('drawer', false);
                                    }}
                                >
                                    <span className="mdi mdi-arrow-left"> Voltar</span>
                                </button>
                            </div>
                        </div>
                        <h3 className="mb-2 mt-5">Imagem</h3>
                        <div class="col-4" style={{ alignItems: 'center', justifyContent: 'right' }}>
                            <img src={behavior === 'create' ? image : { uri: image }} />
                        </div>
                        <div class="col-4" >
                            <input type="file" class="form-control" onChange={(e) => formtData(e.target.files[0])} />
                        </div>

                        <form>
                            <div class="row mb-3 mt-3">
                                <div class="col-3" >
                                    <b>Descrição</b>
                                    <input type="text" class="form-control" placeholder="" value={produto.descricao}
                                        onChange={(e) => setProduto('descricao', e.target.value)}
                                    />
                                </div>
                                <div class="col-4">
                                    <b>Unidade</b>
                                    <input type="email" class="form-control" placeholder="" value={produto.unidade}
                                        onChange={(e) => setProduto('unidade', e.target.value)}
                                    />
                                </div>
                                <div class="col-2">
                                    <b>Preço</b>
                                    <input type="tel" class="form-control" placeholder="" value={produto.preco}
                                        onChange={(e) => setProduto('preco', e.target.value)} />
                                </div>
                            </div>

                        </form>
                        <div>
                            <button
                                className="btn btn-danger btn-lg"
                                onClick={() => dispatch(produtosResete())}>
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
                        <h3 className="mb-4 mt-4"> Pesquisar produto</h3>
                        <b>Nome</b>
                        <div className="input-group mb-4 mt-4">
                            <input
                                type="search"
                                className="form-control form-control-lm"
                                placeholder="Nome do produto"
                                onChange={(txt) => setSearchView(txt.target.value)}
                            />

                            <div className="input-group-append px-3">
                                <button
                                    className="btn btn-primary btn-lm"
                                    onClick={() => setComponent()}>
                                    <span className="mdi mdi-account-search"> Pesquisar</span>
                                </button>
                            </div>
                        </div>

                        <div className="row" >
                            <div className="col-12" >
                                <div className="w-100 d-flex justify-content-between">
                                    <h2 className="mb-4 mt-0">Produtos</h2>
                                    <div>
                                        <button
                                            className="btn btn-primary btn-lg"
                                            onClick={() => {
                                                dispatch(produtosUpdate({
                                                    behavior: 'create',
                                                })
                                                );
                                                setComponent('drawer', true);
                                            }}
                                        >
                                            <span className="mdi mdi-plus">Novo Produto</span>
                                        </button>
                                    </div>

                                </div>

                                <Dialog open={openMsg}>
                                    <DialogTitle>Atenção!</DialogTitle>
                                    <DialogContent>{msg}</DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => setOpenMsg(false)} >Cancelar</Button>
                                        <Button onClick={() => deleteProduto()}> Confirmar</Button>
                                    </DialogActions>
                                </Dialog>



                                <TableComponent
                                    loading={form.filtering}
                                    data={listProdutos}
                                    config={[
                                        { label: 'Descrição', key: 'descricao', width: 230, fixed: true },
                                        { label: 'Unidade', key: 'unidade', width: 200, fixed: true },
                                        { label: 'Preço', key: 'preco', width: 130, fixed: true },
                                        { label: 'Status', key: 'status', width: 50, fixed: true },

                                    ]}
                                    actions={(produto, acao) =>
                                    (<button
                                        id="update"
                                        className="btn btn-primary btn-m"
                                        onClick={() => {
                                            if (acao === 'update') {
                                                dispatch(produtosUpdate({
                                                    behavior: 'update',
                                                })
                                                );

                                                dispatch(produtosUpdate({ produto }));
                                                dispatch(produtosUpdate({ image: produto.url }));
                                                setComponent('drawer', true);
                                            }
                                        }
                                        }

                                    >
                                        <span className="mdi mdi-account-edit-outline" ></span>
                                    </button>)}

                                    actionsExc={(produto, acao) => (
                                        <button
                                            id="delete"
                                            className="btn btn-danger btn-m"
                                            onClick={() => memorizeProdutos(produto)}>
                                            <span className="mdi mdi-close"></span>
                                        </button>)}

                                    onRowClick={(produto) => { }} />
                            </div>
                        </div>
                    </div>
                )
                }
            </div >
        </>
    );
}

export default Produto;