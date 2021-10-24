import React from 'react';
import types from './types';

export function loginAll() {
    return { type: types.REQUEST_AUTENTICACAO };
}

export function loginUpdate(payload) {
    return { type: types.UPDATE_AUTENTICACAO, payload };
}

export function loginFilter(payload) {
    return { type: types.FILTER_AUTENTICACAO, payload };
}


