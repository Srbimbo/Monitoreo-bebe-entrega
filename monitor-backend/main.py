# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import base64, io
import numpy as np
from PIL import Image
import cv2

app = FastAPI()

# 🛡️ CORS para tu Expo Go
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ImageData(BaseModel):
    image: str  # base64

# Cargamos cascades de OpenCV: rostros y “objetos grandes”
face_cascade   = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
object_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_fullbody.xml')

@app.post("/analyze")
def analyze(data: ImageData):
    try:
        # 1️⃣ decodifica la imagen base64
        img_bytes = base64.b64decode(data.image)
        img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
        frame = np.array(img)
        gray  = cv2.cvtColor(frame, cv2.COLOR_RGB2GRAY)

        # 2️⃣ Detecta rostros
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30,30))
        face_count = len(faces)

        # 3️⃣ Detecta objetos “grandes” cubriendo la cara
        objects = object_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(50,50))
        obj_count = len(objects)

        # 4️⃣ Lógica de alerta
        rpm = max(0, 60 - face_count*10 - obj_count*5)
        status = "estable"
        alerts = []

        if face_count == 0:
            status = "crítico"
            alerts.append("❌ No se detectó rostro → posible falta de respiración")
        if obj_count > 0:
            status = "crítico"
            alerts.append(f"⚠️ {obj_count} objeto(s) grandes cubriendo la cara")

        return {
            "rpm": rpm,
            "status": status,
            "faces_detected": face_count,
            "objects_detected": obj_count,
            "alerts": alerts
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analizando imagen: {e}")
