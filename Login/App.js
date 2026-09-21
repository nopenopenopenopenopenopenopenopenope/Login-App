import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [inicializando, setInicializando] = useState(true);

  useEffect(() => {
    // Escuta mudanças de estado: cadastro, login e logout disparam este evento.
    // Também restaura a sessão quando o app é reaberto.
    const cancelar = onAuthStateChanged(getAuth(), user => {
      setUsuario(user);
      setInicializando(false);
    });

    return cancelar; // remove o listener ao desmontar o componente
  }, []);

  if (inicializando) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#1f5fbf" />
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f7f8fa" />
      {usuario ? <HomeScreen email={usuario.email} /> : <AuthScreen />}
    </>
  );
}
