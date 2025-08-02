export interface WindowsApp {
  id: number;
  name: string;
  winget_id: string;
  description: string;
  category: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface WindowsAppCategory {
  id: number;
  name: string;
  description?: string;
} 