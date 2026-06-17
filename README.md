# Café Greco — Website

Website für das griechische Restaurant **Café Greco** in Hamburg-Bergedorf.
Thema: **neo-antik / griechisch-römisch** mit Retro-/Vintage-Ästhetik.

## Tech-Stack

- **React + TypeScript + Vite**
- **Tailwind CSS v4** (`@theme`-Tokens)
- **Framer Motion** — Scroll-Animationen
- **lucide-react** — Icons

## Design

Erstellt mit dem `ui-ux-pro-max`- und `ui-styling`-Skill.

- **Stil:** Vintage Analog / Retro Film (Filmkorn-Overlay, warme Töne)
- **Palette:** direkt aus dem Hero-Artwork extrahiert — Ägäisblau `#253948`,
  Terrakotta `#A66A3D`, Gold `#C9A94A`, Creme `#E1C599`, Pergament `#F2E7CE`
- **Typografie:** Abril Fatface (Display) · Playfair Display SC (Headings) ·
  Cormorant Garamond (Script) · Merriweather (Body)

## Besonderheit: Hero mit Scroll-Scrubbing

Die Hero-Sektion (`src/components/sections/HeroScrubVideo.tsx`) bindet die
`currentTime` des Videos an den Scroll-Fortschritt: Beim Scrollen wird die
animierte Bankett-Szene Bild für Bild vor- bzw. zurückgespult. Ein
requestAnimationFrame-Lerp sorgt für butterweiches Seeking.
`prefers-reduced-motion` → Video läuft einfach in Schleife.

Das Video wurde für flüssiges Scrubbing neu kodiert (Keyframe pro Frame,
`-g 1`): `public/hero-greco.mp4`.

## Struktur

```
src/
├── components/
│   ├── layout/      Navbar, Footer
│   ├── sections/    HeroScrubVideo, About, Menu, Gallery, Reservation, Location
│   └── ui/          GreekMeander, Laurel, Column, SectionTitle,
│                    AnimatedSection, GrainOverlay, SocialIcons
├── data/menu.ts     Speisekarte (DE), Kontaktdaten, Galerie-Bilder
└── App.tsx
```

## Entwicklung

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # Production-Build nach dist/
npm run lint
```

## Noch zu tun

- Echte Fotos statt Unsplash-Platzhalter (`src/data/menu.ts`)
- Reservierungsformular an Backend/E-Mail anbinden (aktuell nur `console.log`)
- Echte Kontaktdaten, Impressum & Datenschutz ergänzen
