#!/bin/bash
# LYS Platform - Automated EC2 Deployment Script
# Optimized for Amazon Linux 2 / Ubuntu

echo "🚀 Starting LYS Deployment on EC2..."

# 1. Update & Install Dependencies
sudo yum update -y || sudo apt update -y
sudo yum install -y git || sudo apt install -y git
curl -sL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs || sudo apt install -y nodejs
sudo npm install -g pm2

# 2. Clone Repository
cd /home/ec2-user
if [ -d "LYS" ]; then
    echo "♻️ Repository already exists, pulling updates..."
    cd LYS && git pull
else
    echo "📥 Cloning project from GitHub..."
    git clone https://github.com/abhinandnm/LYS.git
    cd LYS
fi

# 3. Setup Backend
echo "📦 Installing backend dependencies..."
cd server
npm install
# Create local .env if it doesn't exist (User must edit this)
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "⚠️ .env created from example. Please edit it with your RDS/S3 keys!"
fi

# 4. Start Backend with PM2
pm2 stop lys-server || true
pm2 start server.js --name "lys-server"
pm2 save
pm2 startup

# 5. Setup Frontend
echo "🏗️ Building React frontend..."
cd ../
npm install
npm run build

# 6. Install & Start Nginx
sudo amazon-linux-extras install nginx1 -y || sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx

echo "✅ Deployment complete! Check your public IP."
