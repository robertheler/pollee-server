# start a bash inside of a container
# docker exec -it <docker-name> bash
# exit

#run this file with `bash docker.bash`

# delete containers
docker rm -f adidas_front_end_proxy_1
docker rm -f adidas_front_end_product_1
docker rm -f adidas_front_end_mongo_1
docker rm -f adidas_front_end_mysql_1
docker rm -f adidas_front_end_related_1
docker rm -f robertheler/adidas-solo
docker rm -f didas-product_web_1
docker rm -f proxy
docker rm -f product

#delete images
docker rmi adidas_front_end_product
docker rmi adidas_front_end_proxy
docker rmi adidas_front_end_related
docker rmi robertheler/adidas-solo

docker-compose up