import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenUtils {
  constructor(private jwtService: JwtService) {}

  getUserIdFromToken(token: string): number | null {
    try {
      const decoded = this.jwtService.decode(token);
      return decoded['id'] || null;
    } catch (error) {
      // Handle token decoding error
      return null;
    }
  }

  async show(token: string) {
    const user = this.getUserIdFromToken(token);
    return user
  }
}