import React from 'react';
import { SafeAreaView } from 'react-native';

import estilos from './estilos';

import Botao from '../../componentes/Botao';
import EntradaTexto from '../../componentes/EntradaTexto';
import Alerta from '../../componentes/Alerta';

import { cadastrar } from '../../servicos/requisicoesFirebase';
import useForm from '../../hooks/useForm';

const Cadastro = () => {
  const [dados, onChange] = useForm({
    email: '',
    senha: '',
    confirmaSenha: '',
  });

  const [statusError, setStatusError] = React.useState('');
  const [mensagemError, setMensagemError] = React.useState('');

  const limparErro = () => {
    setStatusError('');
    setMensagemError('');
  };

  const eEmailValido = () => {
    if (dados.email === '') {
      setStatusError('email');
      setMensagemError('O e-mail é obrigatório!');

      return false;
    }
  
    limparErro();

    return true;
  }

  const eSenhaValida = () => {
    if (dados.senha === '') {
      setStatusError('senha');
      setMensagemError('A senha é obrigatória!');

      return false;
    }
  
    limparErro();

    return true;
  }

  const eConfirmarSenhaValida = () => {
    if (dados.confirmaSenha === '') {
      setStatusError('confirmarSenha');
      setMensagemError('A confirmação de senha é obrigatória!');

      return false;
    }
  
    if (dados.confirmaSenha !== senha) {
      setStatusError('confirmarSenha');
      setMensagemError('As senhas precisam ser iguais.');

      return false;
    }
  
    limparErro();

    return true;
  }

  const realizarCadastro = async () => {
    if (!eEmailValido() || !eSenhaValida() || !eConfirmarSenhaValida()) return;
  
    const { sucesso, mensagem } = await cadastrar(dados.email, dados.senha);

    if (sucesso) {
      setEmail('');
      setSenha('');
      setConfirmaSenha('');
    }
  
    setStatusError('firebase');
    setMensagemError(mensagem);
  };

  return (
    <SafeAreaView style={estilos.container}>
      <EntradaTexto 
        label="E-mail"
        value={dados.email}
        onChangeText={onChange('email')}
        error={statusError === 'email'}
        messageError={mensagemError}
      />

      <EntradaTexto
        label="Senha"
        value={dados.senha}
        onChangeText={onChange('senha')}
        secureTextEntry
        error={statusError === 'senha'}
        messageError={mensagemError}
      />

      <EntradaTexto
        label="Confirmar Senha"
        value={dados.confirmaSenha}
        onChangeText={onChange('confirmaSenha')}
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
    </SafeAreaView>
  );
};

export default Cadastro;
