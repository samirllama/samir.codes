'use server'

import { compare } from 'bcryptjs'

// Verify a password
export async function verifyPassword(password: string, hashedPassword: string) {
  return compare(password, hashedPassword)
}
