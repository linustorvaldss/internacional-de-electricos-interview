# Internacional de Electricos Practical Technical Interview

## Detalles del proyecto

Los requerimientos estan detallados aqui. [Click aqui para acceder al archivo de los requerimientos](REQUIREMENTS.md)

Monorepo con tres partes:

![image](./docs/architecture-diagram.png)

- /app -> Server/Backend/API REST -> (NestJs + Express + Prisma) -> [http://localhost:4000](http://localhost:4000)
- /client -> Client/UI/Frontend -> (Next.js + React + Tailwind + NextAuth) -> [http://localhost:3000](http://localhost:3000)
- Docs -> (Swagger) -> [http://localhost:8000](http://localhost:8000/api)
- /infra -> Deployment -> (Docker Compose)
  - [server + docker -&gt; http://localhost:2538 -&gt; http://localhost:4000](http://localhost:2538)
  - [client + docker -&gt; http://localhost:2539 -&gt; http://localhost:3000](http://localhost:2539)
  - [server + swagger + docker -&gt; http://localhost:2538/api -&gt; http://localhost:8000/api](http://localhost:2538/api)


## Requerimientos

Tenemos dos maneras de levantar los servicios:

1. Con las tecnologias individuales. necesitas descargar node con nvm/executable y postgres 
2. Usando docker para evitar instalar las tecnologias individualmente.

## Modelo de datos (Modelo Entidad Relacion - MER): 

![image](./docs/erd.jpeg)

## Endpoints y URLs

### Ejecucion con local

- Backend: http://localhost:4000
- Swagger: http://localhost:4000/api
- Frontend: http://localhost:3000

### Ejecucion con Docker

- Backend: http://localhost:2538
- Swagger: http://localhost:2538/api
- Frontend: http://localhost:2539

## Variables de entorno

Como se levanta con docker, el archivo [.env.template](/infra/.env.template) contiene las variables de entorno necesarias para levantar los servicios, se puede duplicar y pasarlo al `.env`

Variables requeridas:

- `PORT`: puerto interno del backend (default recomendado: `4000`)
- `DATABASE_URL`: conexion PostgreSQL usada por Prisma
- `JWT_SEED`: secreto para firma/validacion de JWT
- `NEST_API_URL`: URL interna del backend para el frontend


# Como ejecutar el proyecto

Se usa compose cuando se trabajan mas de un servicio para mejor escalabilidad y control sobre los diferentes servicios (Server o Client).

```bash
docker compose -f infra/docker-compose.yml up -d --build

```

Verificar el estado de los contenedores y su correcto funcionamiento:

```bash
docker ps
docker logs ie-api     # para verificar el log del servidor
docker logs ie-client  # para verificar el log del cliente
```

Nota: el contenedor `ie-api` ejecuta migraciones automaticamente al iniciar.

## Migraciones

Aplicar migraciones manualmente en el contenedor API:

```bash
docker compose -f infra/docker-compose.yml exec api npx prisma migrate deploy --config=prisma.config.ts --schema=prisma/schema.prisma
```

# Como usar?

1. Crea un usuario en  `http://localhost:2538/auth/register`. No se le coloco middleware para evitar dejar un seed de un usuario. Usa swagger para crear el usuario accediendo al URI `http://localhost:2538/api`. alli vas a colocar en el body los datos de name, email y password. Ejemplo: 
```json
{
  "name": "Deissy Cortez",
  "email": "deissy@deissy.com",
  "password": "123456"
}
```
1. Logearse en el cliente en `http://localhost:2539`
2. Hacer uso del CRUD de departamentos y ciudades
