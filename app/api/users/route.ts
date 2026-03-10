import { NextRequest, NextResponse } from 'next/server';

// Mock database - in production, you'd use a real database
let users = [
  { id: 1, username: 'admin', email: 'admin@example.com', created_at: new Date().toISOString() }
];

export async function GET() {
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    if (!data || !data.username || !data.email) {
      return NextResponse.json({ error: 'Username and email are required' }, { status: 400 });
    }
    
    const newUser = {
      id: users.length + 1,
      username: data.username,
      email: data.email,
      created_at: new Date().toISOString()
    };
    
    users.push(newUser);
    
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
