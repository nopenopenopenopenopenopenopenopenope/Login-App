import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {sair} from '../services/authService';

export default function HomeScreen({email}) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Você está logado</Text>
      <Text style={styles.rotulo}>Conta ativa</Text>
      <Text style={styles.email}>{email}</Text>

      <TouchableOpacity style={styles.botao} onPress={sair}>
        <Text style={styles.textoBotao}>Sair da conta</Text>
      </TouchableOpacity>
    </View>
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
    marginBottom: 24,
  },
  rotulo: {
    fontSize: 14,
    color: '#5b6272',
    marginBottom: 4,
  },
  email: {
    fontSize: 18,
    color: '#1d2433',
    fontWeight: '500',
  },
  botao: {
    borderWidth: 1.5,
    borderColor: '#b3261e',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  textoBotao: {
    color: '#b3261e',
    fontSize: 16,
    fontWeight: '600',
  },
});
