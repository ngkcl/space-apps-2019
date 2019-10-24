export POSTGRES_PASSWORD=$(kubectl get secret --namespace footprints psql-postgresql -o jsonpath="{.data.postgresql-password}" | base64 --decode)
kubectl port-forward --namespace footprints svc/psql-postgresql 5432:5432 &

read -p "Press enter to continue"

PGPASSWORD="$POSTGRES_PASSWORD" psql --host 127.0.0.1 -U admin -d default -p 5432
pkill kubectl
