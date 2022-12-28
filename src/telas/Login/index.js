import React from 'react';
import { View } from 'react-native';

import estilos from './estilos';

import Botao from '../../componentes/Botao';
import EntradaTexto from '../../componentes/EntradaTexto';

import { logar } from '../../servicos/requisicoesFirebase';

const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');

  const realizarLogin = async () => {
    const { sucesso } = await logar(email, senha);
  
    if (sucesso) return navigation.navigate('Principal');
  };

  return (
    <View style={estilos.container}>
      <EntradaTexto 
        label="E-mail"
        value={email}
        onChangeText={texto => setEmail(texto)}
      />
      <EntradaTexto
        label="Senha"
        value={senha}
        onChangeText={texto => setSenha(texto)}
        secureTextEntry
      />
      
      <Botao onPress={realizarLogin}>LOGAR</Botao>
      <Botao 
        onPress={() => { navigation.navigate('Cadastro') }}
      >
        CADASTRAR USUÁRIO
      </Botao>
    </View>
  );
};

export default Login;
