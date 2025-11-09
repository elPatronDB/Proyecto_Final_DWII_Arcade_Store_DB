# 🎮 Instrucciones para Correr Arcade Store

## 📋 Requisitos Previos

1. **Node.js** instalado (versión 16 o superior)
2. **MongoDB** instalado y corriendo (local o Atlas)
3. **npm** o **yarn** instalado

---

## 🚀 Pasos para Correr el Proyecto

### 1️⃣ Configurar el Backend

1. **Navega a la carpeta del backend:**
   ```bash
   cd arcadeStoreDB/backend
   ```

2. **Instala las dependencias** (si no lo has hecho):
   ```bash
   npm install
   ```

3. **Crea el archivo `.env`** en la carpeta `backend`:
   ```bash
   # En Windows PowerShell
   copy .env.example .env
   
   # O en Git Bash / Linux / Mac
   cp .env.example .env
   ```

4. **Edita el archivo `.env`** y configura:
   ```env
   MONGODB_URI=mongodb://localhost:27017/arcadestore
   JWT_SECRET=tu_secret_key_super_segura_aqui_cambiala
   PORT=3000
   ```
   
   **Nota:** 
   - Si usas MongoDB Atlas, reemplaza `MONGODB_URI` con tu cadena de conexión
   - Cambia `JWT_SECRET` por una cadena aleatoria segura

5. **Asegúrate de que MongoDB esté corriendo:**
   - Si usas MongoDB local, inicia el servicio
   - Si usas MongoDB Atlas, verifica tu conexión

6. **Inicia el servidor backend:**
   ```bash
   npm run dev
   ```
   
   O para producción:
   ```bash
   npm start
   ```

   **Deberías ver:**
   ```
   MongoDB conectado: localhost
   Base de datos: arcadestore
   Usuario administrador creado exitosamente
   Servidor corriendo en http://localhost:3000
   ```

---

### 2️⃣ Configurar el Frontend

1. **Abre una NUEVA terminal** y navega a la carpeta del frontend:
   ```bash
   cd arcadeStoreDB/frontend/arcade-store-frontend
   ```

2. **Instala las dependencias** (si no lo has hecho):
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

   **Deberías ver algo como:**
   ```
   VITE v7.x.x  ready in xxx ms
   
   ➜  Local:   http://localhost:5173/
   ➜  Network: use --host to expose
   ```

---

### 3️⃣ Acceder a la Aplicación

1. **Abre tu navegador** y ve a:
   ```
   http://localhost:5173
   ```

2. **Credenciales de prueba:**
   - **Admin:** 
     - Email: `admin@arcadestore.com`
     - Password: `admin123`

---

## 🔧 Solución de Problemas

### Backend no se conecta a MongoDB
- Verifica que MongoDB esté corriendo
- Revisa que `MONGODB_URI` en `.env` sea correcta
- Si usas MongoDB Atlas, verifica tu IP en la whitelist

### Frontend no se conecta al Backend
- Verifica que el backend esté corriendo en el puerto 3000
- Si el backend usa otro puerto, crea un archivo `.env` en el frontend:
  ```env
  VITE_API_URL=http://localhost:3000/api
  ```

### Error de CORS
- El backend ya tiene CORS habilitado, pero si tienes problemas, verifica que el frontend esté en el puerto correcto

### Puerto ya en uso
- Si el puerto 3000 está ocupado, cambia `PORT` en el `.env` del backend
- Actualiza `VITE_API_URL` en el frontend si cambias el puerto

---

## 📝 Comandos Útiles

### Backend
```bash
npm run dev      # Desarrollo con nodemon (auto-reload)
npm start        # Producción
```

### Frontend
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Preview del build
```

---

## ✅ Verificación

1. **Backend funcionando:**
   - Visita: `http://localhost:3000/api/test`
   - Deberías ver un JSON con el estado de la API

2. **Frontend funcionando:**
   - Visita: `http://localhost:5173`
   - Deberías ver la página de inicio con juegos

3. **Login funcionando:**
   - Ve a `/login`
   - Usa las credenciales de admin
   - Deberías poder iniciar sesión

---

¡Listo! Tu aplicación debería estar corriendo correctamente. 🎉

