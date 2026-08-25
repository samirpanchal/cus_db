#!/bin/bash
set -e

echo "Updating system..."
sudo apt-get update
sudo apt-get install -y curl git imagemagick nginx certbot python3-certbot-nginx

echo "Installing Node.js 18..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

echo "Installing PM2 and Grunt-CLI..."
sudo npm install -g pm2 grunt-cli

echo "Cloning Mosaico..."
if [ ! -d "/opt/mosaico" ]; then
    sudo git clone https://github.com/voidlabs/mosaico.git /opt/mosaico
fi
sudo chown -R ubuntu:ubuntu /opt/mosaico
cd /opt/mosaico

echo "Installing Mosaico dependencies..."
npm install

echo "Building Mosaico..."
# Some older repos fail on npm run build, mosaico uses grunt
grunt

echo "Starting Mosaico Backend with PM2..."
pm2 start server.js --name mosaico
pm2 save
sudo pm2 startup systemd -u ubuntu --hp /home/ubuntu | tail -n 1 > pm2_startup.sh
chmod +x pm2_startup.sh
./pm2_startup.sh

echo "Done!"
