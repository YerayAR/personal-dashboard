#!/bin/bash

# FinDash Container Deployment Script
# This script builds and deploys the FinDash application using Docker

set -e

echo "🚀 Starting FinDash deployment..."

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose >/dev/null 2>&1; then
    echo "❌ docker-compose is not installed. Please install it and try again."
    exit 1
fi

echo "📦 Building application containers..."
docker-compose build --no-cache

echo "🔧 Starting services..."
docker-compose up -d

echo "⏳ Waiting for services to be healthy..."
timeout=120
elapsed=0

while [ $elapsed -lt $timeout ]; do
    if docker-compose ps | grep -q "healthy"; then
        echo "✅ Services are healthy!"
        break
    fi
    
    echo "⏳ Waiting for health checks... ($elapsed/$timeout seconds)"
    sleep 5
    elapsed=$((elapsed + 5))
done

if [ $elapsed -ge $timeout ]; then
    echo "⚠️  Services took longer than expected to become healthy"
    echo "📋 Current status:"
    docker-compose ps
    echo ""
    echo "📄 Container logs:"
    docker-compose logs --tail=20
    exit 1
fi

echo ""
echo "🎉 FinDash deployment completed successfully!"
echo ""
echo "📊 Dashboard URL: http://localhost:3000"
echo "🗄️  MongoDB: localhost:27017"
echo ""
echo "📋 Useful commands:"
echo "  • View logs: docker-compose logs -f"
echo "  • Stop services: docker-compose down"
echo "  • Restart services: docker-compose restart"
echo "  • View status: docker-compose ps"
echo ""
