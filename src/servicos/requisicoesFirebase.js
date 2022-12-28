import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, AuthErrorCodes } from 'firebase/auth';


const tratarErrosFirebase = (error) => {
  switch(error.code) {
    case AuthErrorCodes.EMAIL_EXISTS:
      return 'Esse e-mail está em uso.';
    case AuthErrorCodes.INVALID_EMAIL:
      return 'Esse e-mail é inválido.';
    case AuthErrorCodes.WEAK_PASSWORD:
      return 'A senha precisa de no mínimo 6 caracteres.';
    default:
      return 'Erro desconhecido.';
  }
}

export const cadastrar = async (email, senha) => {
  const resultado = await createUserWithEmailAndPassword(auth, email, senha)
  .then((dadosDoUsuario) => {
    return { sucesso: true, mensagem: 'Usuário cadastrado com sucesso!' };
  })
  .catch(tratarErrosFirebase);

  return {
    sucesso: Boolean(resultado?.sucesso),
    mensagem: resultado?.mensagem || resultado,
  }
};
