import { NextResponse } from 'next/server';

export async function GET() {
  // Mock data - in production, you'd query your actual database
  const stats = {
    total_users: 1,
    total_analytics_points: 2,
    last_updated: new Date().toISOString()
  };
  
  return NextResponse.json(stats);
}
