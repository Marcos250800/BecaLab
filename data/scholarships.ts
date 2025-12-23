export interface Scholarship {
  id: number;
  title: string;
  entity: string;
  description: string;
  status: 'Abierta' | 'Cerrada';
  deadline: string;
  amount: string;
  link: string;
  probability: 'Alta' | 'Media' | 'Baja';
  type: string; // Ej: Máster, Doctorado
  isNew?: boolean;
}

export const scholarships: Scholarship[] = [
  {
    id: 1,
    title: "Becas La Caixa (Doctorado INPhINIT)",
    entity: "Fundación La Caixa",
    description: "Programa de excelencia para cursar doctorados en centros de investigación acreditados en España y Portugal. Alta competitividad.",
    type: "Doctorado",
    status: "Abierta",
    deadline: "31 Ene 2026",
    amount: "35.800€ anuales + Investigación",
    link: "https://fundacionlacaixa.org/es/becas-doctorado-inphinit-convocatoria-incoming",
    probability: "Alta"
  },
  {
    id: 2,
    title: "Becas Santander (Ayuda de Movilidad)",
    entity: "Banco Santander",
    description: "Ayudas económicas para sufragar costes de desplazamiento y manutención en programas de movilidad internacional.",
    type: "Grado/Máster",
    status: "Abierta",
    deadline: "15 Abr 2026",
    amount: "1.000€ - 3.000€ pago único",
    link: "https://app.santanderopenacademy.com/es/",
    probability: "Media"
  },
  {
    id: 3,
    title: "Erasmus Mundus Joint Masters",
    entity: "Comisión Europea",
    description: "Másteres conjuntos de alto nivel impartidos por consorcios de universidades internacionales. Estudias en al menos dos países.",
    type: "Máster",
    status: "Abierta",
    deadline: "15 Feb 2026",
    amount: "Matrícula + 1.400€/mes",
    link: "https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en",
    probability: "Alta"
  },
  {
    id: 4,
    title: "Becas Atracción del Talento",
    entity: "Universidad de Jaén (UJA)",
    description: "Becas destinadas a estudiantes internacionales de excelencia académica para cursar estudios de grado y máster.",
    type: "Máster",
    status: "Abierta",
    deadline: "15 Feb 2026",
    amount: "100% Matrícula + 3.190€/año",
    link: "https://www.ujaen.es/internacional/convocatorias-internacionales",
    probability: "Alta"
  },
  {
    id: 5,
    title: "Becas Iberoamérica + Asia",
    entity: "Universidad de Valladolid (UVa)",
    description: "Programa para cursar másteres oficiales en la UVa, dirigido a egresados de universidades iberoamericanas y asiáticas.",
    type: "Máster",
    status: "Cerrada",
    deadline: "Varía (Anual)",
    amount: "80% Matrícula + 750€/mes",
    link: "https://iberoamerica-asia.uva.es",
    probability: "Alta"
  },
  {
    id: 6,
    title: "Becas BEME (Excelencia Exterior)",
    entity: "Xunta de Galicia",
    description: "Para gallegos residentes en el exterior o descendientes con ciudadanía, para cursar un máster en una universidad gallega.",
    type: "Máster",
    status: "Cerrada",
    deadline: "Abril 2026",
    amount: "7.000€ - 11.500€ por curso",
    link: "https://emigracion.xunta.gal/es/becas-excelencia-juventud-exterior",
    probability: "Alta"
  },
  {
    id: 7,
    title: "Becas AUIP (Másteres Andalucía)",
    entity: "AUIP",
    description: "Becas de matrícula y movilidad para cursar másteres universitarios en las universidades públicas de Andalucía.",
    type: "Máster",
    status: "Cerrada",
    deadline: "Enero 2026",
    amount: "Matrícula completa + Ayuda viaje",
    link: "https://www.auip.org/es/becas-auip",
    probability: "Media"
  },
  {
    id: 8,
    title: "Becas Internacionales USAL",
    entity: "Universidad de Salamanca",
    description: "Becas institucionales para realizar estudios de máster universitario y doctorado para estudiantes latinoamericanos.",
    type: "Máster/Doctorado",
    status: "Cerrada",
    deadline: "Marzo 2026",
    amount: "Alojamiento + Seguro Médico",
    link: "https://rel-int.usal.es/es/proyectos/becas-internacionales-de-la-usal",
    probability: "Media"
  },
  {
    id: 9,
    title: "Becas Fundación Carolina",
    entity: "Fundación Carolina",
    description: "Referente en movilidad académica para Iberoamérica. Oferta muy variada de postgrados, doctorados y estancias cortas.",
    type: "Postgrado",
    status: "Cerrada",
    deadline: "Marzo 2026",
    amount: "Manutención parcial + Seguro",
    link: "https://www.fundacioncarolina.es/formacion/solicitud-de-becas/",
    probability: "Media"
  },
  {
    id: 10,
    title: "Becas MAEC-AECID",
    entity: "Gobierno de España",
    description: "Becas del Ministerio de Asuntos Exteriores para ciudadanos extranjeros. Incluye programas de arte, educación y cultura.",
    type: "Máster/Arte",
    status: "Cerrada",
    deadline: "Febrero 2026",
    amount: "Mensualidad + Matrícula + Seguro",
    link: "https://www.aecid.es/becas-y-lectorados",
    probability: "Alta"
  },
  {
    id: 11,
    title: "Contratos Ramón y Cajal",
    entity: "Ministerio de Ciencia",
    description: "Contratos para la incorporación de investigadores doctores con trayectoria destacada en centros de I+D españoles.",
    type: "Investigación",
    status: "Cerrada",
    deadline: "Enero 2026",
    amount: "Contrato ~40.000€/año",
    link: "https://www.aei.gob.es/convocatorias/buscador-convocatorias",
    probability: "Baja"
  }
];