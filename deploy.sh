#!/bin/bash
# LYS Platform - One-click Update & Deployment Script

echo "📂 Navigating to project root..."
cd /home/ubuntu/LYS || cd /home/ec2-user/LYS

echo "📥 Pulling latest changes from GitHub..."
git pull origin master

echo "📦 Updating frontend dependencies..."
npm install

echo "🏗️ Rebuilding the React frontend..."
npm run build

echo "📦 Updating backend dependencies..."
cd server
npm install

echo "♻️ Restarting the LYS backend server..."
pm2 restart lys-server || pm2 start server.js --name "lys-server"

echo "✅ Update Complete! Your live site is now synced with GitHub."
