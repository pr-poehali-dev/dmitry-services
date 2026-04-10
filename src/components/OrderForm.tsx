import { useState } from "react";
import Icon from "@/components/ui/icon";

const PAINT_OPTIONS = [
  "Забор (дерево/металл)",
  "Ворота, калитка",
  "Скамейка, урна, качели",
  "Беседка, веранда, бытовка",
  "Фасад дома (низ, цоколь)",
];

const MOW_OPTIONS = [
  "Покос травы (обычный)",
  "Запущенный участок (трава выше колена, крапива, бурьян)",
  "Вырубка мелкого кустарника",
  "Убрать скошенную траву в кучи",
  "Погрузить траву в мешки (без вывоза)",
];

const DEMO_OPTIONS = [
  "Разобрать старую баню, сарай (деревянные)",
  "Разобрать теплицу, парник",
  "Сгоревшая постройка (осторожно, руками)",
];

const OTHER_OPTIONS = [
  "Шлифовка дерева (полки, лавки, доски)",
  "Мелкий ремонт по дому (уточню при звонке)",
];

const VOLUME_OPTIONS = [
  "Маленький (1–2 часа)",
  "Средний (полдня – день)",
  "Большой (1–2 дня)",
  "Сложно оценить — нужен выезд",
];

const CONDITIONS_OPTIONS = [
  "Есть электричество на участке",
  "Работать можно в любой день (обсудим время)",
  "Есть кому показать границы участка / что именно красить",
  "Мусор после работы оставить на участке (не вывожу)",
];

const inputCls = "w-full bg-[#141414] border border-white/15 text-white px-4 py-3 text-sm placeholder:text-white/20 focus:outline-none focus:border-amber-400/50 transition-colors";
const labelCls = "text-xs uppercase tracking-widest text-white/40 mb-2 block";
const sectionTitleCls = "text-xs uppercase tracking-widest text-amber-400/80 mb-3 mt-1";

function CheckGroup({ options, selected, onChange, other, onOther }: {
  options: string[];
  selected: string[];
  onChange: (val: string[]) => void;
  other?: string;
  onOther?: (v: string) => void;
}) {
  const toggle = (opt: string) => {
    onChange(selected.includes(opt) ? selected.filter(x => x !== opt) : [...selected, opt]);
  };
  return (
    <div className="space-y-2">
      {options.map(opt => (
        <label key={opt} className="flex items-start gap-3 cursor-pointer group">
          <div
            onClick={() => toggle(opt)}
            className={`mt-0.5 w-4 h-4 flex-shrink-0 border transition-colors cursor-pointer ${selected.includes(opt) ? "border-amber-400 bg-amber-400" : "border-white/20 bg-transparent group-hover:border-white/40"}`}
          >
            {selected.includes(opt) && <Icon name="Check" size={12} className="text-black" />}
          </div>
          <span className="text-sm text-white/70 leading-snug">{opt}</span>
        </label>
      ))}
      {onOther !== undefined && (
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 flex-shrink-0 border border-white/20" />
          <input
            type="text"
            value={other}
            onChange={e => onOther(e.target.value)}
            placeholder="Другое: опишите своими словами"
            className="flex-1 bg-[#141414] border border-white/15 text-white px-3 py-2 text-sm placeholder:text-white/20 focus:outline-none focus:border-amber-400/50 transition-colors"
          />
        </div>
      )}
    </div>
  );
}

export default function OrderForm() {
  const [paint, setPaint] = useState<string[]>([]);
  const [paintOther, setPaintOther] = useState("");
  const [mow, setMow] = useState<string[]>([]);
  const [demo, setDemo] = useState<string[]>([]);
  const [demoOther, setDemoOther] = useState("");
  const [other, setOther] = useState<string[]>([]);
  const [volume, setVolume] = useState("");
  const [conditions, setConditions] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [callTime, setCallTime] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  const hasWork = paint.length > 0 || paintOther || mow.length > 0 || demo.length > 0 || demoOther || other.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setStatus("sending");
    await new Promise(r => setTimeout(r, 600));
    setStatus("ok");
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
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* Шаг 1 — Что нужно сделать */}
      <div>
        <p className={labelCls}>1. Что нужно сделать? <span className="text-white/25">(выберите одно или несколько)</span></p>

        <div className="space-y-6">
          <div>
            <p className={sectionTitleCls}>Покраска</p>
            <CheckGroup options={PAINT_OPTIONS} selected={paint} onChange={setPaint} other={paintOther} onOther={setPaintOther} />
          </div>
          <div>
            <p className={sectionTitleCls}>Покос и уборка</p>
            <CheckGroup options={MOW_OPTIONS} selected={mow} onChange={setMow} />
          </div>
          <div>
            <p className={sectionTitleCls}>Демонтаж (руками)</p>
            <CheckGroup options={DEMO_OPTIONS} selected={demo} onChange={setDemo} other={demoOther} onOther={setDemoOther} />
          </div>
          <div>
            <p className={sectionTitleCls}>Прочее</p>
            <CheckGroup options={OTHER_OPTIONS} selected={other} onChange={setOther} />
          </div>
        </div>
      </div>

      {/* Шаг 2 — Объём */}
      <div>
        <p className={labelCls}>2. Объём работ <span className="text-white/25">(на глаз)</span></p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {VOLUME_OPTIONS.map(opt => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer group">
              <div
                onClick={() => setVolume(opt)}
                className={`w-4 h-4 flex-shrink-0 border rounded-full transition-colors cursor-pointer flex items-center justify-center ${volume === opt ? "border-amber-400 bg-amber-400" : "border-white/20 group-hover:border-white/40"}`}
              >
                {volume === opt && <div className="w-2 h-2 rounded-full bg-black" />}
              </div>
              <span className="text-sm text-white/70">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Шаг 3 — Условия */}
      <div>
        <p className={labelCls}>3. Что важно знать мастеру</p>
        <CheckGroup options={CONDITIONS_OPTIONS} selected={conditions} onChange={setConditions} />
      </div>

      {/* Шаг 4 — Контакты */}
      <div>
        <p className={labelCls}>4. Контакты</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs text-white/30">Имя *</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Иван Иванов"
              className={inputCls}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-white/30">Телефон *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+7 (___) ___-__-__"
              className={inputCls}
            />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="text-xs text-white/30">Удобное время для звонка</label>
            <input
              type="text"
              value={callTime}
              onChange={e => setCallTime(e.target.value)}
              placeholder="Например: с 10:00 до 18:00, в будни"
              className={inputCls}
            />
          </div>
        </div>
      </div>

      {/* Кнопка */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <button
          type="submit"
          disabled={status === "sending" || !name || !phone}
          className="bg-amber-400 text-black font-semibold px-10 py-3.5 uppercase tracking-widest hover:bg-amber-300 transition-colors text-sm disabled:opacity-50"
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
