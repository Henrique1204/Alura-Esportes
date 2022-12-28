import React from 'react';
import { Alert, View } from 'react-native';

import estilos from './estilos';

import Botao from '../../componentes/Botao';
import EntradaTexto from '../../componentes/EntradaTexto';
import Alerta from '../../componentes/Alerta';

import { cadastrar } from '../../servicos/requisicoesFirebase';

const Cadastro = () => {
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [confirmaSenha, setConfirmaSenha] = React.useState('');

  const [statusError, setStatusError] = React.useState('');
  const [mensagemError, setMensagemError] = React.useState('');

  const limparErro = () => {
    setStatusError('');
    setMensagemError('');
  };

  const eEmailValido = () => {
    if (email === '') {
      setStatusError('email');
      setMensagemError('O e-mail é obrigatório!');

      return false;
    }
  
    limparErro();

    return true;
  }

  const eSenhaValida = () => {
    if (senha === '') {
      setStatusError('senha');
      setMensagemError('A senha é obrigatória!');

      return false;
    }
  
    limparErro();

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
  
    limparErro();

    return true;
  }

  const realizarCadastro = async () => {
    if (!eEmailValido() || !eSenhaValida() || !eConfirmarSenhaValida()) return;
  
    const { sucesso, mensagem } = await cadastrar(email, senha);

    if (sucesso) {
      setEmail('');
      setSenha('');
      setConfirmaSenha('');
    }
  
    setStatusError('firebase');
    setMensagemError(mensagem);
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

      <Alerta
        setError={limparErro}
        error={statusError === 'firebase'}
        mensagem={mensagemError}
      />
    </View>
  );
};

export default Cadastro;
