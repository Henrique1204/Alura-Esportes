import React from 'react';
import { Alert, View } from 'react-native';

import estilos from './estilos';

import Botao from '../../componentes/Botao';
import EntradaTexto from '../../componentes/EntradaTexto';

import { cadastrar } from '../../servicos/requisicoesFirebase';


const Cadastro = () => {
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [confirmaSenha, setConfirmaSenha] = React.useState('');

  const [statusError, setStatusError] = React.useState('');
  const [mensagemError, setMensagemError] = React.useState('');

  const eEmailValido = () => {
    if (email === '') {
      setStatusError('email');
      setMensagemError('O e-mail é obrigatório!');

      return false;
    }
  
    setStatusError('');
    setMensagemError('');

    return true;
  }

  const eSenhaValida = () => {
    if (senha === '') {
      setStatusError('senha');
      setMensagemError('A senha é obrigatória!');

      return false;
    }
  
    setStatusError('');
    setMensagemError('');

    return true;
  }

  const eConfirmarSenhaValida = () => {
    if (confirmaSenha === '') {
      setStatusError('confirmarSenha');
      setMensagemError('A confirmação de senha é obrigatória!');

      return false;
    }
  
    if (confirmaSenha !== senha) {
      setStatusError('confirmarSenha');
      setMensagemError('As senhas precisam ser iguais.');

      return false;
    }
  
    setStatusError('');
    setMensagemError('');

    return true;
  }

  const realizarCadastro = async () => {
    if (!eEmailValido() || !eSenhaValida() || !eConfirmarSenhaValida()) return;
  
    const resultado = await cadastrar(email, senha);

    if (resultado.sucesso) {
      setEmail('');
      setSenha('');
      setConfirmaSenha('');
    }
  
    Alert.alert(resultado.mensagem);
  };

  return (
    <View style={estilos.container}>
      <EntradaTexto 
        label="E-mail"
        value={email}
        onChangeText={texto => setEmail(texto)}
        error={statusError === 'email'}
        messageError={mensagemError}
      />

      <EntradaTexto
        label="Senha"
        value={senha}
        onChangeText={texto => setSenha(texto)}
        secureTextEntry
        error={statusError === 'senha'}
        messageError={mensagemError}
      />

      <EntradaTexto
        label="Confirmar Senha"
        value={confirmaSenha}
        onChangeText={texto => setConfirmaSenha(texto)}
        secureTextEntry
        error={statusError === 'confirmarSenha'}
        messageError={mensagemError}
      />
      
      <Botao onPress={() => realizarCadastro()}>CADASTRAR</Botao>
    </View>
  );
};

export default Cadastro;
