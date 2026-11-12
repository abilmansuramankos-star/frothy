"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { PhotoSlot } from "./ui/PhotoSlot";
import {
  IntegrationNotConfiguredError,
  submitConsultationRequest,
  type ConsultationPayload,
} from "@/lib/consultation";

const initial: ConsultationPayload = {
  name: "",
  age: "",
  residence: "",
  destination: "",
  program: "",
  contact: "",
  message: "",
};

const programs = [
  { value: "", label: "Выберите программу" },
  { value: "work-travel-usa", label: "Work & Travel USA" },
  { value: "work-travel-germany", label: "Work & Travel Germany / Aupair" },
  { value: "summer-job", label: "Летняя работа за границей" },
  { value: "internship", label: "Стажировка" },
  { value: "other", label: "Другое / не определился" },
];

type Status = "idle" | "loading" | "success" | "error";

export function Consultations() {
  const [form, setForm] = useState<ConsultationPayload>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof ConsultationPayload, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  function set<K extends keyof ConsultationPayload>(
    key: K,
    value: ConsultationPayload[K],
  ) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const next: typeof errors = {};
    if (form.name.trim().length < 2) next.name = "Укажите имя";
    const age = Number(form.age);
    if (!Number.isInteger(age) || age < 18 || age > 45)
      next.age = "Возраст от 18 до 45";
    if (form.residence.trim().length < 2) next.residence = "Укажите город";
    if (form.destination.trim().length < 2) next.destination = "Укажите страну";
    if (!form.program) next.program = "Выберите программу";
    if (form.contact.trim().length < 5) next.contact = "Телефон или WhatsApp";
    if (form.message.trim().length < 10) next.message = "Опишите вопрос подробнее";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    if (!validate()) return;
    setStatus("loading");
    try {
      await submitConsultationRequest(form);
      setStatus("success");
      setForm(initial);
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof IntegrationNotConfiguredError
          ? "Форма пока не подключена к серверу — используйте Telegram или WhatsApp из блока «Контакты». Интеграция описана в README проекта."
          : "Не удалось отправить. Попробуйте ещё раз или напишите в Telegram.",
      );
    }
  }

  const inputCls =
    "w-full border border-line bg-warmwhite px-4 py-3 text-sm text-ink placeholder:text-muted/70 focus:border-accent";

  return (
    <section
      id="consultations"
      className="border-t border-line py-16 sm:py-24"
      aria-label="Консультации"
    >
      <SectionHeading
        kicker="Консультации"
        title="Планируете поехать работать за границу?"
        description="Заполните форму — разберу вашу ситуацию и подскажу, с чего начать: программа, документы, бюджет и подводные камни."
      />
      <Container className="mt-12">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <PhotoSlot label="консультация онлайн" ratio="aspect-[4/3]" />
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-muted">
              <li>— разбор программ и честная оценка ваших шансов;</li>
              <li>— как проверить агентство и не переплатить;</li>
              <li>— бюджет поездки: зарплата, расходы, налоги.</li>
            </ul>
          </div>
          <div className="lg:col-span-7">
            {status === "success" ? (
              <div
                role="status"
                className="flex h-full min-h-72 flex-col items-center justify-center border border-line bg-paper/60 p-10 text-center"
              >
                <p className="font-serif text-2xl text-navy">Заявка принята</p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                  Спасибо! Свяжусь с вами в ближайшее время по указанному контакту.
                </p>
                <button
                  type="button"
                  className="mt-6 border border-charcoal px-5 py-2 text-sm font-semibold text-ink hover:border-accent hover:text-accent"
                  onClick={() => setStatus("idle")}
                >
                  Отправить ещё одну
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="border border-line bg-paper/40 p-6 sm:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  {(
                    [
                      { key: "name", label: "Имя", type: "text", ph: "Как к вам обращаться" },
                      { key: "age", label: "Возраст", type: "number", ph: "18–45" },
                      { key: "residence", label: "Город проживания", type: "text", ph: "Алматы" },
                      { key: "destination", label: "Куда хотите поехать", type: "text", ph: "США" },
                    ] as const
                  ).map((f) => (
                    <div key={f.key}>
                      <label htmlFor={`f-${f.key}`} className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-muted">
                        {f.label}
                      </label>
                      <input
                        id={`f-${f.key}`}
                        type={f.type}
                        value={form[f.key]}
                        onChange={(e) => set(f.key, e.target.value)}
                        placeholder={f.ph}
                        aria-invalid={Boolean(errors[f.key])}
                        aria-describedby={errors[f.key] ? `err-${f.key}` : undefined}
                        className={inputCls}
                      />
                      {errors[f.key] ? (
                        <p id={`err-${f.key}`} className="mt-1.5 text-xs text-accent">
                          {errors[f.key]}
                        </p>
                      ) : null}
                    </div>
                  ))}
                  <div>
                    <label htmlFor="f-program" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-muted">
                      Программа
                    </label>
                    <select
                      id="f-program"
                      value={form.program}
                      onChange={(e) => set("program", e.target.value)}
                      aria-invalid={Boolean(errors.program)}
                      className={inputCls}
                    >
                      {programs.map((p) => (
                        <option key={p.value} value={p.value}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                    {errors.program ? (
                      <p className="mt-1.5 text-xs text-accent">{errors.program}</p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="f-contact" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-muted">
                      Телефон / WhatsApp
                    </label>
                    <input
                      id="f-contact"
                      type="tel"
                      value={form.contact}
                      onChange={(e) => set("contact", e.target.value)}
                      placeholder="+7 700 000-00-00"
                      aria-invalid={Boolean(errors.contact)}
                      className={inputCls}
                    />
                    {errors.contact ? (
                      <p className="mt-1.5 text-xs text-accent">{errors.contact}</p>
                    ) : null}
                  </div>
                </div>
                <div className="mt-5">
                  <label htmlFor="f-message" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-muted">
                    Сообщение
                  </label>
                  <textarea
                    id="f-message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    placeholder="Расскажите о себе и о вопросе: учёба, опыт работы, сроки"
                    aria-invalid={Boolean(errors.message)}
                    className={`${inputCls} resize-y`}
                  />
                  {errors.message ? (
                    <p className="mt-1.5 text-xs text-accent">{errors.message}</p>
                  ) : null}
                </div>
                {status === "error" && serverError ? (
                  <p role="alert" className="mt-4 border border-accent/40 bg-accent-soft px-4 py-3 text-sm text-ink">
                    {serverError}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-6 inline-flex items-center gap-2 border border-navy bg-navy px-6 py-3 text-sm font-semibold text-warmwhite transition-colors hover:border-accent hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                      Отправляем…
                    </>
                  ) : (
                    "Отправить заявку"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
