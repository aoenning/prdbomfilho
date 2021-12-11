import React from 'react';
import types from './types';

export function produtosAll() {
    return { type: types.REQUEST_PRODUTO };
}

export function produtosUpdate(payload) {
    return { type: types.UPDATE_PRODUTO, payload };
}


export function produtosResete(payload) {
    return { type: types.RESETE_PRODUTO, payload };
}


export function produtosAdd(payload) {
    return { type: types.ADD_PRODUTO, payload };
}

export function produtosDelete(payload) {
    return { type: types.DELETE_PRODUTO, payload };
}




