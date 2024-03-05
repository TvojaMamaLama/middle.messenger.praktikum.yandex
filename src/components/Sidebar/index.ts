import Handlebars from 'handlebars';

import './Sidebar.scss';
export { default as Sidebar } from './Sidebar.hbs?raw'

Handlebars.registerHelper('chat_ist', () => {
  return [
    { name: 'Ваня', message: 'Чего молчишь?', unread: '2' },
    { name: 'Петя', message: 'Привет', unread: '0' },
    { name: 'Дима', message: 'Смотри смешной кот', unread: '3' }
  ];
});
