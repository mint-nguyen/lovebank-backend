import { FilterableField } from '@nestjs-query/query-graphql';
import { ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail } from 'class-validator';

@ObjectType('CreateUser')
export class CreateUserDto {
  @FilterableField()
  @IsNotEmpty()
  firstName: string;

  @FilterableField()
  @IsNotEmpty()
  lastName: string;

  @FilterableField()
  @IsNotEmpty()
  username: string;

  @FilterableField()
  @IsNotEmpty()
  password: string;

  @FilterableField()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
