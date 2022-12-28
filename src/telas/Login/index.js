import React from 'react';
import { SafeAreaView } from 'react-native';

import estilos from './estilos';

import Botao from '../../componentes/Botao';
import EntradaTexto from '../../componentes/EntradaTexto';
import Alerta from '../../componentes/Alerta';

import { logar } from '../../servicos/requisicoesFirebase';
import { auth } from '../../config/firebase';

const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');

  const [statusError, setStatusError] = React.useState('');
  const [mensagemError, setMensagemError] = React.useState('');

  const onNavigateLogin = () => navigation.replace('Principal');

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
  };

  const eSenhaValida = () => {
    if (senha === '') {
      setStatusError('senha');
      setMensagemError('A senha é obrigatória!');

      return false;
    }
  
    limparErro();

    return true;
  };

  const realizarLogin = async () => {
    if (!eEmailValido() || !eSenhaValida()) return;

    const { sucesso, mensagem } = await logar(email, senha);
  
    if (sucesso) return onNavigateLogin();

    setStatusError('firebase');
    setMensagemError(mensagem);
  };

  React.useEffect(() => {
    const estadoUsuario = auth.onAuthStateChanged((usuario) => usuario && onNavigateLogin());
  
    return () => estadoUsuario();
  }, []);

  return (
    <SafeAreaView style={estilos.container}>
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
      
      <Botao onPress={realizarLogin}>LOGAR</Botao>

      <Botao 
        onPress={() => navigation.navigate('Cadastro')}
      >
        CADASTRAR USUÁRIO
      </Botao>

      <Alerta
        setError={limparErro}
        error={statusError === 'firebase'}
        mensagem={mensagemError}
      />
    </SafeAreaView>
  );
};

export default Login;
