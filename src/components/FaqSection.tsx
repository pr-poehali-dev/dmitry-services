import { useState } from "react";
import Icon from "@/components/ui/icon";

const FAQ = [
  {
    q: "Как узнать точную цену?",
    a: "Приезжаю на бесплатный осмотр — оцениваю объём, состояние поверхности и называю точную цену. Никаких сюрпризов после.",
  },
  {
    q: "Работаете с юридическими лицами?",
    a: "Да. Для юрлиц — полный пакет документов: договор, акты, чеки, лист осмотра с фотофиксацией.",
  },
  {
    q: "Можно ли получить чек?",
    a: "Работаю официально как самозанятый (ИНН 661914015077). Чек и договор — по запросу.",
  },
  {
    q: "В какие дни работаете?",
    a: "Соблюдаю закон о тишине. Работаю в будни и выходные по согласованию — звоните, договоримся.",
  },
  {
    q: "Убираете за собой?",
    a: "Да, всегда. Весь мусор складываю в оговорённое место. Уходя — оставляю чистоту.",
  },
];

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-[#141414]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-amber-400" />
            <span className="text-amber-400 text-xs uppercase tracking-[0.3em]">Частые вопросы</span>
          </div>
          <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-4xl md:text-5xl font-bold uppercase tracking-tight">FAQ</h2>
        </div>
        <div>
          {FAQ.map((item, i) => (
            <div key={i} className="border-b border-white/10">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <span style={{ fontFamily: "'Oswald', sans-serif" }} className="text-base uppercase tracking-wide group-hover:text-amber-400 transition-colors pr-4">
                  {item.q}
                </span>
                <Icon
                  name={openFaq === i ? "Minus" : "Plus"}
                  size={18}
                  className="text-amber-400 shrink-0"
                />
              </button>
              {openFaq === i && (
                <div className="pb-5">
                  <p className="text-white/55 font-light text-sm leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
