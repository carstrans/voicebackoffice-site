# Voice Back Office — landing page

Статический маркетинговый лендинг продукта **Voice Back Office** (голосовой ИИ-ассистент для звонков, продукт CarsTrans). Репозиторий: `github.com/carstrans/voicebackoffice-site`. Публикуется через GitHub Pages на домен `voicebackoffice.com` (см. `CNAME`).

## Стек

Чистый HTML/CSS/JS, без сборки, без npm/package.json. Локальный просмотр:

```bash
python3 -m http.server 8000
```

## Структура файлов

- `index.html` — главная страница (все секции: hero, платформа, запуск, отрасли, демо, партнёры)
- `script.js` — вся логика: словарь переводов (`translations`), переключение языка, виджет голосового звонка, отправка лид-формы
- `styles.css` — базовые стили лендинга
- `language.css` — визуальный оверрайд поверх `styles.css` (другая цветовая/шрифтовая тема — сериф-заголовки, розово-фиолетовая палитра, изменённый порядок секций)
- `privacy.css`, `privacy.html`, `privacy.js`, `imprint.html` — страницы конфиденциальности и импринта
- `assets/` — favicon и шрифты Manrope (изображений/логотипа-картинки сейчас нет)

## Языки (i18n)

Поддерживаются `de` (по умолчанию), `ru`, `uk`, `en`. Весь текст — в объекте `translations` в `script.js`, ключи `data-i18n` / `data-i18n-html` в разметке. Язык переключается кнопками `[data-lang]`, сохраняется в `localStorage` (`ybo-language`) и в URL-параметре `?lang=`.

**Правило:** при изменении текста — обновлять все 4 языка, иначе часть аудитории увидит рассинхронизированный контент.

## Демо-звонок — интеграция Newo.ai

Кнопка «Live-demo» на сайте (`#voice-demo-button` в `script.js`) грузит виджет **Newo.ai** (`cdn.newo.ai/webcall-widget/widget.umd.min.js`) и инициализирует его так:

```js
window.WebCallWidget.init({
  customerIdn: 'C_NE_ELHH8DBX',
  connectorIdn: 'newo_voice_connector_web',
  ...
})
```

Это и есть подключение к конкретному аккаунту/сценарию Newo.ai. **Чтобы переключить демо на другой аккаунт/агента** — меняются именно эти два значения (`customerIdn`, `connectorIdn`) в `script.js`. Приветственная фраза и контекст ассистента (`callMetadata.greetingPhrase`, `callMetadata.context`) там же, с локализацией по `currentLanguage`.

## Лид-форма

Форма `#lead-form` отправляется AJAX-запросом на `formsubmit.co` (захардкоженный ID в `script.js`), без собственного backend. При успехе показывается модалка `#success-modal`.

## Логотип

Сейчас логотип — не картинка, а CSS-конструкция: `.logo-mark` (кружок с 4 палочками) + текст «VOICE BACK OFFICE» рядом (в `<header>` и `<footer>` в `index.html`). Чтобы вставить настоящий логотип-изображение — нужно добавить файл в `assets/` и заменить/дополнить блок `.logo` в обоих местах (header и footer), не забыв про адаптацию под тёмный фон header/footer.
