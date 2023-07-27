#docker run --env-file=../apps/log-handler/.env -dp 3001:3001  helloquid/store-apis/log-handler

cd ..
echo "############## Buiding STORE-GATEWAY Image ##############"
docker build -f ../apps/store-gateway/Dockerfile -t helloquid/store-apis/store-gateway .