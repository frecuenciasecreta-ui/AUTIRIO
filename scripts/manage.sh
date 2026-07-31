#!/usr/bin/env bg
# AutoMaestro Production Management & Healthcheck Script

command=$1

case "$command" in
  backup)
    echo "📦 Creating timestamped PostgreSQL backup..."
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    mkdir -p backups
    docker exec auto_maestro_db pg_dump -U automaestro automaestro_db | gzip > "backups/backup_${TIMESTAMP}.sql.gz"
    echo "✅ Backup saved to backups/backup_${TIMESTAMP}.sql.gz"
    ;;

  seed)
    echo "🌱 Seeding database..."
    docker exec -it auto_maestro_backend npm run prisma:seed
    echo "✅ Seeding completed."
    ;;

  healthcheck)
    echo "🔍 Checking AutoMaestro stack health..."
    curl -s -f http://localhost:4000/api/taxonomies/brands > /dev/null && echo "✅ Backend API: ONLINE" || echo "❌ Backend API: OFFLINE"
    curl -s -f http://localhost:3000 > /dev/null && echo "✅ Frontend Next.js: ONLINE" || echo "❌ Frontend Next.js: OFFLINE"
    docker exec auto_maestro_redis redis-cli ping > /dev/null && echo "✅ Redis Cache: ONLINE" || echo "❌ Redis Cache: OFFLINE"
    ;;

  *)
    echo "Uso: ./scripts/manage.sh {backup|seed|healthcheck}"
    ;;
esac
