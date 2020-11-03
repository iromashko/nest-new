import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiCreatedResponse({
    description: 'User registration',
  })
  @ApiBody({ type: AuthCredentialsDto })
  signUpUser(
    @Body(ValidationPipe)
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUpUser(authCredentialsDto);
  }

  @Post('signin')
  @ApiOkResponse({
    description: 'User login',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBody({ type: AuthCredentialsDto })
  signInUser(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signInUser(authCredentialsDto);
  }
}
