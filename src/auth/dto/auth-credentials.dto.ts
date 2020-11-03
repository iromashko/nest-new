import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({ description: 'Username', type: String })
  username: string;
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  @ApiProperty({ description: 'Password', type: String })
  password: string;
}
