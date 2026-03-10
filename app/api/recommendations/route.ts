import { NextResponse } from 'next/server';

export async function GET() {
  // Sample recommendations - replace with actual logic
  const recommendations = [
    {
      id: 1,
      title: 'Optimize Database Queries',
      description: 'Consider adding indexes to frequently queried columns',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Update Dependencies',
      description: 'Some packages have security updates available',
      priority: 'medium'
    }
  ];
  
  return NextResponse.json(recommendations);
}
