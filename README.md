# Internacional de Electricos Practical Technical Interview

# Detalles del proyecto

Los requerimientos estan detallados aqui. [Click aqui para acceder al archivo de los requerimientos](REQUIREMENTS.md)

Monorepo con dos aplicaciones para la :

- /app -> Server/Backend/API REST -> (NestJs + Express + Prisma) -> [http://localhost:4000](http://localhost:4000)
- /client -> Client/UI/Frontend -> (Next.js + React + Tailwind + NextAuth) -> [http://localhost:3000](http://localhost:3000)
- /infra -> Deployment -> (Docker Compose)
  - [server + docker -> http://localhost:2538 -> http://localhost:4000](http://localhost:2538)
  - [client + docker -> http://localhost:2539 -> http://localhost:3000](http://localhost:2539)
- Docs -> (Swagger) -> [http://localhost:8000](http://localhost:8000)

# Requirements

Tenemos dos maneras de levantar los servicios:
1. Con las tecnologias individuales.
2. Usando docker para evitar instalar las tecnologias individualmente.

# Project configuration

# Launch and discover

# Ejecutar con Docker Compose

Se usa compose cuando se trabajan mas de un servicio para mejor escalabilidad y control sobre los diferentes servicios (Server o Client).


```bash

docker compose up --build -d

```

Verificar el estado de los contenedores y su correcto funcionamiento:

```bash
docker ps
docker logs api     # para verificar el log del servidor
docker logs client  # para verificar el log del cliente
```

# Arquitectura
# APIs