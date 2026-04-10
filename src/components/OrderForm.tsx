import { useState } from "react";
import Icon from "@/components/ui/icon";

const inputCls = "w-full bg-[#141414] border border-white/15 text-white px-4 py-3 text-sm placeholder:text-white/20 focus:outline-none focus:border-amber-400/50 transition-colors";

export default function OrderForm() {
  const [form, setForm] = useState({ name: "", phone: "", service: "", comment: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setStatus("sending");
    try {
      const res = await fetch("https://functions.poehali.dev/1886b467-c239-4908-b82b-a9950d7dd0cc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          callTime: "",
          paint: [],
          paintOther: "",
          mow: [],
          demo: [],
          demoOther: "",
          other: [],
          volume: form.service,
          conditions: [],
          comment: form.comment,
        }),
      });
      if (res.ok) {
        setStatus("ok");
      } else {
        setStatus("err");
      }
    } catch {
      setStatus("err");
    }
  };

  if (status === "ok") {
    return (
      <div className="border border-amber-400/30 bg-amber-400/5 p-12 text-center">
        <div className="w-14 h-14 border border-amber-400 flex items-center justify-center mx-auto mb-6">
          <Icon name="CheckCheck" size={24} className="text-amber-400" />
        </div>
        <h3 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-2xl uppercase tracking-wide mb-2">Заявка принята!</h3>
        <p className="text-white/50 text-sm">Дмитрий свяжется с вами в течение часа.</p>
        <p className="text-white/30 text-sm mt-1">Или звоните сразу: <a href="tel:89935039859" className="text-amber-400 hover:underline">8 (993) 503-98-59</a></p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-widest text-white/40">Ваше имя *</label>
        <input
          type="text"
          required
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          placeholder="Иван Иванов"
          className={inputCls}
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-widest text-white/40">Телефон *</label>
        <input
          type="tel"
          required
          value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
          placeholder="+7 (___) ___-__-__"
          className={inputCls}
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-widest text-white/40">Услуга</label>
        <select
          value={form.service}
          onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
          className="w-full bg-[#141414] border border-white/15 text-white px-4 py-3 text-sm focus:outline-none focus:border-amber-400/50 transition-colors appearance-none"
        >
          <option value="">Выберите услугу</option>
          <option value="Покраска краскопультом">Покраска краскопультом</option>
          <option value="Покос травы / уборка">Покос травы / уборка</option>
          <option value="Демонтаж / расчистка">Демонтаж / расчистка</option>
          <option value="Другое">Другое</option>
        </select>
      </div>
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-widest text-white/40">Комментарий</label>
        <input
          type="text"
          value={form.comment}
          onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
          placeholder="Опишите объект или задачу"
          className={inputCls}
        />
      </div>
      {status === "err" && (
        <div className="md:col-span-2">
          <p className="text-red-400 text-sm border border-red-400/30 bg-red-400/5 px-4 py-3">
            Не удалось отправить. Позвоните напрямую: <a href="tel:89935039859" className="underline">8 (993) 503-98-59</a>
          </p>
        </div>
      )}
      <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-amber-400 text-black font-semibold px-10 py-3.5 uppercase tracking-widest hover:bg-amber-300 transition-colors text-sm disabled:opacity-60"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          {status === "sending" ? "Отправляю..." : "Отправить заявку"}
        </button>
        <p className="text-white/25 text-xs leading-relaxed">
          Нажимая кнопку, вы соглашаетесь на обработку персональных данных.<br />
          Звоните напрямую: <a href="tel:89935039859" className="text-white/40 hover:text-amber-400 transition-colors">8 (993) 503-98-59</a>
        </p>
      </div>
    </form>
  );
}
