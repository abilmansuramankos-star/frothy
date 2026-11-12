# Work & Travel — сайт создателя контента

Персональный сайт: блог-дневник, консультации для студентов, раздел для агентств
и работодателей, медиакит и контакты. Стек: Next.js (App Router), TypeScript,
Tailwind CSS v4, Framer Motion, Lucide.

## Запуск

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # прод-сборка + проверка типов
npm run typecheck  # только типы
```

## Как заполнить контент

Почти всё редактируется в одном файле: **`src/content/profile.ts`**
(имя, тексты, ссылки на соцсети, цифры аудитории, статьи, контакты).
Значения-плейсхолдеры помечены комментарием `ЗАМЕНИТЕ`. Метрики со значением
`null` показываются как «—» и не выдают себя за реальные.

Фотографии: положите файлы в `public/images` и замените компонент
`PhotoSlot` на `next/image` в соответствующих секциях.

Медиакит: обновите цифры в `scripts/generate-media-kit.mjs` и запустите
`npm run media-kit` — пересоздаст `public/media-kit.pdf` (шрифты с кириллицей
лежат в `scripts/fonts`).

## Интеграция формы консультаций

Форма («Планируете поехать работать за границу?») полностью работает на
клиенте: валидация, состояния загрузки, успеха и ошибки. Отправка на сервер —
**не подключена**: `submitConsultationRequest` в `src/lib/consultation.ts`
сейчас выбрасывает `IntegrationNotConfiguredError`, и пользователь видит
честное сообщение с альтернативными каналами связи.

Чтобы включить реальную отправку, реализуйте API-роут (например,
`src/app/api/consultations/route.ts`), который пересылает данные в Telegram
Bot API, e-mail-сервис или CRM, и замените тело
`submitConsultationRequest` на `fetch("/api/consultations", …)`.

## Структура

```
src/app/        # layout (SEO, шрифты), страница, глобальные стили (токены)
src/components/ # секции и UI-примитивы
src/content/    # profile.ts — весь редактируемый контент
src/lib/        # интерфейс интеграции формы
scripts/        # генератор media-kit.pdf
```
