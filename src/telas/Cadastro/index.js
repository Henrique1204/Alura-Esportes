import React from 'react';
import { SafeAreaView } from 'react-native';

import estilos from './estilos';

import Botao from '../../componentes/Botao';
import EntradaTexto from '../../componentes/EntradaTexto';
import Alerta from '../../componentes/Alerta';

import { cadastrar } from '../../servicos/requisicoesFirebase';
import useForm from '../../hooks/useForm';
import { eIgual, eVazio } from '../../utils/validacoes';

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

  const validarEntradas = () => {
    if (eVazio(dados.email)) {
      setStatusError('email');
      setMensagemError('O e-mail é obrigatório!');
  
      return false;
    }
  
    if (eVazio(dados.senha)) {
      setStatusError('senha');
      setMensagemError('A senha é obrigatória!');

      return false;
    }

    if (eVazio(dados.confirmaSenha)) {
      setStatusError('confirmarSenha');
      setMensagemError('A confirmação de senha é obrigatória!');
  
      return false;
    }
  
    if (eIgual(dados.confirmaSenha, dados.senha)) {
      setStatusError('confirmarSenha');
      setMensagemError('As senhas precisam ser iguais.');
  
      return false;
    }

    limparErro();

    return true;
  }

  const realizarCadastro = async () => {
    if (!validarEntradas()) return setError(mensagemNaoValida);
  
    const { sucesso, mensagem } = await cadastrar(dados.email, dados.senha);

    if (sucesso) {
      setEmail('');
      setSenha('');
      setConfirmaSenha('');
    }
  
    setStatusError('firebase');
    setMensagemError(mensagem);
  };

  const entradas = [
    {
      label: 'E-mail',
      name: 'email',
    },
    {
      label: 'Senha',
      name: 'senha',
      secureTextEntry: true,
    },
    {
      label: 'Confirmar Senha',
      name: 'confirmaSenha',
      secureTextEntry: true,
    }
  ];

  return (
    <SafeAreaView style={estilos.container}>
      {entradas.map(({ name, ...props}) => (
        <EntradaTexto
          key={name}
          value={dados[name]}
          onChangeText={onChange(name)}
          error={statusError === name}
          messageError={mensagemError}
          {...props}
        />
      ))}
      
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
