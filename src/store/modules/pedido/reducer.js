const INITIAL_STATE = {
    pedido: [],
};

function pedido(state = INITIAL_STATE, action) {
    switch (action.type) {
        case '@pedido/ALL': {

        }
        default:
            return state;
    }
}

export default pedido;