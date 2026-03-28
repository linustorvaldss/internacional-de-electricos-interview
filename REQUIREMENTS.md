# PRUEBA TECNICA

## Objetivo
Desarrollar una aplicación fullstack que permita gestionar información geográfica de Colombia (departamentos y ciudades), incluyendo autenticación de usuarios.

## Requerimientos

### Backend
- Framework: NestJS
- Lenguaje: TypeScript
- ORM: A elección
- Debe incluir:
  - CRUD de:
  - Departamentos (o estados)
  - Ciudades (relacionadas a departamentos)
  - Sistema de autenticación (login)
  - Documentación de API con Swagger
  - Diseño de entidades libre (evaluaremos decisiones de modelado)

### Frontend
- Framework: NextJS
  - Debe incluir:
  - Pantalla de login
  - Vista para CRUD de departamentos y ciudades
  - Diseño libre (no evaluamos UI, sino funcionalidad y estructura)

## DevOps / Infraestructura
- Contenerización con Docker
- Debe incluir un docker-compose que permita levantar:
  - Base de datos
  - Backend
  - Frontend

Comando esperado: `docker-compose up -d --build`

Importante: Si el proyecto no levanta correctamente, será considerado en la evaluación.

## Documentación
El repositorio debe incluir un README con:
- Instrucciones claras para ejecutar el proyecto
- Variables de entorno necesarias
- Comandos para migraciones (si aplica)
- Decisiones técnicas relevantes (opcional pero valorado)

## Entrega
- Sube el código a un repositorio público (GitHub, GitLab, etc.)
- Asegúrate de hacer commits progresivos (no un solo commit final)
- Envíanos un correo con:
  - Link al repositorio
  - Tiempo que tomo realizar la prueba
  - Comentarios adicionales (opcional)

## Criterios de evaluación
Evaluaremos principalmente:
- Estructura del proyecto
- Calidad del código
- Modelado de datos
- Manejo de Git (commits, ramas si aplica)
- Funcionamiento del docker-compose
- Claridad de documentación
- Capacidad de estimación
- Decisiones técnicas

## Reglas
- Puedes usar librerías externas
- Puedes apoyarte en documentación y recursos
- No necesitas hacer algo perfecto, pero sí funcional y bien pensado

## Notas
No buscamos una solución perfecta ni completa al 100%. Priorizamos cómo tomas decisiones, estructuras el proyecto y resuelves problemas