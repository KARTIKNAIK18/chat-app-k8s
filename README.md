---
# 🚀 Realtime-ChatApp Kubernetes Deployment  

A full-stack chat application deployed on Kubernetes, featuring:  

- 🎨 React frontend  
- ⚙️ Node.js backend  
- 🛢️ MongoDB database  
- 📡 Exposed via NGINX Ingress Controller 

---
 
## 🏗️ Tech Stack  

This project uses the following technologies:  

![React](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black)  ![Node.js](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)  ![MongoDB](https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white)  ![Kubernetes](https://img.shields.io/badge/kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)  ![Docker](https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)  

---

## 📁 Project Structure  

```plaintext
📁 Project Structure  
├── backend/  
│   ├── server.js  
│   ├── Dockerfile  
│   ├── config/  
│   └── controllers/  
├── frontend/  
│   ├── src/  
│   ├── public/  
│   ├── Dockerfile  
│   └── assets/  
├── manifests/  
│   ├── backend-deployment.yml  
│   ├── backend-service.yml  
│   ├── frontend-deployment.yml  
│   ├── frontend-service.yml  
│   ├── mongodb-deployment.yml  
│   ├── mongodb-service.yml  
│   ├── chatapp-ingress.yml  
│   └── namespace.yml  
└── docker-compose.yml  
```  

---

## 🚀 Prerequisites  

- ✅ Minikube (running and configured)  
- ✅ kubectl (installed and configured)  
- ✅ Docker  
- ✅ Basic Kubernetes knowledge  

---

## ⚙️ Deployment Instructions  

### 🔧 Start Minikube  

```bash
minikube start
```

### 🚀 Apply Kubernetes Manifests  

```bash
kubectl apply -f manifests/
```

### 🔗 Deploy Ingress Controller  

```bash
minikube addons enable ingress
kubectl apply -f chatapp-ingress.yml
```

---


Ensure ports and environment variables are correctly set inside `docker-compose.yml`.

---

## ❓ FAQ  

**Q1: Why is my frontend not connecting to the backend?**  
Ensure that the backend service is correctly exposed inside Kubernetes.  

**Q2: MongoDB authentication fails?**  
Double-check credentials inside the deployment and environment variables.  

---



## 📬 Contact  

For questions or feedback:  

📧 **Email:** [X45961020@gmail.com](mailto:X45961020@gmail.com)  
🐙 **GitHub:** [KARTIKNAIK18](https://github.com/KARTIKNAIK18)  

---

🔹 *Thank you for checking out this project! 🎉*  
```


