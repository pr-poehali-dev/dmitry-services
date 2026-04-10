import { useState } from "react";
import Icon from "@/components/ui/icon";
import Navbar from "@/components/Navbar";
import OrderForm from "@/components/OrderForm";
import PricesSection from "@/components/PricesSection";
import FaqSection from "@/components/FaqSection";

const PAINT_IMG = "https://cdn.poehali.dev/projects/467970cf-6c76-4072-a907-c0e8abb07a3b/files/efe4d559-d6c3-40d2-bfb4-e5bb1eaa9c23.jpg";
const BYTOVKA_IMG = "https://cdn.poehali.dev/projects/467970cf-6c76-4072-a907-c0e8abb07a3b/bucket/57f8369a-1eff-47e2-bb04-620a8c7553e4.png";
const DEMO_BEFORE_IMG = "https://cdn.poehali.dev/projects/467970cf-6c76-4072-a907-c0e8abb07a3b/bucket/0decc7d1-26f1-4681-869e-81e50b84d16f.png";
const DEMO_WORK1_IMG = "https://cdn.poehali.dev/projects/467970cf-6c76-4072-a907-c0e8abb07a3b/bucket/736f0c9b-3e59-4e5e-8676-e39b4150f956.jpg";
const DEMO_WORK2_IMG = "https://cdn.poehali.dev/projects/467970cf-6c76-4072-a907-c0e8abb07a3b/bucket/67ce76e2-95fd-45bf-ab03-60af1287ae8d.jpg";
const DEMO_WORK3_IMG = "https://cdn.poehali.dev/projects/467970cf-6c76-4072-a907-c0e8abb07a3b/bucket/a8216a42-ab33-4e6c-94ee-6a10610bbd80.jpg";

const SERVICES = [
  {
    icon: "Paintbrush",
    title: "Покраска краскопультом",
    desc: "Безвоздушный и пневматический краскопульт. Полный цикл: подготовка, грунт, 2–3 слоя. Скорость в 5–10 раз выше, чем кистью.",
    items: ["Скамейки, урны, качели", "Заборы, ворота, навесы", "Беседки, веранды, бытовки", "Детские и спортивные площадки"],
  },
  {
    icon: "Scissors",
    title: "Покос и порядок",
    desc: "Кошу травой триммером ровно, без проплешин. Убираю поросль, кустарник. Спиливаю небольшие деревья.",
    items: ["Двор, участок, сад", "Запущенные заросли", "Территории УК и ТСЖ", "Сбор и складирование скошенного"],
  },
  {
    icon: "Hammer",
    title: "Демонтаж и расчистка",
    desc: "Разбираю старые постройки, расчищаю участки под строительство. После пожара в бане — 3 дня, и чистота.",
    items: ["Старые и сгоревшие постройки", "Фундаменты и ограждения", "Теплицы и хозпостройки", "Подготовка под строительство"],
  },
];

const SAUNA_START_IMG = "https://cdn.poehali.dev/projects/467970cf-6c76-4072-a907-c0e8abb07a3b/bucket/bdc32bcb-405a-494f-bcf3-dae5187fb4c5.png";
const SAUNA_WALLS_IMG = "https://cdn.poehali.dev/projects/467970cf-6c76-4072-a907-c0e8abb07a3b/bucket/484071d7-bcd5-4e87-8e94-8d3ee6707562.png";
const SAUNA_ROOF_IMG = "https://cdn.poehali.dev/projects/467970cf-6c76-4072-a907-c0e8abb07a3b/bucket/0c4e0c16-f22e-4412-9957-ba5e95419a93.png";
const MOWING_IMG = "https://cdn.poehali.dev/projects/467970cf-6c76-4072-a907-c0e8abb07a3b/bucket/4581cdf5-1a33-48a6-84a3-b63b5a934d2f.png";
const MOWING2_IMG = "https://cdn.poehali.dev/projects/467970cf-6c76-4072-a907-c0e8abb07a3b/bucket/cb63b0b8-9dcf-4322-85f2-9724ab230938.png";
const MOWING3_IMG = "https://cdn.poehali.dev/projects/467970cf-6c76-4072-a907-c0e8abb07a3b/bucket/b9214817-e15f-46bb-a8e6-e35e5252cb53.png";

const PORTFOLIO_CATS = [
  {
    id: "all",
    label: "Все работы",
    items: [
      { img: MOWING_IMG, title: "Покос травы — 2025", desc: "Убираем заросли триммером. Быстро, аккуратно, без проплешин.", tag: "2025" },
      { img: BYTOVKA_IMG, title: "Покраска бытовки", desc: "Полный цикл: очистка, грунт, покраска. Итог — как новая.", tag: "2025" },
      { img: DEMO_BEFORE_IMG, title: "До демонтажа", desc: "Сгоревшая баня — брёвна, гарь, мусор. Так это выглядело в начале.", tag: "2025" },
      { img: MOWING2_IMG, title: "Покос двора — 2025", desc: "Облагородили двор жилого дома. Триммер, уборка, порядок.", tag: "2025" },
      { img: SAUNA_START_IMG, title: "Постройка бани — начало", desc: "Подготовка брёвен и закладка первых венцов.", tag: "2025" },
      { img: DEMO_WORK1_IMG, title: "В процессе расчистки", desc: "Очистили площадку от золы, гвоздей и остатков конструкций.", tag: "2025" },
    ],
  },
  {
    id: "paint",
    label: "Покраска",
    items: [
      { img: BYTOVKA_IMG, title: "Покраска бытовки", desc: "Полный цикл: очистка, грунт, покраска. Итог — как новая.", tag: "2025" },
    ],
  },
  {
    id: "mow",
    label: "Покос",
    items: [
      { img: MOWING_IMG, title: "Покос травы — 2025", desc: "Убираем заросли триммером. Быстро, аккуратно, без проплешин.", tag: "2025" },
      { img: MOWING2_IMG, title: "Покос двора — 2025", desc: "Облагородили двор жилого дома. Триммер, уборка, порядок.", tag: "2025" },
      { img: MOWING3_IMG, title: "Расчистка участка — 2025", desc: "Заросший участок под дачу. До и после — небо и земля.", tag: "2025" },
    ],
  },
  {
    id: "demo",
    label: "Демонтаж",
    items: [
      { img: DEMO_BEFORE_IMG, title: "До демонтажа", desc: "Сгоревшая баня — брёвна, гарь, мусор. Так это выглядело в начале.", tag: "2025" },
      { img: DEMO_WORK1_IMG, title: "В процессе расчистки", desc: "Очистили площадку от золы, гвоздей и остатков конструкций.", tag: "2025" },
      { img: DEMO_WORK2_IMG, title: "Демонтаж конструкций", desc: "Разбор перекрытий и стен. Сортировка и складирование.", tag: "2025" },
      { img: DEMO_WORK3_IMG, title: "Команда на объекте", desc: "Работаем быстро и аккуратно. Три дня — и площадка чистая.", tag: "2025" },
    ],
  },
  {
    id: "build",
    label: "Строительство",
    items: [
      { img: SAUNA_START_IMG, title: "Постройка бани — начало", desc: "Подготовка брёвен и закладка первых венцов. Июль 2025.", tag: "2025" },
      { img: SAUNA_WALLS_IMG, title: "Постройка бани — стены", desc: "Сруб растёт — венцы уложены, углы подогнаны.", tag: "2025" },
      { img: SAUNA_ROOF_IMG, title: "Постройка бани — крыша", desc: "Стропила, обрешётка, кровля. Баня уже под крышей.", tag: "2025" },
    ],
  },
];

const REVIEWS = [
  {
    name: "Алексей К.",
    text: "Покрасил весь забор и ворота — 120 метров. Быстро, аккуратно, никаких подтёков. Убрал за собой весь мусор. Рекомендую!",
    stars: 5,
  },
  {
    name: "Марина Р.",
    text: "Попросила покосить запущенный участок. Пришёл в срок, всё аккуратно сложил. Цена честная, без сюрпризов после работы.",
    stars: 5,
  },
  {
    name: "ТСЖ «Уют»",
    text: "Заказывали покраску детской площадки. Работает официально, предоставил все документы. Качество отличное — уже второй год держится.",
    stars: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Icon key={i} name="Star" size={14} className="text-amber-400 fill-amber-400" />
      ))}
    </div>
  );
}

export default function Index() {
  const [activeTab, setActiveTab] = useState("all");
  const activeCat = PORTFOLIO_CATS.find(c => c.id === activeTab) || PORTFOLIO_CATS[0];

  return (
    <div className="bg-[#0f0f0f] text-white min-h-screen" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>

      <Navbar />

      {/* HERO */}
      <section className="pt-16 min-h-screen flex items-center relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${PAINT_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/80 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 py-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-0.5 bg-amber-400" />
              <span className="text-amber-400 text-sm uppercase tracking-[0.3em]">Первоуральск</span>
            </div>
            <h1 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-5xl md:text-7xl font-bold uppercase leading-none mb-4 tracking-tight">
              Покраска.<br />
              <span className="text-amber-400">Покос.</span><br />
              Демонтаж.
            </h1>
            <p className="text-white/60 text-lg font-light leading-relaxed mb-8 max-w-xl">
              Работаю официально — самозанятый, с договором и чеком. Цену называю после бесплатного осмотра. Убираю за собой, соблюдаю сроки.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              {["Самозанятый", "Договор и чек", "Бесплатный осмотр", "Для юрлиц"].map((tag) => (
                <span key={tag} className="border border-white/20 text-white/50 text-xs px-3 py-1.5 uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contacts"
                className="bg-amber-400 text-black font-semibold px-8 py-3.5 uppercase tracking-widest hover:bg-amber-300 transition-colors text-sm"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Оставить заявку
              </a>
              <a
                href="#prices"
                className="border border-white/30 text-white font-semibold px-8 py-3.5 uppercase tracking-widest hover:border-amber-400 hover:text-amber-400 transition-colors text-sm"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Смотреть цены
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-[#141414]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-0.5 bg-amber-400" />
              <span className="text-amber-400 text-xs uppercase tracking-[0.3em]">Что делаю</span>
            </div>
            <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-4xl md:text-5xl font-bold uppercase tracking-tight">Услуги</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <div key={s.title} className="border border-white/10 p-8 hover:border-amber-400/40 transition-colors group">
                <div className="w-12 h-12 border border-amber-400/40 flex items-center justify-center mb-6 group-hover:bg-amber-400/10 transition-colors">
                  <Icon name={s.icon} fallback="Paintbrush" size={22} className="text-amber-400" />
                </div>
                <h3 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-xl font-semibold uppercase tracking-wide mb-3">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-5 font-light">{s.desc}</p>
                <ul className="space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/60">
                      <span className="text-amber-400 mt-0.5 shrink-0">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-0.5 bg-amber-400" />
              <span className="text-amber-400 text-xs uppercase tracking-[0.3em]">Примеры работ</span>
            </div>
            <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-4xl md:text-5xl font-bold uppercase tracking-tight">Портфолио</h2>
          </div>
          {/* Вкладки-категории */}
          <div className="flex flex-wrap gap-2 mb-8">
            {PORTFOLIO_CATS.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-5 py-2 text-xs uppercase tracking-widest border transition-colors ${activeTab === cat.id ? "bg-amber-400 text-black border-amber-400 font-bold" : "border-white/20 text-white/50 hover:border-amber-400 hover:text-amber-400"}`}
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {activeCat.items.map((p) => (
              <div key={p.title} className="group overflow-hidden">
                <div className="relative overflow-hidden aspect-[4/3] mb-3">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                  {p.tag && (
                    <span className="absolute top-2 left-2 bg-amber-400 text-black text-[10px] font-bold uppercase px-2 py-0.5 tracking-widest">
                      {p.tag}
                    </span>
                  )}
                </div>
                <h3 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-sm md:text-base font-semibold uppercase tracking-wide mb-1">{p.title}</h3>
                <p className="text-white/50 text-xs md:text-sm font-light">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href="https://vk.com/club234852553"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/20 text-white/60 uppercase tracking-widest text-sm px-6 py-3 hover:border-amber-400 hover:text-amber-400 transition-colors"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              <Icon name="ExternalLink" size={14} />
              Больше работ ВКонтакте
            </a>
          </div>
        </div>
      </section>

      <PricesSection />

      {/* REVIEWS */}
      <section id="reviews" className="py-24 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-0.5 bg-amber-400" />
              <span className="text-amber-400 text-xs uppercase tracking-[0.3em]">Что говорят клиенты</span>
            </div>
            <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-4xl md:text-5xl font-bold uppercase tracking-tight">Отзывы</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div key={r.name} className="border border-white/10 p-8">
                <StarRating count={r.stars} />
                <p className="text-white/60 text-sm font-light leading-relaxed mt-4 mb-6">«{r.text}»</p>
                <span style={{ fontFamily: "'Oswald', sans-serif" }} className="text-sm uppercase tracking-wider text-white/40">{r.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqSection />

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-0.5 bg-amber-400" />
              <span className="text-amber-400 text-xs uppercase tracking-[0.3em]">Связаться</span>
            </div>
            <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-4xl md:text-5xl font-bold uppercase tracking-tight">Контакты</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Телефон</p>
                <a href="tel:89935039859" style={{ fontFamily: "'Oswald', sans-serif" }} className="text-3xl font-semibold hover:text-amber-400 transition-colors">
                  8 (993) 503-98-59
                </a>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Город</p>
                <p style={{ fontFamily: "'Oswald', sans-serif" }} className="text-xl">Первоуральск</p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Статус</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <p className="text-white/70 text-sm">Самозанятый · ИНН 661914015077</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://vk.com/club234852553"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-white/20 text-white/60 text-sm px-4 py-2.5 hover:border-amber-400 hover:text-amber-400 transition-colors"
                >
                  <Icon name="Users" size={14} />
                  ВКонтакте
                </a>
                <a
                  href="https://max.ru/join/dfe20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-white/20 text-white/60 text-sm px-4 py-2.5 hover:border-amber-400 hover:text-amber-400 transition-colors"
                >
                  <Icon name="ExternalLink" size={14} />
                  МАХ-группа
                </a>
              </div>
            </div>

            <div className="border border-white/10 p-8">
              <h3 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-lg uppercase tracking-widest mb-6 text-amber-400">Почему ко мне обращаются</h3>
              <ul className="space-y-4">
                {[
                  { icon: "FileCheck", text: "Работаю официально — договор, чек, документы" },
                  { icon: "Search", text: "Бесплатный осмотр и честная цена" },
                  { icon: "Clock", text: "Соблюдаю сроки и закон о тишине" },
                  { icon: "Trash2", text: "Убираю за собой — всё аккуратно" },
                  { icon: "MessageCircle", text: "Скажу честно, что можно сделать, а что нет" },
                ].map((item) => (
                  <li key={item.text} className="flex items-start gap-3">
                    <div className="w-6 h-6 shrink-0 flex items-center justify-center">
                      <Icon name={item.icon} fallback="Check" size={14} className="text-amber-400" />
                    </div>
                    <span className="text-white/60 text-sm font-light leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DOCUMENTS */}
      <section id="documents" className="py-24 bg-[#141414]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-0.5 bg-amber-400" />
              <span className="text-amber-400 text-xs uppercase tracking-[0.3em]">Прозрачность и доверие</span>
            </div>
            <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-4xl md:text-5xl font-bold uppercase tracking-tight">Документы</h2>
            <p className="text-white/40 text-sm mt-2">Работаю официально. Все документы — по запросу или в сообществе ВКонтакте</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-white/10 p-6 hover:border-amber-400/30 transition-colors">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 border border-amber-400/40 flex items-center justify-center shrink-0">
                  <Icon name="FileCheck" size={18} className="text-amber-400" />
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-base uppercase tracking-wide mb-1">Справка о самозанятости</h3>
                  <p className="text-white/40 text-sm">ФНС России · ИНН 661914015077 · актуальная</p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-sm group cursor-pointer">
                <img
                  src="https://cdn.poehali.dev/projects/467970cf-6c76-4072-a907-c0e8abb07a3b/bucket/57f8369a-1eff-47e2-bb04-620a8c7553e4.png"
                  alt="Справка самозанятого"
                  className="w-full opacity-60 group-hover:opacity-80 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                  <a
                    href="https://cdn.poehali.dev/projects/467970cf-6c76-4072-a907-c0e8abb07a3b/bucket/57f8369a-1eff-47e2-bb04-620a8c7553e4.png"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-amber-400 text-black font-semibold px-5 py-2.5 text-sm uppercase tracking-widest hover:bg-amber-300 transition-colors"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    <Icon name="ZoomIn" size={14} />
                    Открыть
                  </a>
                </div>
              </div>
            </div>
            <div className="border border-white/10 p-6 hover:border-amber-400/30 transition-colors">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 border border-amber-400/40 flex items-center justify-center shrink-0">
                  <Icon name="ClipboardList" size={18} className="text-amber-400" />
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-base uppercase tracking-wide mb-1">Лист осмотра объекта</h3>
                  <p className="text-white/40 text-sm">Заполняется на бесплатном выезде · 2026</p>
                </div>
              </div>
              <div className="border border-white/10 bg-[#0f0f0f] p-5 text-sm space-y-3">
                {[
                  "Дата и адрес объекта",
                  "Виды работ с отметками (покраска, антисептик, грунт и др.)",
                  "Характеристики: площадь, высота, материал, состояние стен",
                  "Материалы: что использует мастер / заказчик",
                  "Смета по видам работ",
                  "Сроки, гарантия 12 месяцев",
                  "Подписи мастера и заказчика",
                ].map((line, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-amber-400 shrink-0 mt-0.5">—</span>
                    <span className="text-white/50">{line}</span>
                  </div>
                ))}
                <div className="pt-3 border-t border-white/10">
                  <a
                    href="tel:89935039859"
                    className="inline-flex items-center gap-2 text-amber-400 text-sm hover:text-amber-300 transition-colors"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    <Icon name="Phone" size={13} />
                    Получить при выезде на осмотр
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ORDER FORM */}
      <section id="order" className="py-24 bg-[#0f0f0f]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-0.5 bg-amber-400" />
              <span className="text-amber-400 text-xs uppercase tracking-[0.3em]">Бесплатно</span>
            </div>
            <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-4xl md:text-5xl font-bold uppercase tracking-tight">Оставить заявку</h2>
            <p className="text-white/40 text-sm mt-2">Свяжусь в течение часа. Приеду на осмотр — и назову точную цену.</p>
          </div>
          <OrderForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <span style={{ fontFamily: "'Oswald', sans-serif" }} className="text-white/30 text-sm uppercase tracking-widest">
            Дмитрий Голубничий · Первоуральск
          </span>
          <span className="text-white/20 text-xs">
            Самозанятый · ИНН 661914015077 · 2026
          </span>
        </div>
      </footer>

      {/* FLOAT CALL BUTTON (mobile) */}
      <a
        href="tel:89935039859"
        className="fixed bottom-6 right-6 z-40 bg-amber-400 text-black w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-amber-300 transition-colors md:hidden"
      >
        <Icon name="Phone" size={22} />
      </a>
    </div>
  );
}