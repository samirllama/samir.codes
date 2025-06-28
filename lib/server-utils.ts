'use server'

import { headers } from 'next/headers'

export async function getIpAddress() {
  const headersList = await headers()
  return headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || '127.0.0.1'
}