function maskPhone(value) {
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/g, "($1)$2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2")
    return value;
}

function maskCurrency(value) {

    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{2})$/, "$1,$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
    return value;

}

function maskCpf(value) {
    value = value.replace(/\D/g, "")                    //Remove tudo o que não é dígito
    value = value.replace(/(\d{3})(\d)/, "$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
    value = value.replace(/(\d{3})(\d)/, "$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos de novo (para o segundo bloco de números)
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2") //Coloca um hífen entre o terceiro e o quarto dígitos
    return value;
}

function maskCnpj(value) {
    value = value.replace(/\D/g, "")                    //Remove tudo o que não é dígito	
    value = value.replace(/(\d{2})(\d)/, "$1.$2")
    value = value.replace(/(\d{3})(\d)/, "$1.$2")
    value = value.replace(/(\d{3})(\d)/, "$1/$2")
    value = value.replace(/(\d)(\d{2})$/, "$1-$2");    //Coloca o . antes dos últimos 3 dígitos, e antes do verificador 
    return value;
}

function maskCep(value) {
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    return value;
}

export { maskPhone, maskCurrency, maskCpf, maskCnpj, maskCep };