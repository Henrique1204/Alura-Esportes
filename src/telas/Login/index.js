import React from 'react';
import { SafeAreaView, Image } from 'react-native';

import estilos from './estilos';

import Botao from '../../componentes/Botao';
import EntradaTexto from '../../componentes/EntradaTexto';
import Alerta from '../../componentes/Alerta';

import { logar } from '../../servicos/requisicoesFirebase';
import { auth } from '../../config/firebase';

import loading from '../../assets/loading.gif';
import useForm from '../../hooks/useForm';

const Login = ({ navigation }) => {
  const [dados, onChange] = useForm({
    email: '',
    senha: '',
  });

  const [statusError, setStatusError] = React.useState('');
  const [mensagemError, setMensagemError] = React.useState('');

  const [carregando, setCarregando] = React.useState(true);

  const onNavigateLogin = () => navigation.replace('Principal');

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
  };

  const eSenhaValida = () => {
    if (dados.senha === '') {
      setStatusError('senha');
      setMensagemError('A senha é obrigatória!');

      return false;
    }
  
    limparErro();

    return true;
  };

  const realizarLogin = async () => {
    if (!eEmailValido() || !eSenhaValida()) return;

    setCarregando(true);
 
    const { sucesso, mensagem } = await logar(dados.email, dados.senha);

    setCarregando(false);
  
    if (sucesso) return onNavigateLogin();

    setStatusError('firebase');
    setMensagemError(mensagem);
  };

  React.useEffect(() => {
    const estadoUsuario = auth.onAuthStateChanged((usuario) => {
      if (usuario) onNavigateLogin()
      
      setCarregando(false);
    });

    return () => estadoUsuario();
  }, []);

  if (carregando) {
    return (
      <SafeAreaView style={estilos.containerAnimacao}>
        <Image source={loading} style={estilos.image} />
      </SafeAreaView>
    )
  }

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
