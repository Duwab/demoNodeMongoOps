# Cheat Sheet

## Build image
```bash
docker login
docker build -t adubois360/<image-name> .
docker push
docker-compose up --build
```

## Kubernetes

Official cheat sheet [here](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

```bash
kubectl apply -f demo.yaml
minikube service <my-demo> --url
kubectl logs -f <pdo-name> <container-name>
kubectl exec -it <pdo-name> /bin/bash
kubectl get pods
kubectl delete service <hello-kubernetes>
kubectl delete deployment <hello-kubernetes>
kubectl get all
```
