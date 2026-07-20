const privacyCopy = {
  de: { title: 'Datenschutz — Voice Back Office', description: 'Datenschutzhinweise von Voice Back Office', back: '← Zur Website', imprint: 'Impressum', cancel: 'Verträge hier kündigen' },
  ru: { title: 'Конфиденциальность — Voice Back Office', description: 'Политика конфиденциальности Voice Back Office', back: '← На сайт', imprint: 'Выходные данные', cancel: 'Расторгнуть договор' },
  uk: { title: 'Конфіденційність — Voice Back Office', description: 'Політика конфіденційності Voice Back Office', back: '← На сайт', imprint: 'Вихідні дані', cancel: 'Розірвати договір' },
  en: { title: 'Privacy — Voice Back Office', description: 'Voice Back Office privacy notice', back: '← Back to website', imprint: 'Legal notice', cancel: 'Cancel a contract' }
};

function setPrivacyLanguage(requestedLanguage) {
  const language = privacyCopy[requestedLanguage] ? requestedLanguage : 'de';
  const copy = privacyCopy[language];
  document.documentElement.lang = language;
  document.title = copy.title;
  document.querySelector('meta[name="description"]').content = copy.description;
  const back = document.querySelector('[data-copy="back"]');
  back.textContent = copy.back;
  back.href = `index.html?lang=${language}`;
  const imprint = document.querySelector('.footer-links a');
  imprint.textContent = copy.imprint;
  imprint.href = `imprint.html?lang=${language}`;
  document.querySelector('[data-copy="cancel"]').textContent = copy.cancel;
  document.querySelectorAll('[data-language]').forEach((article) => { article.hidden = article.dataset.language !== language; });
  document.querySelectorAll('[data-lang]').forEach((button) => button.classList.toggle('active', button.dataset.lang === language));
  localStorage.setItem('ybo-language', language);
  const url = new URL(window.location.href);
  url.searchParams.set('lang', language);
  history.replaceState({}, '', url);
}

document.querySelectorAll('[data-lang]').forEach((button) => button.addEventListener('click', () => setPrivacyLanguage(button.dataset.lang)));
setPrivacyLanguage(new URLSearchParams(window.location.search).get('lang') || localStorage.getItem('ybo-language') || 'de');
