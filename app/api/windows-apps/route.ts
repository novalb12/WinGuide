import { NextResponse } from 'next/server';
import { getAllWindowsApps, getWindowsAppsByCategory } from '@/lib/windows-apps';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let apps;
    if (category) {
      apps = await getWindowsAppsByCategory(category);
    } else {
      apps = await getAllWindowsApps();
    }

    return NextResponse.json({ apps });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Windows apps' },
      { status: 500 }
    );
  }
} 