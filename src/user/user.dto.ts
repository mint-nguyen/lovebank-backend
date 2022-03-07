import { ObjectType, ID } from '@nestjs/graphql';
import { FilterableField, IDField } from '@nestjs-query/query-graphql';
import { IsNotEmpty, IsEmail } from 'class-validator';

@ObjectType('User')
export class UserDto {
  @FilterableField()
  @IsNotEmpty()
  firstName!: string;

  @FilterableField()
  @IsNotEmpty()
  lastName!: string;

  @IDField(() => ID)
  id!: string;

  @FilterableField()
  @IsNotEmpty()
  username!: string;

  @FilterableField()
  @IsNotEmpty()
  @IsEmail()
  email!: string;
}
