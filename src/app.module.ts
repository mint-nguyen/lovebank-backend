import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './utils/config.schema';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './utils/health.controller';
import { TodoItemModule } from './todo-item/todo-item.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          ssl: true,
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
        };
      },
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
      debug: true,
      context: ({ req }) => ({ req }),
    }),
    TerminusModule,
    TodoItemModule,
    UserModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
