export interface Credit {
  label: string;
  value: string;
}

export interface ImageRun {
  kind: "full" | "pair" | "grid";
  images: { src: string; alt: string; ratio?: string }[];
}

export interface Project {
  slug: string;
  name: string;
  subtitle: string;
  category: string;
  hero: string;
  credits: Credit[];
  overview: string;
  details: string;
  runs: ImageRun[];
}

export const projects: Project[] = [
  {
    slug: "muehlenberg-bad",
    name: "Mühlenberg Bad",
    subtitle: "Master Bad, Gäste WC, Walk-in Dusche",
    category: "Badezimmer",
    hero: "/images/proj-01.jpg",
    credits: [
      { label: "Architekt", value: "Studio Werkraum" },
      { label: "Innenarchitektur", value: "Lina Brandt" },
      { label: "Lieferant", value: "Bisazza, Mosa" },
      { label: "Fotografie", value: "Jonas Reichert" },
    ],
    overview:
      "Das Mühlenberg-Bad in einer Hamburger Stadtvilla markierte einen prägenden Moment für Seehafer Elemente. In enger Zusammenarbeit mit dem Studio Werkraum entstand ein zurückhaltend modernes Bad, das den Charakter des denkmalgeschützten Hauses fortschreibt — mit feinem Detail, ruhiger Materialität und Handwerk, das mittlerweile zur Handschrift von Seehafer geworden ist.",
    details:
      "Eine raffinierte Palette aus mattem Naturstein, Wandfliesen mit Bruchkante und Terrazzo trifft auf Eichenholz und gebürstetes Messing. Im Master-Bad verläuft die zarte Steinpalette über zwei Wände und endet an einer Bank aus massivem Travertin. Sorgfältig verstemmte Fugen und großzügige Felder vermeiden Hektik — das Ergebnis ist eine Sammlung kompakter, zeitloser Räume.",
    runs: [
      { kind: "full",  images: [{ src: "/images/proj-01.jpg", alt: "Mühlenberg Bad — Übersicht" }] },
      { kind: "pair",  images: [{ src: "/images/proj-02.jpg", alt: "Detail Wand" }, { src: "/images/proj-03.jpg", alt: "Detail Becken" }] },
      { kind: "full",  images: [{ src: "/images/proj-04.jpg", alt: "Dusche im Tageslicht" }] },
    ],
  },
  {
    slug: "seestrase-terrasse",
    name: "Seestraße Terrasse",
    subtitle: "Außenbelag, Pool-Umrandung, Treppenanlage",
    category: "Außenbereich",
    hero: "/images/proj-02.jpg",
    credits: [
      { label: "Architekt", value: "Hafenbüro Architekten" },
      { label: "Garten", value: "Grünraum Nord" },
      { label: "Lieferant", value: "Stoneworks GmbH" },
      { label: "Fotografie", value: "Mira Lentz" },
    ],
    overview:
      "Eine offene Terrasse am Wasser, in der gespaltener Travertin und schmale Kalksteinbänder einen sanften Übergang vom Innenraum zur Uferkante zeichnen. Die Steinarbeit folgt der Bewegung des Lichts den Tag über und gibt dem Garten einen ruhigen Takt.",
    details:
      "Ein 30 mm starker, gebürsteter Travertin wurde im offenen Verband verlegt und an der Poolkante in eine flache Tropfkante gefräst. Die Stufenanlage kombiniert massive Blöcke mit fein gestockten Setzstufen. Drainagen sind unter den Fugen versteckt — die Fläche bleibt optisch ungestört.",
    runs: [
      { kind: "full",  images: [{ src: "/images/proj-02.jpg", alt: "Terrasse" }] },
      { kind: "pair",  images: [{ src: "/images/proj-04.jpg", alt: "Pool" }, { src: "/images/proj-06.jpg", alt: "Stufen" }] },
    ],
  },
  {
    slug: "bergkamp-bad",
    name: "Bergkamp Bad",
    subtitle: "Familienbad, Doppelwaschtisch, freistehende Wanne",
    category: "Badezimmer",
    hero: "/images/proj-03.jpg",
    credits: [
      { label: "Architekt", value: "Atelier Sieben" },
      { label: "Innenarchitektur", value: "Cathrin Voss" },
      { label: "Lieferant", value: "Mutina, Refin" },
      { label: "Fotografie", value: "Tobias Klee" },
    ],
    overview:
      "Ein zurückgenommenes Familienbad in einem Reihenhaus der Gründerzeit. Wandfliesen in zwei Höhen rhythmisieren den langen Raum, eine bodengleiche Dusche öffnet sich zur Fensterfront. Materialität und Maß folgen dem Bestand, ohne ihn zu zitieren.",
    details:
      "Steinzeug 6 × 24 cm in zwei warmen Grautönen, im Wechsel verlegt, mit silikonarmen Fugenflächen. Die freistehende Wanne wurde auf einem flachen Podest aus geschliffenem Estrich gestellt. Armaturen in PVD-Bronze, Spiegel mit hinterlüftetem Profil.",
    runs: [
      { kind: "full",  images: [{ src: "/images/proj-03.jpg", alt: "Bergkamp Bad" }] },
      { kind: "pair",  images: [{ src: "/images/proj-08.jpg", alt: "Dusche" }, { src: "/images/proj-01.jpg", alt: "Waschtisch" }] },
    ],
  },
  {
    slug: "seeblick-pool",
    name: "Seeblick Pool",
    subtitle: "Innen-Außen-Pool, Wellnessbereich, Sauna",
    category: "Pool",
    hero: "/images/proj-04.jpg",
    credits: [
      { label: "Architekt", value: "Marc Behrens" },
      { label: "Pool-Technik", value: "AquaForm" },
      { label: "Lieferant", value: "Granit & Stein" },
      { label: "Fotografie", value: "Nora Hahn" },
    ],
    overview:
      "Ein Pool, der drinnen beginnt und durch eine Glaswand nach draußen verläuft. Der Naturstein zieht über Beckenrand, Boden und Sitzbank — eine durchgehende Lesart, die das Wasser ruhig wirken lässt.",
    details:
      "Ein gespaltener und gebürsteter Quarzit mit zurückhaltender Ader führt von der Sauna bis zur Poolkante. Unter Wasser wurde das Material aus dem gleichen Block geschnitten und nass-poliert — kein Farbsprung beim Übergang.",
    runs: [
      { kind: "full",  images: [{ src: "/images/proj-04.jpg", alt: "Pool Innen" }] },
      { kind: "pair",  images: [{ src: "/images/proj-06.jpg", alt: "Sauna" }, { src: "/images/proj-02.jpg", alt: "Außenpool" }] },
    ],
  },
  {
    slug: "waldstrase-kueche",
    name: "Waldstraße Küche",
    subtitle: "Kochinsel, Steinrückwand, Speisekammer",
    category: "Küche",
    hero: "/images/proj-05.jpg",
    credits: [
      { label: "Architekt", value: "Hofmann + Maier" },
      { label: "Küchenbau", value: "Holzwerk Lübeck" },
      { label: "Lieferant", value: "Marmi Italia" },
      { label: "Fotografie", value: "Jonas Reichert" },
    ],
    overview:
      "Eine Küche, die einer alten Diele folgt. Eine massive Insel aus Calacatta Viola steht zentral, dahinter eine vollflächige Steinrückwand. Eichenfronten und Messingdetails halten den Raum warm.",
    details:
      "Die Platte aus Calacatta Viola wurde aus einem einzigen Block geschnitten, die Maserung läuft über die Kante. Eine 12 mm tiefe Tropfkante an Spüle und Kochfeld hält das Bild ruhig. Schubladen mit Push-to-Open, Hochschränke wandbündig.",
    runs: [
      { kind: "full",  images: [{ src: "/images/proj-05.jpg", alt: "Küche" }] },
      { kind: "pair",  images: [{ src: "/images/proj-09.jpg", alt: "Detail Insel" }, { src: "/images/proj-06.jpg", alt: "Speisekammer" }] },
    ],
  },
  {
    slug: "lindenallee-wohnen",
    name: "Lindenallee Wohnen",
    subtitle: "Wohnraum, Kamin, Treppe",
    category: "Wohnbereich",
    hero: "/images/proj-06.jpg",
    credits: [
      { label: "Architekt", value: "Studio Werkraum" },
      { label: "Innenarchitektur", value: "Lina Brandt" },
      { label: "Lieferant", value: "Solnhofer Naturstein" },
      { label: "Fotografie", value: "Tobias Klee" },
    ],
    overview:
      "Ein durchgehender Wohnbereich, in dem Naturstein als ruhige Bodengrafik liest. Der Kamin sitzt in einer flach gespannten Steinwand, die Treppe verschwindet hinter einem schlichten Stahlgeländer.",
    details:
      "Solnhofener Plattenkalk in geschliffener Oberfläche, Format 40 × 60 cm. Die Treppe ist in Massivstufen ausgeführt — eine Vorderkante mit 2 mm Fase, sonst ungebrochen.",
    runs: [
      { kind: "full",  images: [{ src: "/images/proj-06.jpg", alt: "Wohnraum" }] },
      { kind: "pair",  images: [{ src: "/images/proj-03.jpg", alt: "Kamin" }, { src: "/images/proj-07.jpg", alt: "Treppe" }] },
    ],
  },
  {
    slug: "kalkstein-fassade",
    name: "Kalkstein Fassade",
    subtitle: "Vorhangfassade, Eingang, Bodenanschluss",
    category: "Naturstein",
    hero: "/images/proj-07.jpg",
    credits: [
      { label: "Architekt", value: "Hafenbüro Architekten" },
      { label: "Stein", value: "Jura Marmor" },
      { label: "Ausführung", value: "Seehafer Elemente" },
      { label: "Fotografie", value: "Mira Lentz" },
    ],
    overview:
      "Eine Fassade aus großformatigen Kalksteinplatten, hinterlüftet montiert. Die Fugen folgen einem ruhigen Raster und legen sich präzise um die Fensteröffnungen.",
    details:
      "Jura Gelb, gestockt und gebürstet, Plattenstärke 40 mm. Die Befestigung erfolgt mit punktgehaltenen Edelstahlankern in horizontalen Fugen. Eingangsleibung aus dem gleichen Stein, scharrierte Stufenanlage zur Straße.",
    runs: [
      { kind: "full",  images: [{ src: "/images/proj-07.jpg", alt: "Fassade" }] },
      { kind: "pair",  images: [{ src: "/images/proj-01.jpg", alt: "Eingang" }, { src: "/images/proj-05.jpg", alt: "Bodenanschluss" }] },
    ],
  },
  {
    slug: "panorama-dusche",
    name: "Panorama Dusche",
    subtitle: "Walk-in Dusche mit Fensterfront, Steinbank",
    category: "Badezimmer",
    hero: "/images/proj-08.jpg",
    credits: [
      { label: "Architekt", value: "Atelier Sieben" },
      { label: "Innenarchitektur", value: "Cathrin Voss" },
      { label: "Lieferant", value: "Antolini" },
      { label: "Fotografie", value: "Nora Hahn" },
    ],
    overview:
      "Eine Dusche, die ihre eine Wand an ein bodentiefes Fenster verliert. Naturstein zieht über Boden, Bank und Rückwand — die Außenwelt wird zur dritten Oberfläche.",
    details:
      "Ein graugrüner Quarzit, geflammt und gebürstet, mit verdeckter Linienentwässerung. Die Sitzbank ist aus einem Stück gefertigt und über schwer sichtbare Konsolen an der Wand befestigt.",
    runs: [
      { kind: "full",  images: [{ src: "/images/proj-08.jpg", alt: "Panorama Dusche" }] },
      { kind: "pair",  images: [{ src: "/images/proj-01.jpg", alt: "Steinbank" }, { src: "/images/proj-03.jpg", alt: "Armatur" }] },
    ],
  },
  {
    slug: "eichenweg-kueche",
    name: "Eichenweg Küche",
    subtitle: "Landhausküche, Steinrückwand, Vorratsraum",
    category: "Küche",
    hero: "/images/proj-09.jpg",
    credits: [
      { label: "Architekt", value: "Marc Behrens" },
      { label: "Küchenbau", value: "Holzwerk Lübeck" },
      { label: "Lieferant", value: "Marmi Italia" },
      { label: "Fotografie", value: "Jonas Reichert" },
    ],
    overview:
      "Eine warme Landhausküche, in der eine ruhige Steinrückwand das Bild trägt. Eichenfronten in offenen Profilen, ein langer Tisch aus dem gleichen Holz.",
    details:
      "Mattgeschliffener Pietra Serena als Rückwand, fugenlos über drei Meter. Arbeitsplatte in 40 mm mit handgeschlagener Kante. Spüle in Steinfarbe lackiert, Armatur in gebürstetem Edelstahl.",
    runs: [
      { kind: "full",  images: [{ src: "/images/proj-09.jpg", alt: "Eichenweg Küche" }] },
      { kind: "pair",  images: [{ src: "/images/proj-05.jpg", alt: "Detail" }, { src: "/images/proj-10.jpg", alt: "Vorratsraum" }] },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
