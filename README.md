# Anchorstone Global LLP

This repository contains the frontend React application for Anchorstone Global LLP, as well as configuration and documentation for the Odoo ERP system hosted on AWS.

---

## 🌐 Frontend Website
The public-facing website is built using React and Vite, and is hosted on Firebase Hosting.

- **URL:** https://anchorstoneglobal.co.in
- **Build Command:** `npm run build`
- **Deploy Command:** `npx firebase-tools deploy --only hosting`

---

## 🏢 AWS ERP Server (Odoo)
The backend ERP system is hosted on an AWS EC2 instance. It runs using Docker containers to manage Odoo, PostgreSQL, Redis, and the WhatsApp Evolution API.

- **URL:** https://erp.anchorstoneglobal.co.in
- **OS:** Ubuntu
- **Web Server:** Nginx (Reverse Proxy)

### Installed Services
The following services are installed and running as Docker containers on the AWS EC2 instance:
1. **Odoo 17 (`ubuntu-web-1`)**: The main ERP application.
2. **PostgreSQL 15 (`ubuntu-db-1`)**: The database storing all Odoo data.
3. **Redis (`ubuntu-redis-1`)**: In-memory caching for faster performance and WhatsApp API management.
4. **Evolution API (`ubuntu-evolution-api-1`)**: The WhatsApp integration API for Odoo.

### How to Connect to the Server
To run commands on the server, you must SSH into it from the root of this project folder using the `odoo-key.pem` file:

```bash
# Set secure permissions for the key (only needed once)
chmod 400 odoo-key.pem

# Connect to the server
ssh -i odoo-key.pem -o StrictHostKeyChecking=no ubuntu@erp.anchorstoneglobal.co.in
```

### 🔄 How to Restart the Server manually
If you ever restart the AWS EC2 instance from the AWS Console, the Docker containers might not automatically boot back up. If you see a **502 Bad Gateway** error, follow these steps to turn the ERP back on:

1. Open your Mac Terminal in this project folder.
2. Run the SSH command to connect to the server:
   ```bash
   ssh -i odoo-key.pem -o StrictHostKeyChecking=no ubuntu@erp.anchorstoneglobal.co.in
   ```
3. Once logged in, run the following command to start all the stopped containers:
   ```bash
   sudo docker start ubuntu-db-1 ubuntu-web-1 ubuntu-evolution-api-1
   ```
4. Verify they are running by checking their status:
   ```bash
   sudo docker ps
   ```
   *(All 4 containers, including Redis, should say "Up")*
5. Refresh the website `erp.anchorstoneglobal.co.in` and Odoo will be back online!

### Useful Docker Commands
If you need to manually restart a specific service to apply changes, use these commands on the server:

- **Restart Odoo only:** `sudo docker restart ubuntu-web-1`
- **Restart WhatsApp API:** `sudo docker restart ubuntu-evolution-api-1`
- **View Odoo Logs:** `sudo docker logs -f ubuntu-web-1`
