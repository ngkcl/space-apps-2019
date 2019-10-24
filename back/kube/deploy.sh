sed s/{tag}/$(git rev-parse --short=7 HEAD)/ deploy.yaml | kubectl apply -f -
