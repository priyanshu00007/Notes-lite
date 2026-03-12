import { PageData } from "../types";

const DEMO_MODE = true; 
const API_URL = 'http://localhost:5000/api/pages';

export const api = {
  fetchPages: async (): Promise<PageData[]> => {
    if (DEMO_MODE) {
      const saved = localStorage.getItem('notion-lite-pages-v6');
      return saved ? JSON.parse(saved) : [];
    }
    const res = await fetch(API_URL);
    return res.json();
  },

  createPage: async (page: PageData): Promise<PageData> => {
    if (DEMO_MODE) {
      const pages = await api.fetchPages();
      const newPages = [...pages, page];
      localStorage.setItem('notion-lite-pages-v6', JSON.stringify(newPages));
      return page;
    }
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(page),
    });
    return res.json();
  },

  updatePage: async (page: PageData): Promise<PageData> => {
    if (DEMO_MODE) {
      const pages = await api.fetchPages();
      const newPages = pages.map(p => p.id === page.id ? page : p);
      localStorage.setItem('notion-lite-pages-v6', JSON.stringify(newPages));
      return page;
    }
    await fetch(`${API_URL}/${page.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(page),
    });
    return page;
  },

  deletePage: async (id: string): Promise<boolean> => {
    if (DEMO_MODE) {
      const pages = await api.fetchPages();
      const newPages = pages.filter(p => p.id !== id);
      localStorage.setItem('notion-lite-pages-v6', JSON.stringify(newPages));
      return true;
    }
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    return true;
  }
};
