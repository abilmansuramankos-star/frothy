/**
 * Интерфейс интеграции формы консультаций.
 *
 * Бэкенд пока не подключён. Чтобы отправка работала, реализуйте
 * `submitConsultationRequest` (например, вызов API-роута Next.js,
 * который пересылает данные в Telegram Bot API, e-mail или CRM)
 * и подключите роут на стороне клиента. UI-состояния (валидация,
 * загрузка, успех, ошибка) уже готовы.
 */

export interface ConsultationPayload {
  name: string;
  age: string;
  residence: string;
  destination: string;
  program: string;
  contact: string;
  message: string;
}

export class IntegrationNotConfiguredError extends Error {
  constructor() {
    super("Бэкенд для формы консультаций не настроен");
    this.name = "IntegrationNotConfiguredError";
  }
}

export async function submitConsultationRequest(
  payload: ConsultationPayload,
): Promise<void> {
  // TODO(интеграция): замените на реальный запрос к вашему API.
  throw new IntegrationNotConfiguredError();
}
