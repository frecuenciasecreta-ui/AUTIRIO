import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { MailerModule } from '@nestjs-modules/mailer';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { TaxonomiesModule } from './modules/taxonomies/taxonomies.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { LeadsModule } from './modules/leads/leads.module';
import { AdsModule } from './modules/ads/ads.module';
import { TrackingModule } from './modules/tracking/tracking.module';
import { DealershipsModule } from './modules/dealerships/dealerships.module';
import { BlogModule } from './modules/blog/blog.module';
import { AuditModule } from './modules/audit/audit.module';
import { UploadModule } from './modules/upload/upload.module';
import { CacheModule } from './modules/cache/cache.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('SMTP_HOST') || 'smtp.resend.com',
          port: config.get('SMTP_PORT') || 465,
          secure: true,
          auth: {
            user: config.get('SMTP_USER') || 'resend',
            pass: config.get('SMTP_PASS'),
          },
        },
        defaults: {
          from: '"AutoMaestro Leads" <no-reply@automaestro.es>',
        },
      }),
      inject: [ConfigService],
    }),
    PrismaModule,
    AuthModule,
    TaxonomiesModule,
    VehiclesModule,
    LeadsModule,
    AdsModule,
    TrackingModule,
    DealershipsModule,
    BlogModule,
    AuditModule,
    UploadModule,
    CacheModule,
    HealthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
