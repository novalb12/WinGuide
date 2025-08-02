import { sql } from './db';
import { WindowsApp } from './types';

export async function getAllWindowsApps(): Promise<WindowsApp[]> {
  try {
    const apps = await sql`
      SELECT 
        id,
        name,
        winget_id,
        description,
        category,
        created_at,
        updated_at
      FROM winguide.windows_apps 
      ORDER BY category, name
    `;
    
    return apps as WindowsApp[];
  } catch (error) {
    console.error('Error fetching Windows apps:', error);
    return [];
  }
}

export async function getWindowsAppsByCategory(category: string): Promise<WindowsApp[]> {
  try {
    const apps = await sql`
      SELECT 
        id,
        name,
        winget_id,
        description,
        category,
        created_at,
        updated_at
      FROM winguide.windows_apps 
      WHERE category = ${category}
      ORDER BY name
    `;
    
    return apps as WindowsApp[];
  } catch (error) {
    console.error(`Error fetching Windows apps for category ${category}:`, error);
    return [];
  }
}

export async function getWindowsAppCategories(): Promise<string[]> {
  try {
    const categories = await sql`
      SELECT DISTINCT category 
      FROM winguide.windows_apps 
      ORDER BY category
    `;
    
    return categories.map((cat: any) => cat.category);
  } catch (error) {
    console.error('Error fetching Windows app categories:', error);
    return [];
  }
} 