//Enums

//Core types and combined DTOs

export type TokensDTO = {
  accessToken: string
  refreshToken: string
}

//Query params
export type ChangeTokenQueryParams = {
  resetToken: string
  newPassword: string
  email: string
}

export type LoginQueryParams = {
  email: string
  password: string
}
