import Handlebars from 'handlebars';
import './main.scss';
import * as Components from './components';
import * as Pages from './pages';

const pages: any = {
  'chat': [Pages.ChatPage],
  'login': [Pages.LoginPage],
  'signup': [Pages.SignupPage],
};

Object.entries(Components).forEach(([ name, component]: any) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page: string) {
  const [source, args] = pages[page];
  const handlebarsFunct = Handlebars.compile(source);
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = handlebarsFunct(args);
};

document.addEventListener("DOMContentLoaded", () => navigate('login'));

document.addEventListener('click', (e: any) => {
  const page = e.target.getAttribute('page');
  console.log(page);
  if (page) {
    navigate(page);

    e.preventDefault();
    e.preventDefault();
    e.stopImmediatePropagation();
  }
});