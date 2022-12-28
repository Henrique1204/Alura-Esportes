import React from 'react';

const useForm = (dadosIniciais) => {
    const [dados, setDados] = React.useState(dadosIniciais);
    
    const onChange = (campo) => (valor) => setDados((prev) => ({ ...prev, [campo]: valor }));

    return [dados, onChange];
};

export default useForm;
