export const isAuthentcated = () => {
    const logado = localStorage.getItem('@user');
    if (logado) {
        return true;
    } else {
        return false;
    }
}