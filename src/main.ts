import Handlebars from 'handlebars';
import './main.scss';
import * as Components from './components';
import * as Pages from './pages';

const pages: any = {
  'chat': [Pages.ChatPage],
  'login': [Pages.LoginPage],
  'signup': [Pages.SignupPage],
  'profile': [Pages.ProfilePage],
  'edit': [Pages.EditDataPage],
  'password': [Pages.EditPasswordPage],
};

Object.entries(Components).forEach(([ name, component]: any) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page: string) {
  const pageComponent = pages[page] || [Pages.ErrorPage];
  const [source, args] = pageComponent;
  const handlebarsFunct = Handlebars.compile(source);
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = handlebarsFunct(args);
  history.pushState({ page }, 'null', `/${page}`);
};

function handleNavigation() {
  const path = window.location.pathname.slice(1);
  if (path === '') {
    navigate('chat'); // Открываем страницу чата по умолчанию, если URL пустой
  } else {
    navigate(path);
  }
}

document.addEventListener("DOMContentLoaded", handleNavigation);

document.addEventListener('click', (e: any) => {
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);
    e.preventDefault();
  }
});

// Обработка изменения URL
window.addEventListener('popstate', () => {
  handleNavigation();
});
