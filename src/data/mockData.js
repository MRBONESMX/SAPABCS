export const PERCANCES_MOCK = {
  indeco: [
    { dia: 5, tipo: 'fuga_tuberia', titulo: 'Ruptura de Tubo de 14"', badge: 'Fuga de Red', color: '#D90429', bg: '#FEE2E2', desc: 'Cuadrilla de SAPA atiende fuga imprevista en Av. Mújica. Retraso de 4 horas en la presurización.', icono: 'AlertTriangle' },
    { dia: 19, tipo: 'falla_electrica', titulo: 'Corte de Luz en Pozo 4', badge: 'Falla CFE', color: '#E85D04', bg: '#FFEDD5', desc: 'Suspensión por falta de energía eléctrica en planta de bombeo. Servicio reanudado por la tarde.', icono: 'ZapOff' },
  ],
  centro: [
    { dia: 9, tipo: 'mantenimiento_valvula', titulo: 'Cambio de Válvula de Control', badge: 'Mantenimiento', color: '#E85D04', bg: '#FFEDD5', desc: 'Sustitución de válvula en sector Malecón. Reducción temporal de presión en la zona alta.', icono: 'Wrench' },
    { dia: 23, tipo: 'turbidez_clima', titulo: 'Alto Nivel de Turbidez por Lluvias', badge: 'Calidad de Agua', color: '#B45309', bg: '#FEF3C7', desc: 'Pausa técnica preventiva en el pozo Carrizal tras desborde de arroyo.', icono: 'DropletOff' }
  ],
  pescador: [
    { dia: 12, tipo: 'fuga_tuberia', titulo: 'Fuga de Acueducto Principal', badge: 'Obra Urgente', color: '#D90429', bg: '#FEE2E2', desc: 'Reparación mayor de tubería de distribución. Suspensión total del tandeo por 8 horas.', icono: 'AlertTriangle' },
    { dia: 22, tipo: 'baja_presion', titulo: 'Baja Presión por Fuga Vecinal', badge: 'Baja Presión', color: '#E85D04', bg: '#FFEDD5', desc: 'Disminución del caudal debido a múltiple reporte de fugas no reparadas en calle principal.', icono: 'TrendingDown' }
  ],
  camino_real: [
    { dia: 14, tipo: 'falla_electrica', titulo: 'Paro de Bomba por Sobrecarga', badge: 'Falla CFE', color: '#E85D04', bg: '#FFEDD5', desc: 'Interrupción eléctrica en subestación del Pozo 12. Técnico restableciendo arrancador.', icono: 'ZapOff' }
  ],
  bellavista: [
    { dia: 7, tipo: 'mantenimiento_valvula', titulo: 'Limpieza de Desarenador', badge: 'Mantenimiento', color: '#B45309', bg: '#FEF3C7', desc: 'Mantenimiento preventivo anual a tanques elevadores del sector.', icono: 'Wrench' }
  ],
  fidedepaz: [
    { dia: 17, tipo: 'fuga_tuberia', titulo: 'Interconexión de Nueva Red', badge: 'Obra Municipal', color: '#0284C7', bg: '#E0F2FE', desc: 'Trabajos de interconexión de agua potable para nuevo desarrollo urbano.', icono: 'Wrench' }
  ]
};

export const SECTORES_MAPA_LA_PAZ = [
  {
    id: 'indeco',
    nombre: 'Indeco',
    zona: 'Sector Sur',
    estado: 'con_agua',
    horario: '08:00 AM - 04:00 PM',
    presion: 'Buena (2.4 Bar)',
    presionPorcentaje: 85,
    cisternaRecomendada: 'Excelente para llenado de cisterna',
    diasTandeo: [1, 3, 5, 8, 10, 12, 15, 17, 19, 22, 24, 26, 29, 31],
  },
  {
    id: 'centro',
    nombre: 'Centro Histórico',
    zona: 'Sector Malecón / Centro',
    estado: 'sin_agua',
    horario: 'Mañana 06:00 AM - 02:00 PM',
    presion: 'Sin Presión',
    presionPorcentaje: 0,
    cisternaRecomendada: 'Usar reserva de aljibe',
    diasTandeo: [2, 4, 6, 9, 11, 13, 16, 18, 20, 23, 25, 27, 30],
  },
  {
    id: 'pescador',
    nombre: 'El Pescador',
    zona: 'Sector Norte / Esterito',
    estado: 'mantenimiento',
    horario: 'En Obra por Fuga de Red',
    presion: 'Baja (0.5 Bar)',
    presionPorcentaje: 20,
    cisternaRecomendada: 'Corte por mantenimiento técnico',
    diasTandeo: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28],
  },
  {
    id: 'camino_real',
    nombre: 'Camino Real',
    zona: 'Sector Sur-Este',
    estado: 'con_agua',
    horario: '10:00 AM - 08:00 PM',
    presion: 'Excelente (3.0 Bar)',
    presionPorcentaje: 95,
    cisternaRecomendada: 'Llenado óptimo continuo',
    diasTandeo: [1, 2, 5, 6, 9, 10, 13, 14, 17, 18, 21, 22, 25, 26, 29, 30],
  },
  {
    id: 'bellavista',
    nombre: 'Bella Vista',
    zona: 'Sector Poniente',
    estado: 'sin_agua',
    horario: 'Mañana turno 07:00 AM',
    presion: 'Sin Presión',
    presionPorcentaje: 0,
    cisternaRecomendada: 'Racionar reserva acumulada',
    diasTandeo: [3, 7, 11, 15, 19, 23, 27, 31],
  },
  {
    id: 'fidedepaz',
    nombre: 'Fidedepaz',
    zona: 'Sector Bahía Norte',
    estado: 'con_agua',
    horario: '07:00 AM - 03:00 PM',
    presion: 'Buena (2.2 Bar)',
    presionPorcentaje: 80,
    cisternaRecomendada: 'Llenado normal',
    diasTandeo: [1, 3, 5, 8, 10, 12, 15, 17, 19, 22, 24, 26, 29, 31],
  }
];

export const MOCK_NOTIFICACIONES = [
  {
    id: 101,
    titulo: 'Tandeo Iniciado en Indeco',
    descripcion: 'El presurizado de la red sur ha comenzado en la colonia Indeco. Horario previsto hasta las 04:00 PM.',
    tipo: 'info',
    tiempo: 'Hace 10 min',
    coloniaId: 'indeco',
    coloniaNombre: 'Indeco',
    leida: false
  },
  {
    id: 102,
    titulo: 'Reparación de Tubo Matriz en El Pescador',
    descripcion: 'Cuadrilla de SAPA repara fuga en Av. Las Ballenas en El Pescador. Normalización estimada en 3 horas.',
    tipo: 'warning',
    tiempo: 'Hace 45 min',
    coloniaId: 'pescador',
    coloniaNombre: 'El Pescador',
    leida: false
  },
  {
    id: 103,
    titulo: 'Corte Programado por Cambio de Válvula en Centro',
    descripcion: 'Suspensión temporal en el Sector Malecón / Centro Histórico por mantenimiento de válvulas principales.',
    tipo: 'warning',
    tiempo: 'Hace 2 horas',
    coloniaId: 'centro',
    coloniaNombre: 'Centro Histórico',
    leida: true
  },
  {
    id: 104,
    titulo: 'Presión Máxima en Red de Camino Real',
    descripcion: 'Se reporta llenado constante de 3.0 Bar en el sector Camino Real. Momento ideal para encender cisterna.',
    tipo: 'info',
    tiempo: 'Hace 3 horas',
    coloniaId: 'camino_real',
    coloniaNombre: 'Camino Real',
    leida: true
  },
  {
    id: 105,
    titulo: 'Aviso General: Mantenimiento en Acueducto Carrizal',
    descripcion: 'Trabajos generales de desarenado en la planta potabilizadora Carrizal. No afecta el tandeo del día de hoy.',
    tipo: 'info',
    tiempo: 'Hace 5 horas',
    coloniaId: null,
    coloniaNombre: null,
    leida: true
  }
];

export const FUGAS_REPORTADAS_MOCK = [
  {
    id: 'REP-1024',
    colonia: 'Indeco',
    coloniaId: 'indeco',
    direccion: 'Calle Francisco J. Mújica y Pino Ponderosa',
    tipo: 'Fuga de Agua Potable',
    origen: 'Toma Domiciliaria / Banqueta',
    gravedad: 'Alta',
    confirmacionesVecinos: 4,
    fecha: 'Hoy 10:30 AM',
    estado: 'Verificado por Comunidad',
    reportadoPor: 'María Elena Castro',
    contrato: 'CON-48201',
    imagenUrl: '/fuga1.png', // Evidencia fotográfica
    coords: { top: '38%', left: '42%' }
  },
  {
    id: 'REP-1025',
    colonia: 'El Pescador',
    coloniaId: 'pescador',
    direccion: 'Av. Las Ballenas #142',
    tipo: 'Baja Presión / Gotero',
    origen: 'Tubería Principal de Calle',
    gravedad: 'Media',
    confirmacionesVecinos: 2,
    fecha: 'Hoy 11:15 AM',
    estado: 'En Validación',
    reportadoPor: 'Jorge Benítez',
    contrato: 'CON-11029',
    imagenUrl: '/fuga2.png', // Evidencia fotográfica
    coords: { top: '60%', left: '68%' }
  }
];
