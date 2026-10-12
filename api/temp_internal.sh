#!/bin/bash
echo "Press [CTRL+C] to stop.."

MAC="$(cat /sys/class/net/wlp1s0/address)"

echo "HTTP POST TO http://localhost:8080/device"
wget -q -O - --method=POST http://localhost:8080/device \
       --body-data="id=${MAC}&n=Temperatura%20Core%201&k=core%201%20temperatura%20key"
while :
do

    temp_aux="$(cat /sys/class/thermal/thermal_zone1/temp)" 
    temp=$(($temp_aux/1000))
    echo "Temperature: $temp °C"

    echo "HTTP POST TO http://localhost:8080/measurement"
    wget -q -O - --method=POST http://localhost:8080/measurement \
           --header="Content-Type: application/json" \
           --body-data="{\"id\":\"${MAC}\",\"t\":${temp},\"p\":0}"
	sleep 10
done