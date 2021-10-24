import React from 'react';
import types from './types';

export function clientesAll() {
    return { type: types.REQUEST_CLIENTE };
}

export function clientesUpdate(payload) {
    return { type: types.UPDATE_CLIENTE, payload };
}


export function clientesResete(payload) {
    return { type: types.RESETE_CLIENTE, payload };
}


export function clientesAdd(payload) {
    return { type: types.ADD_CLIENTE, payload };
}

export function clientesDelete(payload) {
    return { type: types.DELETE_CLIENTE, payload };
}



