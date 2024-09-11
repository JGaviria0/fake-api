import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) {
      throw new HttpException('Token not found', 401);
    }

    try {
      const token = request.headers.authorization.split(' ')[1];
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      request['user'] = payload;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
    return true;
  }
}
