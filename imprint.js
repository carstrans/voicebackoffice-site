const imprintCopy = {
  de: { title: 'Impressum — Voice Back Office', description: 'Impressum von Voice Back Office', back: '← Zur Website', privacy: 'Datenschutz', cancel: 'Verträge hier kündigen' },
  ru: { title: 'Выходные данные — Voice Back Office', description: 'Выходные данные Voice Back Office', back: '← На сайт', privacy: 'Конфиденциальность', cancel: 'Расторгнуть договор' },
  uk: { title: 'Вихідні дані — Voice Back Office', description: 'Вихідні дані Voice Back Office', back: '← На сайт', privacy: 'Конфіденційність', cancel: 'Розірвати договір' },
  en: { title: 'Legal notice — Voice Back Office', description: 'Voice Back Office legal notice', back: '← Back to website', privacy: 'Privacy', cancel: 'Cancel a contract' }
};

function setImprintLanguage(requestedLanguage) {
  const language = imprintCopy[requestedLanguage] ? requestedLanguage : 'de';
  const copy = imprintCopy[language];
  document.documentElement.lang = language;
  document.title = copy.title;
  document.querySelector('meta[name="description"]').content = copy.description;
  const back = document.querySelector('[data-copy="back"]');
  back.textContent = copy.back;
  back.href = `index.html?lang=${language}`;
  const privacy = document.querySelector('.footer-links a');
  privacy.textContent = copy.privacy;
  privacy.href = `privacy.html?lang=${language}`;
  document.querySelector('[data-copy="cancel"]').textContent = copy.cancel;
  document.querySelectorAll('[data-language]').forEach((article) => { article.hidden = article.dataset.language !== language; });
  document.querySelectorAll('[data-lang]').forEach((button) => button.classList.toggle('active', button.dataset.lang === language));
  localStorage.setItem('ybo-language', language);
  const url = new URL(window.location.href);
  url.searchParams.set('lang', language);
  history.replaceState({}, '', url);
}

document.querySelectorAll('[data-lang]').forEach((button) => button.addEventListener('click', () => setImprintLanguage(button.dataset.lang)));
setImprintLanguage(new URLSearchParams(window.location.search).get('lang') || localStorage.getItem('ybo-language') || 'de');
