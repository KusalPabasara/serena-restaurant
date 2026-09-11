import { Link } from 'react-router-dom'
import { DishCard } from '../components/DishCard'
import { GoldRuleDraw, Reveal } from '../components/Reveal'
import { SpotlightHero } from '../components/SpotlightHero'
import { menu, restaurant } from '../data/menu'

const values = [
  {
    title: 'Taste',
    body: 'Island seasons on the plate — Nuwara Eliya greens, Dambulla harvests, and coastal catch that arrives the same day.',
  },
  {
    title: 'Calm',
    body: 'Unhurried service, soft linen, and rooms designed for conversation. Serenā is a pause from the city.',
  },
  {
    title: 'Hygiene',
    body: 'An open kitchen you can see, spotless stations, and ingredients handled with quiet, exacting care.',
  },
]

const gallery = [
  { src: '/images/open-kitchen.webp', alt: 'Open kitchen at Serenā' },
  { src: '/images/produce-still.webp', alt: 'Fresh island produce' },
  { src: '/images/table-setting.webp', alt: 'Table setting detail' },
  { src: '/images/exterior-dusk.webp', alt: 'Serenā exterior at dusk' },
]

export function Home() {
  const featured = menu.filter((d) => d.featured).slice(0, 4)

  return (
    <div>
      <SpotlightHero />

      <section className="bg-cream px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {values.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="rounded-[1.25rem] border border-linen bg-white/70 p-7 shadow-[0_12px_40px_rgba(28,36,30,0.04)]">
                <p className="section-label mb-3">{`0${i + 1}`}</p>
                <h2 className="font-serif text-3xl text-forest">{item.title}</h2>
                <GoldRuleDraw className="my-4" />
                <p className="text-sm leading-relaxed text-ink/70">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-linen/50 px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <Reveal parallax>
            <img
              src="/images/produce-still.webp"
              alt="Farm produce for Serenā"
              className="w-full rounded-[1.5rem] object-cover shadow-[0_18px_50px_rgba(28,36,30,0.08)]"
            />
          </Reveal>
          <Reveal delay={0.1} parallax>
            <p className="section-label mb-3">Our origin</p>
            <h2 className="font-serif text-4xl text-forest md:text-5xl">
              From island soil to Horton Place
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink/75">
              Serenā sits in the quiet of Cinnamon Gardens. We cook with produce from
              Nuwara Eliya and Dambulla, seafood landed the same morning, and spices
              that still smell of the gardens they grew in. The kitchen is open — so
              calm and hygiene are not promises; they are visible.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink/75">
              Every service is paced like a meal should be: unhurried, precise, and
              generous with space to breathe.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream px-5 py-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="section-label mb-3">Signatures</p>
              <h2 className="font-serif text-4xl text-forest md:text-5xl">
                Plates that tell the season
              </h2>
            </div>
            <Link to="/foods" className="btn-secondary">
              Full menu
            </Link>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((dish, i) => (
              <Reveal key={dish.id} delay={i * 0.06}>
                <DishCard dish={dish} compact />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest px-5 py-20 text-cream md:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-10 text-center">
            <p className="section-label mb-3 text-gold">Atmosphere</p>
            <h2 className="font-serif text-4xl md:text-5xl">Rooms of light and linen</h2>
            <GoldRuleDraw className="mx-auto mt-5 max-w-xs" />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {gallery.map((item, i) => (
              <Reveal key={item.src} delay={i * 0.05} parallax>
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-[1.25rem] object-cover"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-5 py-20 md:px-8">
        <Reveal className="mx-auto max-w-3xl rounded-[1.5rem] border border-linen bg-white px-8 py-12 text-center shadow-[0_18px_50px_rgba(28,36,30,0.06)]">
          <p className="section-label mb-3">Visit us</p>
          <h2 className="font-serif text-4xl text-forest">A table waiting in Colombo 07</h2>
          <p className="mt-4 text-ink/70">{restaurant.address}</p>
          <p className="mt-2 text-sm text-leaf">
            Lunch Fri–Sun · Dinner Tue–Sun · Closed Monday
          </p>
          <Link to="/contact" className="btn-primary mt-8">
            Reserve your evening
          </Link>
        </Reveal>
      </section>
    </div>
  )
}
