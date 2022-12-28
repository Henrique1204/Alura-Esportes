import React from 'react';
import { Snackbar } from 'react-native-paper';

const Alerta = ({ 
    mensagem,
    error = false,
    setError
 }) => {
    const close = () => setError(false);

    return (
        <Snackbar
            visible={error}
            onDismiss={close}
            duration={1500}
            action={{
                label: "OK",
                onPress: close,
            }}
        >
            {mensagem}
        </Snackbar>
    )
};

export default Alerta;
