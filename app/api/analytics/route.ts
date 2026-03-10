import { NextRequest, NextResponse } from 'next/server';

// Mock database - in production, you'd use a real database
let analyticsData = [
  { id: 1, metric_name: 'page_views', value: 100, timestamp: new Date().toISOString() },
  { id: 2, metric_name: 'users_active', value: 25, timestamp: new Date().toISOString() }
];

export async function GET() {
  return NextResponse.json(analyticsData.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  ).slice(0, 100));
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    if (!data || !data.metric_name || data.value === undefined) {
      return NextResponse.json({ error: 'Metric name and value are required' }, { status: 400 });
    }
    
    const newAnalytics = {
      id: analyticsData.length + 1,
      metric_name: data.metric_name,
      value: data.value,
      timestamp: new Date().toISOString()
    };
    
    analyticsData.push(newAnalytics);
    
    return NextResponse.json(newAnalytics, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
