import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const cadastrar = async (email, senha) => {
  createUserWithEmailAndPassword(auth, email, senha)
  .then((dadosDoUsuario) => {
    console.log(dadosDoUsuario)
  })
  .catch((error) => {
    console.log(error)
  });
};
