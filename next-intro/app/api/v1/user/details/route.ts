import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({
    name: 'harkirat',
    email: 'harkirat@gmail.com',
  });
}
