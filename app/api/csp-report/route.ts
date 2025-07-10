import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const report = await req.json();
    console.log('CSP Violation Report:', JSON.stringify(report, null, 2));
    return NextResponse.json({ message: 'CSP report received' }, { status: 200 });
  } catch (error) {
    console.error('Error processing CSP report:', error);
    return NextResponse.json({ message: 'Error processing report' }, { status: 400 });
  }
}
