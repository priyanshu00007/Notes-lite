export const generateId = () => Math.random().toString(36).substr(2, 9);

export const debounce = <T extends (...args: any[]) => any>(func: T, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const getRandomEmoji = () => {
  const emojis = ['📄', '👋', '🚀', '💡', '🎨', '⚡', '💻', '🔮', '✨', '📝', '📌', '🗓️'];
  return emojis[Math.floor(Math.random() * emojis.length)];
};

export const getRandomCover = () => {
  const gradients = [
    'bg-gradient-to-r from-pink-100 to-blue-100',
    'bg-gradient-to-r from-green-100 to-blue-100',
    'bg-gradient-to-r from-yellow-100 to-orange-100',
    'bg-gradient-to-r from-purple-100 to-pink-100',
    'bg-gradient-to-r from-indigo-100 to-purple-200',
    'bg-gradient-to-r from-slate-300 to-slate-500',
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
};

export const FONT_LIBRARY = [
    { cat: 'Sans Serif', fonts: [{ name: 'Inter', family: "'Inter', sans-serif" }, { name: 'Roboto', family: "'Roboto', sans-serif" }, { name: 'Open Sans', family: "'Open Sans', sans-serif" }] },
    { cat: 'Serif', fonts: [{ name: 'Merriweather', family: "'Merriweather', serif" }, { name: 'Playfair', family: "'Playfair Display', serif" }, { name: 'Lora', family: "'Lora', serif" }] },
    { cat: 'Monospace', fonts: [{ name: 'Fira Code', family: "'Fira Code', monospace" }, { name: 'JetBrains', family: "'JetBrains Mono', monospace" }] },
    { cat: 'Display', fonts: [{ name: 'Pacifico', family: "'Pacifico', cursive" }, { name: 'Comfortaa', family: "'Comfortaa', cursive" }] }
];

export const TEXT_COLORS = [
    { name: 'Default', class: '' },
    { name: 'Gray', class: 'text-gray-500' },
    { name: 'Brown', class: 'text-amber-700' },
    { name: 'Orange', class: 'text-orange-500' },
    { name: 'Yellow', class: 'text-yellow-600' },
    { name: 'Green', class: 'text-emerald-600' },
    { name: 'Blue', class: 'text-blue-600' },
    { name: 'Purple', class: 'text-purple-600' },
    { name: 'Pink', class: 'text-pink-600' },
    { name: 'Red', class: 'text-red-600' },
];

export const BG_COLORS = [
    { name: 'Default', class: '' },
    { name: 'Gray', class: 'bg-gray-100' },
    { name: 'Brown', class: 'bg-amber-100' },
    { name: 'Orange', class: 'bg-orange-100' },
    { name: 'Yellow', class: 'bg-yellow-100' },
    { name: 'Green', class: 'bg-emerald-100' },
    { name: 'Blue', class: 'bg-blue-100' },
    { name: 'Purple', class: 'bg-purple-100' },
    { name: 'Pink', class: 'bg-pink-100' },
    { name: 'Red', class: 'bg-red-100' },
];

export const NOTION_TEMPLATES = [
  {
    id: 'tpl_1',
    name: 'To-do List',
    icon: '✅',
    description: 'Track your daily tasks and projects.',
    category: 'Personal',
    page: {
      title: 'Daily To-do List',
      icon: '✅',
      cover: 'bg-gradient-to-r from-green-100 to-blue-100',
      blocks: [
        { id: 'b1', type: 'h1', content: 'Tasks for today' },
        { id: 'b2', type: 'todo', content: 'Morning Workout', checked: true },
        { id: 'b3', type: 'todo', content: 'Buy groceries', checked: false },
        { id: 'b4', type: 'todo', content: 'Finish coding project', checked: false },
        { id: 'b5', type: 'text', content: '' },
        { id: 'b6', type: 'divider', content: '' },
        { id: 'b7', type: 'quote', content: 'Small steps every day leads to big success.' }
      ]
    }
  },
  {
    id: 'tpl_2',
    name: 'Reading List',
    icon: '📚',
    description: 'Keep track of books you want to read.',
    category: 'Personal',
    page: {
      title: 'Reading List',
      icon: '📚',
      cover: 'bg-gradient-to-r from-purple-100 to-pink-100',
      blocks: [
        { id: 'b1', type: 'h1', content: 'My Library' },
        { id: 'b2', type: 'h2', content: 'Currently Reading' },
        { id: 'b3', type: 'bullet', content: 'Deep Work - Cal Newport' },
        { id: 'b4', type: 'h2', content: 'Wishlist' },
        { id: 'b5', type: 'bullet', content: 'Atomic Habits' },
        { id: 'b6', type: 'bullet', content: 'The Alchemist' }
      ]
    }
  },
  {
    id: 'tpl_3',
    name: 'Meeting Notes',
    icon: '🤝',
    description: 'Template for structured meeting minutes.',
    category: 'Work',
    page: {
      title: 'Meeting Notes',
      icon: '🤝',
      cover: 'bg-gradient-to-r from-gray-200 to-gray-400',
      blocks: [
        { id: 'b1', type: 'h1', content: 'Weekly Sync' },
        { id: 'b2', type: 'callout', content: 'Date: ' + new Date().toLocaleDateString() },
        { id: 'b3', type: 'h2', content: 'Attendees' },
        { id: 'b4', type: 'text', content: '...' },
        { id: 'b5', type: 'h2', content: 'Agenda' },
        { id: 'b6', type: 'bullet', content: 'Review last week results' },
        { id: 'b7', type: 'bullet', content: 'Plan next sprint' }
      ]
    }
  }
];

