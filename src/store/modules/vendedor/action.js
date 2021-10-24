import React from 'react';
import types from './types';

export function vendedorAll() {
    return { type: types.REQUEST_VENDEDOR };
}

export function vendedoresUpdate(payload) {
    return { type: types.UPDATE_VENDEDOR, payload };
}


