import { Injectable } from "@nestjs/common"
import { UsersService } from "../users/users.service"
import { compare } from "bcryptjs"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userEmail: string, password: string) {
    const user = await this.userService.findByEmail(userEmail)
    if (user) {
      const passwordMatch = await compare(password, user.password)
      if (passwordMatch) {
        return { email: user.email }
      }

      return null
    }
  }

  async login(email: string) {
    const user = await this.userService.findByEmail(email)
    return {
      token: this.jwtService.sign({ email: email }, { subject: user.id }),
    }
  }
}
