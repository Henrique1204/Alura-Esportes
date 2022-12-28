import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import estilos from './estilos';

const Botao = ({ onPress, children }) => {
  return (
    <TouchableOpacity style={estilos.botao} onPress={onPress}>
      <Text style={estilos.textoBotao}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Botao;
