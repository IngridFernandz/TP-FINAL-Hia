#!/bin/bash

# 1. Levanta los contenedores de MongoDB
echo "Iniciando contenedores de MongoDB..."
docker-compose -f docker-compose-cluster.yml up -d

# 2. Espera a que MongoDB esté listo
echo "Esperando a que MongoDB se inicie..."
sleep 30  # Ajusta el tiempo si es necesario para asegurarte de que MongoDB está completamente en marcha

# 3. Ejecuta el comando de replicación en mongo1
echo "Configurando la replicación de MongoDB..."
docker exec -it mongo1 mongo <<EOF
rs.initiate({
  _id: "myReplicaSet",  # Nombre del conjunto de réplicas
  members: [
    { _id: 0, host: "mongo1:27017" },
    { _id: 1, host: "mongo2:27017" },
    { _id: 2, host: "mongo3:27017" }
  ]
});
EOF

# 4. Verificar el estado de la replicación (opcional)
echo "Verificando el estado de la replicación..."
docker exec -it mongo1 mongo --eval "rs.status()"

# 5. Levanta la aplicación
echo "Iniciando la aplicación..."
docker-compose -f docker-compose.yml up -d

# 6. Finaliza el script
echo "Proceso completado. Clúster de MongoDB y la aplicación están corriendo."
