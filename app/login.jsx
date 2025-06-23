import { useRouter } from 'expo-router'; // router en lugar de navigation
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter(); // hook de expo-router
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    console.log('Login with', email, password);
    // backend
    router.push('/monitor'); // redirige a la pantalla monitor
  };

  const onRegister = () => router.push('/register'); // pantalla futura implementacion 

  const onSkip = () => router.push('/monitor'); //omitir → va a monitor

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monitor Bebé</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo"
        placeholderTextColor="#666"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#666"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginBtn} onPress={onLogin}>
        <Text style={styles.btnText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerBtn} onPress={onRegister}>
        <Text style={styles.btnText}>Registrarse</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onSkip}>
        <Text style={styles.skipText}>Omitir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    padding: 20, backgroundColor: '#F0F6FF'
  },
  title: {
    fontSize: 28, fontWeight: '700', color: '#4A90E2', marginBottom: 20
  },
  input: {
    width: '100%', height: 50, backgroundColor: '#FFF', borderRadius: 12,
    paddingHorizontal: 16, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 }, shadowRadius: 8
  },
  loginBtn: {
    width: '100%', padding: 15, borderRadius: 12,
    backgroundColor: '#FFB6C1', alignItems: 'center', marginTop: 10
  },
  registerBtn: {
    width: '100%', padding: 15, borderRadius: 12,
    backgroundColor: '#AEC6CF', alignItems: 'center', marginTop: 10
  },
  btnText: {
    fontSize: 16, fontWeight: '600', color: '#fff'
  },
  skipText: {
    marginTop: 15, color: '#888', textDecorationLine: 'underline'
  }
});

