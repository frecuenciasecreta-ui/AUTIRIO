# AutoMaestro Production Management & Healthcheck PowerShell Script for Windows

param (
    [string]$Action = "healthcheck"
)

switch ($Action) {
    "backup" {
        Write-Host "📦 Creating timestamped PostgreSQL backup..." -ForegroundColor Cyan
        $Timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
        if (!(Test-Path "backups")) { New-Item -ItemType Directory -Path "backups" }
        docker exec auto_maestro_db pg_dump -U automaestro automaestro_db | Out-File -Encoding utf8 "backups/backup_$Timestamp.sql"
        Write-Host "✅ Backup saved to backups/backup_$Timestamp.sql" -ForegroundColor Green
    }
    "seed" {
        Write-Host "🌱 Seeding database..." -ForegroundColor Cyan
        docker exec auto_maestro_backend npm run prisma:seed
        Write-Host "✅ Database seeded successfully." -ForegroundColor Green
    }
    "healthcheck" {
        Write-Host "🔍 Checking AutoMaestro stack health..." -ForegroundColor Cyan
        try {
            $api = Invoke-RestMethod -Uri "http://localhost:4000/api/taxonomies/brands" -ErrorAction Stop
            Write-Host "✅ Backend API: ONLINE" -ForegroundColor Green
        } catch {
            Write-Host "❌ Backend API: OFFLINE (Check if containers are running with 'docker-compose up -d')" -ForegroundColor Red
        }
        try {
            $web = Invoke-WebRequest -Uri "http://localhost:3000" -ErrorAction Stop
            Write-Host "✅ Frontend Next.js: ONLINE" -ForegroundColor Green
        } catch {
            Write-Host "❌ Frontend Next.js: OFFLINE" -ForegroundColor Red
        }
    }
    Default {
        Write-Host "Uso: .\scripts\manage.ps1 -Action {backup|seed|healthcheck}" -ForegroundColor Yellow
    }
}
