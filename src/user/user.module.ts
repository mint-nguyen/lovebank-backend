import { CreateUserDto } from './create-user.dto';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { Module } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([UserEntity])],
      resolvers: [{ DTOClass: CreateUserDto, EntityClass: UserEntity }],
    }),
  ],
})
export class UserModule {}
