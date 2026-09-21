import React, {useState} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {cadastrar, entrar, traduzirErro} from '../services/authService';

export default function AuthScreen() {
  const [modoCadastro, setModoCadastro] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function enviar() {
    setErro('');

    if (!email.trim() || !senha) {
      setErro('Preencha e-mail e senha.');
      return;
    }

    setCarregando(true);
    try {
      if (modoCadastro) {
        await cadastrar(email.trim(), senha);
      } else {
        await entrar(email.trim(), senha);
      }
      // Sucesso: não é preciso navegar. O App.js detecta o usuário logado.
    } catch (e) {
      setErro(traduzirErro(e && e.code));
    } finally {
      setCarregando(false);
    }
  }

  function alternarModo() {
    setModoCadastro(atual => !atual);
    setErro('');
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Text style={styles.titulo}>
        {modoCadastro ? 'Criar conta' : 'Entrar'}
      </Text>
      <Text style={styles.subtitulo}>
        {modoCadastro
          ? 'Informe um e-mail e crie uma senha.'
          : 'Use o e-mail e a senha da sua conta.'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#8a8f98"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha (mínimo 6 caracteres)"
        placeholderTextColor="#8a8f98"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

      <TouchableOpacity
        style={[styles.botao, carregando && styles.botaoDesativado]}
        onPress={enviar}
        disabled={carregando}>
        {carregando ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.textoBotao}>
            {modoCadastro ? 'Cadastrar' : 'Entrar'}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={alternarModo} disabled={carregando}>
        <Text style={styles.link}>
          {modoCadastro
            ? 'Já tem conta? Faça login'
            : 'Não tem conta? Cadastre-se'}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    backgroundColor: '#f7f8fa',
  },
  titulo: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1d2433',
    marginBottom: 6,
  },
  subtitulo: {
    fontSize: 15,
    color: '#5b6272',
    marginBottom: 28,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d5d9e0',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1d2433',
    marginBottom: 12,
  },
  erro: {
    color: '#b3261e',
    fontSize: 14,
    marginBottom: 12,
  },
  botao: {
    backgroundColor: '#1f5fbf',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 18,
  },
  botaoDesativado: {
    opacity: 0.6,
  },
  textoBotao: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    color: '#1f5fbf',
    fontSize: 15,
    textAlign: 'center',
  },
});
