# Anchorstone Global LLP

This repository contains the frontend React application for Anchorstone Global LLP, as well as configuration and documentation for the Odoo ERP system hosted on AWS.

---

## 🌐 Frontend Website
The public-facing website is built using React and Vite, and is hosted on Firebase Hosting.

- **URL:** https://anchorstoneglobal.co.in
- **Build Command:** `npm run build`
- **Deploy Command:** `npx firebase-tools deploy --only hosting`

- **Deploy Command:** `npx firebase-tools deploy --only hosting`

### 🚀 SEO Architecture & Upgrades
The site employs a massive programmatic SEO engine (66,000+ localized pages). The following advanced SEO tactics have been implemented in `ProductDetail.jsx` and the build scripts:
1. **Dynamic OpenGraph Injection**: Social media cards are dynamically injected per-location via `scratch/inject_og_tags.js` during the build process.
2. **"Golden Stars" JSON-LD**: `AggregateRating` and `Offer` schemas are dynamically rendered on all product pages to achieve Rich Snippets (gold stars) in Google Search.
3. **Dynamic Content Injection**: Localized descriptions are conditionally injected into the body text to ensure Google does not flag the pages as duplicate content.
4. **Visual Breadcrumbs**: UI breadcrumb trails dynamically reflect the specific export/import route for improved crawlability.
5. **Internal Spider Web**: An algorithmic "Related Locations" widget links out to 12 random sibling ports/cities to eliminate orphan pages.

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

---

## 📧 Marketing Automation Server (Notifuse)

Notifuse is installed on the same AWS EC2 instance as Odoo, running on a separate Docker stack.

- **URL:** https://marketing.anchorstoneglobal.co.in
- **Internal Port:** `8081`
- **Docker Compose Location:** `/opt/notifuse/`

### 🔄 How to Restart Notifuse
If Notifuse goes down (e.g. after an EC2 reboot):
```bash
ssh -i odoo-key.pem -o StrictHostKeyChecking=no ubuntu@erp.anchorstoneglobal.co.in
cd /opt/notifuse
sudo docker compose up -d
```

### Useful Notifuse Docker Commands
```bash
# View all Notifuse containers
sudo docker compose -f /opt/notifuse/compose.yaml ps

# Restart Notifuse API only
sudo docker restart notifuse-api-1

# View Notifuse logs
sudo docker logs -f notifuse-api-1

# Stop all Notifuse containers
cd /opt/notifuse && sudo docker compose down

# Start all Notifuse containers
cd /opt/notifuse && sudo docker compose up -d
```

### Installed Notifuse Services
1. **`notifuse-api-1`** — Notifuse web interface and API (port 8081)
2. **`notifuse-postgres-1`** — PostgreSQL database for Notifuse

---

## 🏗️ Easy Email (Email Builder)

Easy Email is a modern, React-based open-source drag-and-drop email builder that has replaced the legacy Mosaico interface. It is hosted as a static site on the AWS EC2 instance.

- **URL:** https://mosaico.anchorstoneglobal.co.in (kept the old subdomain for continuity)
- **Deployment Location:** `/opt/easy-email/demo/dist` (served directly by Nginx)
- **S3 Bucket:** Uses the `anchorstone-media` S3 Bucket for image uploads (configured with CORS allowing `https://mosaico.anchorstoneglobal.co.in`).

### 🔄 How to Restart Easy Email
Because Easy Email is a **static site** served directly by Nginx, it does not use Docker or PM2, and it cannot "crash." However, if the site becomes unreachable, you simply need to restart Nginx:

```bash
ssh -i odoo-key.pem -o StrictHostKeyChecking=no ubuntu@erp.anchorstoneglobal.co.in
sudo systemctl restart nginx
```

