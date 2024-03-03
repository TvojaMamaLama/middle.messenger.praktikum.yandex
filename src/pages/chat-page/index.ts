
import Handlebars from 'handlebars';
import './chat-page.scss';
export { default as ChatPage } from './chat-page.hbs?raw'

Handlebars.registerHelper('chat-page-list', () => {
  return [
    { name: '1', message: 'yexy', unread: '2' },
    { name: '2', message: 'yexy21', unread: '2' },
    { name: '3', message: 'yex12y', unread: '2' }
  ];
});
