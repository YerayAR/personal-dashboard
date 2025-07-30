# FinDash Container Deployment Script (PowerShell)
# This script builds and deploys the FinDash application using Docker

$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting FinDash deployment..." -ForegroundColor Green

# Check if Docker is running
try {
    docker info | Out-Null
    Write-Host "✅ Docker is running" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker is not running. Please start Docker and try again." -ForegroundColor Red
    exit 1
}

# Check if docker-compose is available
try {
    docker-compose --version | Out-Null
    Write-Host "✅ docker-compose is available" -ForegroundColor Green
} catch {
    Write-Host "❌ docker-compose is not installed. Please install it and try again." -ForegroundColor Red
    exit 1
}

Write-Host "📦 Building application containers..." -ForegroundColor Yellow
docker-compose build --no-cache

Write-Host "🔧 Starting services..." -ForegroundColor Yellow
docker-compose up -d

Write-Host "⏳ Waiting for services to be healthy..." -ForegroundColor Yellow

$timeout = 120
$elapsed = 0

while ($elapsed -lt $timeout) {
    $status = docker-compose ps --format json | ConvertFrom-Json
    $healthy = $status | Where-Object { $_.Health -eq "healthy" }
    
    if ($healthy.Count -gt 0) {
        Write-Host "✅ Services are healthy!" -ForegroundColor Green
        break
    }
    
    Write-Host "⏳ Waiting for health checks... ($elapsed/$timeout seconds)" -ForegroundColor Yellow
    Start-Sleep -Seconds 5
    $elapsed += 5
}

if ($elapsed -ge $timeout) {
    Write-Host "⚠️  Services took longer than expected to become healthy" -ForegroundColor Yellow
    Write-Host "📋 Current status:" -ForegroundColor Cyan
    docker-compose ps
    Write-Host ""
    Write-Host "📄 Container logs:" -ForegroundColor Cyan
    docker-compose logs --tail=20
    exit 1
}

Write-Host ""
Write-Host "🎉 FinDash deployment completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Dashboard URL: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🗄️  MongoDB: localhost:27017" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Useful commands:" -ForegroundColor Yellow
Write-Host "  • View logs: docker-compose logs -f" -ForegroundColor White
Write-Host "  • Stop services: docker-compose down" -ForegroundColor White
Write-Host "  • Restart services: docker-compose restart" -ForegroundColor White
Write-Host "  • View status: docker-compose ps" -ForegroundColor White
Write-Host ""
