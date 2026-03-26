import { useState } from "react";
import Icon from "@/components/ui/icon";

const PRICE_SECTIONS = [
  {
    title: "Покраска",
    icon: "Paintbrush",
    rows: [
      ["Сплошные поверхности (забор, стена, фасад)", "м²", "от 200 ₽"],
      ["Решётчатые заборы, ворота", "м²", "от 250 ₽"],
      ["Ограждение клумбы", "пог. м", "от 500 ₽"],
      ["Скамейка парковая", "шт", "от 1 500 ₽"],
      ["Урна металлическая", "шт", "от 800 ₽"],
      ["Качели садовые", "шт", "2 000 – 6 000 ₽"],
      ["Беседка / веранда", "шт", "6 000 – 18 000 ₽"],
      ["Бытовка / хозблок", "шт", "5 000 – 12 000 ₽"],
      ["Турник / брусья", "шт", "от 1 500 ₽"],
      ["Детский игровой комплекс", "шт", "договорная"],
    ],
  },
  {
    title: "Демонтаж",
    icon: "Hammer",
    rows: [
      ["Старое строение (дерево)", "м²", "от 400 ₽"],
      ["Сгоревшее строение", "м²", "от 700 ₽"],
      ["Фундамент", "м³", "от 1 200 ₽"],
      ["Забор / ограждение", "пог. м", "от 300 ₽"],
      ["Теплица (поликарбонат)", "шт", "4 000 – 10 000 ₽"],
      ["Теплица (стекло / плёнка)", "шт", "3 000 – 6 000 ₽"],
    ],
  },
  {
    title: "Покос и спил",
    icon: "Scissors",
    rows: [
      ["Покос травы (газон, участок)", "сотка", "от 500 ₽"],
      ["Покос травы (запущенный)", "сотка", "от 800 ₽"],
      ["Спил небольшого дерева (до 30 см)", "шт", "от 1 500 ₽"],
      ["Сбор и складирование скошенного", "участок", "от 1 000 ₽"],
    ],
  },
];

export default function PricesSection() {
  const [activePrice, setActivePrice] = useState(0);

  return (
    <section id="prices" className="py-24 bg-[#141414]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-amber-400" />
            <span className="text-amber-400 text-xs uppercase tracking-[0.3em]">Прайс-лист 2026</span>
          </div>
          <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-4xl md:text-5xl font-bold uppercase tracking-tight">Цены</h2>
          <p className="text-white/40 text-sm mt-2">Точная стоимость — после бесплатного осмотра</p>
        </div>

        <div className="flex gap-0 mb-8 border-b border-white/10">
          {PRICE_SECTIONS.map((sec, i) => (
            <button
              key={sec.title}
              onClick={() => setActivePrice(i)}
              className={`flex items-center gap-2 px-6 py-3 uppercase tracking-widest text-sm border-b-2 transition-colors ${
                activePrice === i
                  ? "border-amber-400 text-amber-400"
                  : "border-transparent text-white/40 hover:text-white/70"
              }`}
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              <Icon name={sec.icon} fallback="List" size={14} />
              {sec.title}
            </button>
          ))}
        </div>

        <div className="border border-white/10">
          <div className="grid grid-cols-3 bg-white/5 px-6 py-3">
            <span className="text-xs uppercase tracking-widest text-white/40">Объект</span>
            <span className="text-xs uppercase tracking-widest text-white/40 text-center">Единица</span>
            <span className="text-xs uppercase tracking-widest text-white/40 text-right">Цена</span>
          </div>
          {PRICE_SECTIONS[activePrice].rows.map(([obj, unit, price], i) => (
            <div
              key={i}
              className="grid grid-cols-3 px-6 py-4 border-t border-white/5 hover:bg-white/[0.02] transition-colors"
            >
              <span className="text-sm text-white/80 pr-4">{obj}</span>
              <span className="text-sm text-white/40 text-center self-center">{unit}</span>
              <span className="text-sm text-amber-400 font-semibold text-right self-center" style={{ fontFamily: "'Oswald', sans-serif" }}>{price}</span>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <a
            href="#contacts"
            className="bg-amber-400 text-black font-semibold px-8 py-3.5 uppercase tracking-widest hover:bg-amber-300 transition-colors text-sm inline-block"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Заказать бесплатный осмотр
          </a>
        </div>
      </div>
    </section>
  );
}
