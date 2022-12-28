import React from 'react';
import { View, Text } from 'react-native';

import estilos from './estilos';

import Cabecalho from '../../componentes/Cabecalho';
import Produto from '../../componentes/Produtos';

import { auth } from '../../config/firebase';

const Principal = ({ navigation }) => {
  const { email } = auth.currentUser;

  return (
    <View style={estilos.container}>
      <Cabecalho navigation={navigation} />
      <Text style={estilos.texto}>Usuário: {email}</Text>

      <Produto nome="Tênis" preco="200,00" />
      <Produto nome="Camisa" preco="100,00" />
      <Produto nome="Suplementos" preco="150,00" />
     </View>
  );
};

export default Principal;
