
import Handlebars from 'handlebars';
import './ChatPage.scss';
export { default as ChatPage } from './ChatPage.hbs?raw'

Handlebars.registerHelper('ChatPage-list', () => {
  return [
    { name: 'Ваня', message: 'Чего молчишь?', unread: '2' },
    { name: 'Петя', message: 'Привет', unread: '0' },
    { name: 'Дима', message: 'Смотри смешной кот', unread: '3' }
  ];
});
