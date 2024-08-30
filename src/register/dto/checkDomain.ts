import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CheckDomainDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  domain: string;
}
