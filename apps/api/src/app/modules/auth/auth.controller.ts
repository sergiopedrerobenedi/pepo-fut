import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Token } from './dto/interfaces/token.interface';
import { SignUpDto } from './dto/sign-up.dto';

@ApiTags('auth')
@Controller(`auth`)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Login API Pepo-FUT',
    description:
      'Generates a new JWT token for the username/password specified in the request body',
  })
  @ApiProduces('application/json')
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'The user/password credentials have been verified, and a JWT token has been generated',
    type: Token,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
    type: BadRequestException,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: UnauthorizedException,
  })
  async generateToken(@Body() authDto: AuthDto): Promise<Token> {
    const isAuthorized: boolean = await this.authService.authenticate(authDto);
    if (!isAuthorized) {
      throw new UnauthorizedException();
    }
    return this.authService.createToken(authDto.username);
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Signs up a new user into Pepo-FUT API',
    description:
      'Stores a new user with its data into Pepo-FUT database',
  })
  @ApiProduces('application/json')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description:
      'The user was created into Pepo-FUT database successfully',
    type: Token,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',

  })
  async signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    return this.authService.signUp(signUpDto);
  }
}
