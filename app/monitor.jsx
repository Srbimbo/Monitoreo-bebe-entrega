import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

const BACKEND_IP = '172.20.10.3'; // reemplazar con la IP WIFI del PC
const ANALYZE_URL = `http://${BACKEND_IP}:8000/analyze`;

export default function MonitorScreen() {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [lastResult, setLastResult] = useState(null);

  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission]);

  const escanear = async () => {
    if (!cameraRef.current) return;
    try {
      const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 0.5 });
      let base64 = photo.base64;
      // corrige los posibles espacios en el base64 :contentReference[oaicite:1]{index=1}
      base64 = base64.replace(/ /g, '+'); 
      const resp = await fetch(ANALYZE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64 }),
      });
      const data = await resp.json();
      setLastResult(data);
      if (data.status === 'crítico') {
        Alert.alert('⚠️ Alerta crítica', data.alerts?.join('\n'));
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'No se pudo analizar la imagen');
    }
  };

  const verDatos = () => {
    if (!lastResult) {
      Alert.alert('Sin datos', 'Primero debes escanear');
      return;
    }
    Alert.alert(
      'Resultado',
      `Estado: ${lastResult.status}\nRPM: ${lastResult.rpm}\nCaras: ${lastResult.faces_detected}\nObjetos: ${lastResult.objects_detected}`
    );
  };

  if (!permission) {
    return <View style={styles.center}><Text>Solicitando permisos...</Text></View>;
  }
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>No tienes acceso a la cámara</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text style={{ color: 'blue', marginTop: 10 }}>Permitir cámara</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back" ref={cameraRef} />
      <TouchableOpacity style={styles.scanButton} onPress={escanear}>
        <Text style={styles.buttonText}>Escanear</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.dataButton} onPress={verDatos}>
        <Text style={styles.buttonText}>Ver datos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scanButton: {
    position: 'absolute', bottom: 100, left: 40,
    backgroundColor: '#FFB6C188', padding: 16, borderRadius: 16
  },
  dataButton: {
    position: 'absolute', bottom: 100, right: 40,
    backgroundColor: '#AEC6CF88', padding: 16, borderRadius: 16
  },
  buttonText: {
    color: '#000', fontWeight: 'bold'
  }
});

