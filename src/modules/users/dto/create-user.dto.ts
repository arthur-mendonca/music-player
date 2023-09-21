import { ApiProperty } from "@nestjs/swagger"
import { hashSync } from "bcryptjs"
import { Transform } from "class-transformer"
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class CreateUserDto {
  @ApiProperty({ description: "Nome do usuário", example: "João" })
  @IsString()
  name: string

  @ApiProperty({ description: "Email do usuário", example: "user@mail.com" })
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty({
    description: "Senha do usuário",
    example: "123456",
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ["transform"],
  })
  password: string
}
