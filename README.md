probando las reglas y el .yml

# 🚀 Frontend Repository

Bienvenido al repositorio del frontend del proyecto. Este proyecto está construido con herramientas modernas enfocadas en rendimiento, escalabilidad y buenas prácticas de desarrollo.

---

## 🧩 Requisitos


Antes de comenzar, asegúrate de tener instalado:

* **Node.js** → `v24.13.0`

Puedes verificar tu versión con:

```bash
node -v
```

---

## ⚙️ Instalación y ejecución

Sigue estos pasos para correr el proyecto en entorno local:

```bash
# 1. Clonar el repositorio
git clone <repo-url >


# 2. Entrar a la carpeta del proyecto
cd <nombre-del-proyecto>


# 3. Instalar dependencias
npm install


# 4. Ejecutar en modo desarrollo
npm run dev
```

---

## 🌐 Acceso local

Una vez levantado el proyecto, estará disponible en:

```bash
http://localhost:5173
```

---

## 🏗️ Estructura del proyecto

El proyecto sigue una estructura modular pensada para escalabilidad y mantenimiento:

```
src/
│
├── assets/        # Imágenes, fuentes y recursos estáticos
├── components/    # Componentes reutilizables (Button, Card, etc.)
├── pages/         # Vistas principales (Home, Login, Dashboard)
├── layouts/       # Layouts globales (MainLayout, AuthLayout)
├── hooks/         # Custom hooks
├── services/      # Consumo de APIs y lógica externa
├── store/         # Estado global (Redux, Zustand, etc.)
├── utils/         # Funciones auxiliares (helpers)
├── routes/        # Configuración de rutas
│
├── App.tsx        # Componente raíz
└── main.tsx       # Punto de entrada de la app
```

---

## 🛠️ Tecnologías utilizadas

* ⚡ **Vite** — Bundler rápido para desarrollo moderno
* ⚛️ **React** — Librería para construcción de interfaces
* 🟦 **TypeScript**  — Tipado estático para mayor robustez

---

## 📌 Notas

* Este proyecto está diseñado para seguir buenas prácticas de desarrollo frontend.
* Se recomienda mantener la estructura propuesta para facilitar escalabilidad y trabajo en equipo.

---

## 🚧 Próximas mejoras (opcional)

* Configuración de linting (ESLint + Prettier)
* Manejo de variables de entorno
* Implementación de autenticación
* Rutas protegidas

---

> Proyecto en desarrollo 🚀
