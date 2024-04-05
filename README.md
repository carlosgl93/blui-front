# Blui MVP

## Descripción

Aplicación para solicitar y prestar servicios de cuidado en el hogar. Este proyecto utiliza Vite, React, TypeScript, Firebase, Recoil para el manejo de estado local y React-Query para las interacciones con sistemas externos.

## Empezando

Para comenzar a trabajar localmente en este proyecto, sigue estos pasos:

1. Clona el repositorio en tu máquina local usando `git clone`.

2. Navega al directorio del proyecto con `cd blui-front`.

3. Instala las dependencias del proyecto con `npm install`.

4. Para iniciar el proyecto en modo de desarrollo, puedes usar `npm run dev`. Esto iniciará el servidor de desarrollo de Vite.

5. Si deseas utilizar los emuladores de Firebase, asegúrate de tenerlos instalados ejecutando `firebase emulators:init`. Luego, puedes iniciar los emuladores con `firebase emulators:start`.

6. Para trabajar con los emuladores de Firebase, debes establecer la variable de entorno `VITE_ENV=dev` antes de iniciar el proyecto. Copia y pega env.template y cambiale el nombre a .env ahora al variable `VITE_ENV=dev`.

## Contribuyendo

Para contribuir debes crear una rama con la convencion `<type>/<description>`, por ejemplo: feat/prestador-experiencia.
