@echo off
REM 1. Levantar los contenedores de MongoDB
echo Iniciando contenedores de MongoDB...
docker-compose -f docker-compose-cluster.yml up -d

REM 2. Espera a que MongoDB esté listo
echo Esperando a que MongoDB se inicie...
timeout /t 30

REM 3. Ejecutar el comando de replicación en mongo1
echo Configurando la replicación de MongoDB...

docker exec -it mongo1 mongo --eval "rs.initiate({
  _id: 'myReplicaSet',
  members: [
    { _id: 0, host: 'mongo1:27017' },
    { _id: 1, host: 'mongo2:27017' },
    { _id: 2, host: 'mongo3:27017' }
  ]
})"



REM 4. Verificar el estado de la replicación
echo Verificando el estado de la replicación...
docker exec -it mongo1 mongo --eval "rs.status()"

REM 5. Levantar la aplicación
echo Iniciando la aplicación...
docker-compose -f docker-compose.yml up -d

REM 6. Finalizar el script
echo Proceso completado. Clúster de MongoDB y la aplicación están corriendo.
pause
