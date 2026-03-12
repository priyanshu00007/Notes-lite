export interface BlockData {
  id: string;
  type: string;
  content: string;
  focus?: boolean;
  checked?: boolean;
  textColor?: string;
  backgroundColor?: string;
  align?: 'left' | 'center' | 'right';
  props?: Record<string, any>; // For things like image URL, language for code, etc.
}

export interface PageData {
  id: string;
  title: string;
  icon: string;
  cover: string;
  workspace: 'private' | 'public';
  favorite: boolean;
  fontFamily: string;
  fullWidth: boolean;
  blocks: BlockData[];
  createdAt: number;
  updatedAt: number;
  isPublic?: boolean;
  shareId?: string;
}


export interface Template {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: string;
  page: Partial<PageData>;
}

