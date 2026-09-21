import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';

import { auth } from '../firebase';

// CADASTRO: cria a conta e já deixa o usuário logado.
export function cadastrar(email, senha) {
  return createUserWithEmailAndPassword(auth, email, senha);
}

// LOGIN: confere e-mail e senha de uma conta existente.
export function entrar(email, senha) {
  return signInWithEmailAndPassword(auth, email, senha);
}

// LOGOUT: encerra a sessão do usuário atual.
export function sair() {
  return signOut(auth);
}

// Traduz os códigos de erro do Firebase para mensagens em português.
export function traduzirErro(code) {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'Este e-mail já está cadastrado.';
    case 'auth/invalid-email':
      return 'O e-mail informado é inválido.';
    case 'auth/weak-password':
      return 'A senha deve ter pelo menos 6 caracteres.';
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'E-mail ou senha incorretos.';
    case 'auth/too-many-requests':
      return 'Muitas tentativas. Aguarde um pouco e tente de novo.';
    case 'auth/network-request-failed':
      return 'Sem conexão com a internet.';
    case 'auth/operation-not-allowed':
      return 'Login por e-mail e senha não está ativado no Firebase.';
    default:
      return 'Ocorreu um erro. Tente novamente.';
  }
}
