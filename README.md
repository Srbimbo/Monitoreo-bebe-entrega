Monitoreo Bebé

Proyecto de ejemplo que combina una app móvil Expo (React Native) y un backend FastAPI (Python + OpenCV) para detectar riesgos de apnea o asfixia en bebés mediante la cámara del dispositivo.

Estructura del repositorio

monitoreo-bebe-final/
├── app/                  # Carpeta de la app Expo (frontend)
│   ├── _layout.jsx
│   ├── index.jsx
│   ├── loading.jsx
│   ├── login.jsx
│   └── monitor.jsx
├── assets/               # Imágenes y recursos de Expo
├── monitor-backend/      # Backend FastAPI (Python + OpenCV)
│   ├── .venv/            # Entorno virtual (ignorado)
│   ├── blazeface/        # Librería TFLite BlazeFace (si la usas)
│   └── main.py           # Servidor y endpoint /analyze
├── .gitignore            # Ignorar dependencias y binarios
├── package.json          # Configuración Expo / React Native
└── app.json              # Configuración Expo

Contenido

1. Prequisitos
2. Instalación y puesta en marcha
   - Backend (FastAPI + OpenCV)
   - Frontend (Expo App)
3. Uso de la app
4. Configuración de la IP del backend
5. Historial de commits
6. Licencia

Prequisitos

- Node.js ≥ 16
- Yarn o npm
- Expo CLI (npm install -g expo-cli)
- Python 3.11
- Git

Instalación y puesta en marcha

Backend (FastAPI + OpenCV)

1. Abre terminal en monitor-backend:
   cd monitor-backend
2. Crea y activa virtualenv con Python 3.11:
   py -3.11 -m venv .venv
   .\.venv\Scripts\activate   # Windows
3. Actualiza pip e instala dependencias:
   pip install --upgrade pip
   pip install fastapi uvicorn pillow numpy opencv-python
4. Lanza el servidor:
   python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
5. Verifica en el navegador http://localhost:8000/docs

Frontend (Expo App)

1. Abre terminal en app:
   cd ../app
2. Instala dependencias:
   npm install
3. Inicia Expo:
   expo start

Uso de la app

1. Permite el acceso a la cámara.
2. En la pantalla de Login, omite para ir al monitor.
3. Presiona “Escanear” para tomar foto y enviarla al backend.
4. Alerta si estado es “crítico”.
5. “Ver datos” muestra RPM, caras y objetos detectados.

Configuración de la IP del backend

En app/monitor.jsx, ajusta:
const BACKEND_IP = '192.168.X.Y';
const ANALYZE_URL = `http://${BACKEND_IP}:8000/analyze`;
Ambos en la misma red Wi‑Fi.

Historial de commits

Usa mensajes tipo:
- feat: agrega detección de rostros con OpenCV
- fix: corrige CORS en backend
- docs: actualiza README
- chore: añade .gitignore

Licencia

MIT License
<<<<<<< HEAD
© 2025 Sebastian Reinoso
=======
© 2025 Sebastian Reinoso
>>>>>>> a87cc76973c7a49252d425960a9a900b83560517
