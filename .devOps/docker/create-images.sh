#docker run --env-file=../apps/log-handler/.env -dp 3001:3001  helloquid/store-apis/log-handler

cd ..
echo "############## Buiding LOG-HANDLER IMAGE ##############"
docker build -f ./apps/log-handler/Dockerfile -t helloquid/store-apis/log-handler .