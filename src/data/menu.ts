export type Dish = {
  name: string
  description: string
  price: string
  tags?: string[]
}

export type MenuCategory = {
  id: string
  label: string
  greek: string
  dishes: Dish[]
}

/**
 * Speisekarte — Platzhalter-Inhalte (später durch echte Karte ersetzen).
 * Preise in Euro.
 */
export const menu: MenuCategory[] = [
  {
    id: 'vorspeisen',
    label: 'Vorspeisen',
    greek: 'Ὀρεκτικά',
    dishes: [
      {
        name: 'Tzatziki',
        description: 'Cremiger griechischer Joghurt mit Gurke, Knoblauch und nativem Olivenöl.',
        price: '6,50',
        tags: ['vegetarisch'],
      },
      {
        name: 'Dolmades',
        description: 'In Weinblätter gewickelter Reis mit Kräutern, dazu Zitrone.',
        price: '7,80',
        tags: ['vegan'],
      },
      {
        name: 'Saganaki',
        description: 'In der Pfanne gebratener Graviera-Käse mit Honig und Sesam.',
        price: '8,90',
        tags: ['vegetarisch'],
      },
      {
        name: 'Gigantes Plaki',
        description: 'Geschmorte Riesenbohnen in würziger Tomatensauce aus dem Ofen.',
        price: '7,20',
        tags: ['vegan'],
      },
      {
        name: 'Taramosalata',
        description: 'Feine Creme aus Fischrogen, mild abgeschmeckt, mit Pita.',
        price: '6,90',
      },
    ],
  },
  {
    id: 'meze',
    label: 'Meze',
    greek: 'Μεζέδες',
    dishes: [
      {
        name: 'Meze-Platte Greco',
        description: 'Auswahl unserer Klassiker zum Teilen — für zwei Personen.',
        price: '24,50',
        tags: ['für 2'],
      },
      {
        name: 'Oliven & Feta',
        description: 'Kalamata-Oliven und Feta P.D.O. mit Oregano und Olivenöl.',
        price: '6,40',
        tags: ['vegetarisch'],
      },
      {
        name: 'Keftedakia',
        description: 'Kleine Hackbällchen nach Hausrezept mit Minze und Kreuzkümmel.',
        price: '8,60',
      },
      {
        name: 'Htipiti',
        description: 'Pikante Creme aus Feta und gerösteter Paprika.',
        price: '6,80',
        tags: ['vegetarisch'],
      },
      {
        name: 'Gegrillter Oktopus',
        description: 'Zarter Oktopus vom Grill mit Kapern und Zitronenöl.',
        price: '13,90',
      },
    ],
  },
  {
    id: 'hauptgerichte',
    label: 'Hauptgerichte',
    greek: 'Κυρίως Πιάτα',
    dishes: [
      {
        name: 'Moussaka',
        description: 'Schichten aus Auberginen, Kartoffeln und Hackfleisch mit Béchamel.',
        price: '16,90',
      },
      {
        name: 'Pastitsio',
        description: 'Griechischer Nudelauflauf mit Hackfleisch und cremiger Béchamel.',
        price: '15,80',
      },
      {
        name: 'Gemista',
        description: 'Mit Reis und Kräutern gefüllte Tomaten und Paprika aus dem Ofen.',
        price: '14,50',
        tags: ['vegan'],
      },
      {
        name: 'Kleftiko',
        description: 'Langsam geschmortes Lamm mit Knoblauch, Zitrone und Bergkräutern.',
        price: '21,90',
      },
    ],
  },
  {
    id: 'grill',
    label: 'Vom Grill',
    greek: 'Ἀπὸ τὴ Σχάρα',
    dishes: [
      {
        name: 'Souvlaki vom Schwein',
        description: 'Marinierte Spieße vom Holzkohlegrill mit Pita und Tzatziki.',
        price: '15,90',
      },
      {
        name: 'Bifteki',
        description: 'Gefüllte Hacksteaks mit Feta, dazu Ofenkartoffeln.',
        price: '16,40',
      },
      {
        name: 'Lammkoteletts',
        description: 'Vier Koteletts vom Grill mit Rosmarin und Zitrone.',
        price: '23,50',
      },
      {
        name: 'Gyros-Teller',
        description: 'Klassisches Gyros mit Pommes, Pita, Zwiebeln und Tzatziki.',
        price: '14,90',
      },
    ],
  },
  {
    id: 'fisch',
    label: 'Fisch',
    greek: 'Ψάρια',
    dishes: [
      {
        name: 'Gegrillte Dorade',
        description: 'Ganze Dorade vom Grill mit Olivenöl, Zitrone und Kräutern.',
        price: '22,90',
      },
      {
        name: 'Garides Saganaki',
        description: 'Garnelen in Tomaten-Feta-Sauce, im Tontopf serviert.',
        price: '18,50',
      },
      {
        name: 'Kalamari',
        description: 'Zarte Tintenfischringe, knusprig gebacken, mit Zitrone.',
        price: '15,90',
      },
      {
        name: 'Bakaliaros',
        description: 'Gebackener Kabeljau mit Knoblauchcreme Skordalia.',
        price: '17,40',
      },
    ],
  },
  {
    id: 'desserts',
    label: 'Desserts',
    greek: 'Γλυκά',
    dishes: [
      {
        name: 'Baklava',
        description: 'Blätterteig mit Walnüssen und Honigsirup.',
        price: '6,50',
        tags: ['vegetarisch'],
      },
      {
        name: 'Galaktoboureko',
        description: 'Grießcreme im knusprigen Filoteig mit Zitronensirup.',
        price: '6,80',
        tags: ['vegetarisch'],
      },
      {
        name: 'Griechischer Joghurt',
        description: 'Mit Thymianhonig und gerösteten Walnüssen.',
        price: '5,90',
        tags: ['vegetarisch'],
      },
      {
        name: 'Loukoumades',
        description: 'Warme Honigbällchen mit Zimt und Sesam.',
        price: '6,40',
        tags: ['vegetarisch'],
      },
    ],
  },
  {
    id: 'getraenke',
    label: 'Getränke',
    greek: 'Ποτά',
    dishes: [
      {
        name: 'Hauswein (0,2 l)',
        description: 'Rot, weiß oder rosé — offener Wein aus griechischen Reben.',
        price: '5,50',
      },
      {
        name: 'Ouzo (2 cl)',
        description: 'Klassischer Anis-Aperitif, eiskalt serviert.',
        price: '3,80',
      },
      {
        name: 'Mythos Bier (0,33 l)',
        description: 'Griechisches Lagerbier, frisch gezapft.',
        price: '4,20',
      },
      {
        name: 'Griechischer Mokka',
        description: 'Traditionell im Briki zubereitet.',
        price: '3,20',
      },
      {
        name: 'Frappé',
        description: 'Geschäumter Eiskaffee — der Sommerklassiker.',
        price: '3,90',
      },
    ],
  },
]

export const CONTACT = {
  name: 'Café Greco',
  street: 'Sachsentor 1',
  city: '21029 Hamburg-Bergedorf',
  phone: '+49 40 123 456 78',
  phoneHref: '+494012345678',
  email: 'reservierung@cafe-greco.de',
  hours: [
    { day: 'Montag', time: 'Ruhetag' },
    { day: 'Dienstag – Freitag', time: '12:00 – 23:00' },
    { day: 'Samstag', time: '12:00 – 24:00' },
    { day: 'Sonntag & Feiertage', time: '12:00 – 22:00' },
  ],
} as const

/**
 * Galerie — kuratierte Auswahl (Unsplash). Bewusst wenige, starke Bilder,
 * die im Komponenten-Layout zu einem organischen, gebrochenen Raster
 * angeordnet werden. Später durch echte Fotos ersetzen.
 */
export const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=1050&fit=crop&q=80',
    name: 'Schára',
    de: 'Vom Holzkohlegrill',
    alt: 'Gegrilltes Fleisch und Meze',
  },
  {
    src: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&h=1050&fit=crop&q=80',
    name: 'Mezédes',
    de: 'Vorspeisen zum Teilen',
    alt: 'Griechische Vorspeisen',
  },
  {
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=1050&fit=crop&q=80',
    name: 'Tavérna',
    de: 'Unser Ambiente',
    alt: 'Stimmungsvolles Interieur',
  },
  {
    src: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&h=1050&fit=crop&q=80',
    name: 'Eliá',
    de: 'Olivenöl & Oliven',
    alt: 'Olivenöl und Oliven',
  },
  {
    src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=1050&fit=crop&q=80',
    name: 'Psári',
    de: 'Fisch & Meeresfrüchte',
    alt: 'Gegrillter Fisch',
  },
  {
    src: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&h=1050&fit=crop&q=80',
    name: 'Glyká',
    de: 'Süße Verführungen',
    alt: 'Dessert mit Honig',
  },
]

/** Spezialitäten des Hauses — Highlights mit Bild. */
export const highlights = [
  {
    name: 'Kleftiko',
    greek: 'Κλέφτικο',
    tagline: 'Langsam geschmort',
    story: 'Einst von Hirten im verschlossenen Erdofen verborgen — daher der Name „der Dieb“.',
    description:
      'Über Stunden geschmortes Lamm mit Knoblauch, Zitrone und Bergkräutern — zart bis aufs Bein.',
    img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1000&q=80',
    accent: '#ecd2ab', // warm clay
    glow: '#c2702f', // copper spotlight
  },
  {
    name: 'Gegrillter Oktopus',
    greek: 'Χταπόδι',
    tagline: 'Über offener Flamme',
    story: 'Am Hafen im Wind getrocknet, dann über Holzkohle zu rauchiger Zartheit gegrillt.',
    description:
      'Über Holzkohle gegrillt, mit Kapern, Oregano und einem Spritzer Zitronenöl.',
    img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1000&q=80',
    accent: '#ded8b6', // soft olive
    glow: '#7e8a3f', // olive spotlight
  },
  {
    name: 'Baklava',
    greek: 'Μπακλαβάς',
    tagline: 'Hausrezept seit 1987',
    story: 'Zweiunddreißig hauchdünne Teigblätter, von Hand geschichtet und in Thymianhonig getränkt.',
    description:
      'Hauchdünner Filoteig, Walnüsse und Thymianhonig — unser süßer Abschluss seit 1987.',
    img: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=1000&q=80',
    accent: '#f1dca6', // honey gold
    glow: '#d8a526', // honey spotlight
  },
] as const

/** Gästestimmen. */
export const testimonials = [
  {
    quote:
      'Wie ein Kurzurlaub in Griechenland — herzlicher Service und Gerichte, die nach Sommer schmecken.',
    author: 'Marlene K.',
    source: 'Google · ★★★★★',
  },
  {
    quote:
      'Das beste Kleftiko außerhalb Kretas. Wir kommen seit Jahren und werden immer wie Familie empfangen.',
    author: 'Dimitri & Sven',
    source: 'Stammgäste',
  },
  {
    quote:
      'Stimmungsvolles Ambiente, fantastische Meze-Platte und ein Ouzo aufs Haus. Absolute Empfehlung!',
    author: 'Familie Brandt',
    source: 'Google · ★★★★★',
  },
] as const
