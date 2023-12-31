import { Controller, Body, UseGuards, Post } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { LoginDto } from "./dtos/login.dto"
import { LocalAuthGuard } from "./local-auth.guard"
import { ApiTags } from "@nestjs/swagger"

@ApiTags("Login")
@Controller("login")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UseGuards(LocalAuthGuard)
  async login(@Body() user: LoginDto) {
    return this.authService.login(user.email)
  }
}
