import { TarifaFront } from '@/types';
import ElderlyOutlinedIcon from '@mui/icons-material/ElderlyOutlined';
import ElderlyIcon from '@mui/icons-material/Elderly';
import LoopIcon from '@mui/icons-material/Loop';
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AccessibleOutlinedIcon from '@mui/icons-material/AccessibleOutlined';
import dayjs from 'dayjs';

export const allComunas = [
  'ALGARROBO',
  'ALHUE',
  'ALTO BIOBIO',
  'ALTO DEL CARMEN',
  'ALTO HOSPICIO',
  'ANCUD',
  'ANDACOLLO',
  'ANGOL',
  'ANTOFAGASTA',
  'ANTUCO',
  'ARAUCO',
  'ARICA',
  'AYSEN',
  'BUIN',
  'BULNES',
  'CABILDO',
  'CABO DE HORNOS',
  'CABRERO',
  'CALAMA',
  'CALBUCO',
  'CALDERA',
  'CALERA DE TANGO',
  'CALLE LARGA',
  'CAMARONES',
  'CAMINA',
  'CANELA',
  'CANETE',
  'CARAHUE',
  'CARTAGENA',
  'CASABLANCA',
  'CASTRO',
  'CATEMU',
  'CAUQUENES',
  'CERRILLOS',
  'CERRO NAVIA',
  'CHAITEN',
  'CHANARAL',
  'CHANCO',
  'CHEPICA',
  'CHIGUAYANTE',
  'CHILE CHICO',
  'CHILLAN',
  'CHILLAN VIEJO',
  'CHIMBARONGO',
  'CHOLCHOL',
  'CHONCHI',
  'CISNES',
  'COBQUECURA',
  'COCHAMO',
  'COCHRANE',
  'CODEGUA',
  'COELEMU',
  'COIHUECO',
  'COINCO',
  'COLBUN',
  'COLCHANE',
  'COLINA',
  'COLLIPULLI',
  'COLTAUCO',
  'COMBARBALA',
  'CONCEPCION',
  'CONCHALI',
  'CONCON',
  'CONSTITUCION',
  'CONTULMO',
  'COPIAPO',
  'COQUIMBO',
  'CORONEL',
  'CORRAL',
  'COYHAIQUE',
  'CUNCO',
  'CURACAUTIN',
  'CURACAVI',
  'CURACO DE VELEZ',
  'CURANILAHUE',
  'CURARREHUE',
  'CUREPTO',
  'CURICO',
  'DALCAHUE',
  'DIEGO DE ALMAGRO',
  'DONIHUE',
  'EL BOSQUE',
  'EL CARMEN',
  'EL MONTE',
  'EL QUISCO',
  'EL TABO',
  'EMPEDRADO',
  'ERCILLA',
  'ESTACION CENTRAL',
  'FLORIDA',
  'FREIRE',
  'FREIRINA',
  'FRESIA',
  'FRUTILLAR',
  'FUTALEUFU',
  'FUTRONO',
  'GALVARINO',
  'GENERAL LAGOS',
  'GORBEA',
  'GRANEROS',
  'GUAITECAS',
  'HIJUELAS',
  'HUALAIHUE',
  'HUALANE',
  'HUALPEN',
  'HUALQUI',
  'HUARA',
  'HUASCO',
  'HUECHURABA',
  'ILLAPEL',
  'INDEPENDENCIA',
  'IQUIQUE',
  'ISLA DE MAIPO',
  'ISLA DE PASCUA',
  'JUAN FERNANDEZ',
  'LA CALERA',
  'LA CISTERNA',
  'LA CRUZ',
  'LA ESTRELLA',
  'LA FLORIDA',
  'LA GRANJA',
  'LA HIGUERA',
  'LA LIGUA',
  'LA PINTANA',
  'LA REINA',
  'LA SERENA',
  'LA UNION',
  'LAGO RANCO',
  'LAGO VERDE',
  'LAGUNA BLANCA',
  'LAJA',
  'LAMPA',
  'LANCO',
  'LAS CABRAS',
  'LAS CONDES',
  'LAUTARO',
  'LEBU',
  'LICANTEN',
  'LIMACHE',
  'LINARES',
  'LITUECHE',
  'LLANQUIHUE',
  'LLAY-LLAY',
  'LO BARNECHEA',
  'LO ESPEJO',
  'LO PRADO',
  'LOLOL',
  'LONCOCHE',
  'LONGAVI',
  'LONQUIMAY',
  'LOS ALAMOS',
  'LOS ANDES',
  'LOS ANGELES',
  'LOS LAGOS',
  'LOS MUERMOS',
  'LOS SAUCES',
  'LOS VILOS',
  'LOTA',
  'LUMACO',
  'MACHALI',
  'MACUL',
  'MAFIL',
  'MAIPU',
  'MALLOA',
  'MARIA ELENA',
  'MARIA PINTO',
  'MARIQUINA',
  'MAULE',
  'MAULLIN',
  'MEJILLONES',
  'MELIPEUCO',
  'MELIPILLA',
  'MOLINA',
  'MONTE PATRIA',
  'MULCHEN',
  'NACIMIENTO',
  'NANCAGUA',
  'NATALES',
  'NAVIDAD',
  'NEGRETE',
  'NINHUE',
  'NIQUEN',
  'NOGALES',
  'NUEVA IMPERIAL',
  'NUNOA',
  'OHIGGINS',
  'OLIVAR',
  'OLLAGUE',
  'OLMUE',
  'OSORNO',
  'OVALLE',
  'PADRE HURTADO',
  'PADRE LAS CASAS',
  'PAIHUANO',
  'PAILLACO',
  'PAINE',
  'PALENA',
  'PALMILLA',
  'PANGUIPULLI',
  'PANQUEHUE',
  'PAPUDO',
  'PAREDONES',
  'PARRAL',
  'PEDRO AGUIRRE CERDA',
  'PELARCO',
  'PELLUHUE',
  'PEMUCO',
  'PENAFLOR',
  'PENALOLEN',
  'PENCAHUE',
  'PENCO',
  'PERALILLO',
  'PERQUENCO',
  'PETORCA',
  'PEUMO',
  'PICA',
  'PICHIDEGUA',
  'PICHILEMU',
  'PINTO',
  'PIRQUE',
  'PITRUFQUEN',
  'PLACILLA',
  'PORTEZUELO',
  'PORVENIR',
  'POZO ALMONTE',
  'PRIMAVERA',
  'PROVIDENCIA',
  'PUCHUNCAVI',
  'PUCON',
  'PUDAHUEL',
  'PUENTE ALTO',
  'PUERTO MONTT',
  'PUERTO OCTAY',
  'PUERTO VARAS',
  'PUMANQUE',
  'PUNITAQUI',
  'PUNTA ARENAS',
  'PUQUELDON',
  'PUREN',
  'PURRANQUE',
  'PUTAENDO',
  'PUTRE',
  'PUYEHUE',
  'QUEILEN',
  'QUELLON',
  'QUEMCHI',
  'QUILACO',
  'QUILICURA',
  'QUILLECO',
  'QUILLON',
  'QUILLOTA',
  'QUILPUE',
  'QUINCHAO',
  'QUINTA DE TILCOCO',
  'QUINTA NORMAL',
  'QUINTERO',
  'QUIRIHUE',
  'RANCAGUA',
  'RANQUIL',
  'RAUCO',
  'RECOLETA',
  'RENAICO',
  'RENCA',
  'RENGO',
  'REQUINOA',
  'RETIRO',
  'RINCONADA',
  'RIO BUENO',
  'RIO CLARO',
  'RIO HURTADO',
  'RIO IBANEZ',
  'RIO NEGRO',
  'RIO VERDE',
  'ROMERAL',
  'SAAVEDRA',
  'SAGRADA FAMILIA',
  'SALAMANCA',
  'SAN ANTONIO',
  'SAN BERNARDO',
  'SAN CARLOS',
  'SAN CLEMENTE',
  'SAN ESTEBAN',
  'SAN FABIAN',
  'SAN FELIPE',
  'SAN FERNANDO',
  'SAN FRANCISCO DE MOSTAZAL',
  'SAN GREGORIO',
  'SAN IGNACIO',
  'SAN JAVIER',
  'SAN JOAQUIN',
  'SAN JOSE DE MAIPO',
  'SAN JUAN DE LA COSTA',
  'SAN MIGUEL',
  'SAN NICOLAS',
  'SAN PABLO',
  'SAN PEDRO',
  'SAN PEDRO DE ATACAMA',
  'SAN PEDRO DE LA PAZ',
  'SAN RAFAEL',
  'SAN RAMON',
  'SAN ROSENDO',
  'SAN VICENTE',
  'SANTA BARBARA',
  'SANTA CRUZ',
  'SANTA JUANA',
  'SANTA MARIA',
  'SANTIAGO',
  'SANTIAGO OESTE',
  'SANTIAGO SUR',
  'SANTO DOMINGO',
  'SIERRA GORDA',
  'TALAGANTE',
  'TALCA',
  'TALCAHUANO',
  'TALTAL',
  'TEMUCO',
  'TENO',
  'TEODORO SCHMIDT',
  'TIERRA AMARILLA',
  'TIL-TIL',
  'TIMAUKEL',
  'TIRUA',
  'TOCOPILLA',
  'TOLTEN',
  'TOME',
  'TORRES DEL PAINE',
  'TORTEL',
  'TRAIGUEN',
  'TREHUACO',
  'TUCAPEL',
  'VALDIVIA',
  'VALLENAR',
  'VALPARAISO',
  'VICHUQUEN',
  'VICTORIA',
  'VICUNA',
  'VILCUN',
  'VILLA ALEGRE',
  'VILLA ALEMANA',
  'VILLARRICA',
  'VINA DEL MAR',
  'VITACURA',
  'YERBAS BUENAS',
  'YUMBEL',
  'YUNGAY',
  'ZAPALLAR',
];

export const availability = [
  {
    id: 1,
    name: 'Lunes',
  },
  {
    id: 2,
    name: 'Martes',
  },
  {
    id: 3,
    name: 'Miercoles',
  },
  {
    id: 4,
    name: 'Jueves',
  },
  {
    id: 5,
    name: 'Viernes',
  },
  {
    id: 6,
    name: 'Sabado',
  },
  {
    id: 7,
    name: 'Domingo',
  },
];

export const defaultAvailability = [
  {
    id: 1,
    isAvailable: true,
    day: 'Lunes',
    times: {
      startTime: dayjs().startOf('day').format('HH:mm'),
      endTime: dayjs().endOf('day').format('HH:mm'),
    },
  },
  {
    id: 2,
    isAvailable: true,
    day: 'Martes',
    times: {
      startTime: dayjs().startOf('day').format('HH:mm'),
      endTime: dayjs().endOf('day').format('HH:mm'),
    },
  },
  {
    id: 3,
    isAvailable: true,
    day: 'Miercoles',
    times: {
      startTime: dayjs().startOf('day').format('HH:mm'),
      endTime: dayjs().endOf('day').format('HH:mm'),
    },
  },
  {
    id: 4,
    isAvailable: true,
    day: 'Jueves',
    times: {
      startTime: dayjs().startOf('day').format('HH:mm'),
      endTime: dayjs().endOf('day').format('HH:mm'),
    },
  },
  {
    id: 5,
    isAvailable: true,
    day: 'Viernes',
    times: {
      startTime: dayjs().startOf('day').format('HH:mm'),
      endTime: dayjs().endOf('day').format('HH:mm'),
    },
  },
  {
    id: 6,
    isAvailable: true,
    day: 'Sabado',
    times: {
      startTime: dayjs().startOf('day').format('HH:mm'),
      endTime: dayjs().endOf('day').format('HH:mm'),
    },
  },
  {
    id: 0,
    isAvailable: true,
    day: 'Domingo',
    times: {
      startTime: dayjs().startOf('day').format('HH:mm'),
      endTime: dayjs().endOf('day').format('HH:mm'),
    },
  },
];

export type Service = {
  id: number;
  text: string;
  speciality: {
    id: number;
    text: string;
  }[];
};

export const defaultTarifas: TarifaFront[] = [
  {
    id: 1,
    dayName: 'Día de semana',
    price: '0',
  },
  {
    id: 2,
    dayName: 'Sábado',
    price: '0',
  },
  {
    id: 3,
    dayName: 'Domingo',
    price: '0',
  },
];

// export const dummyPrestadores: Prestador[] = [
//   {
//     firstname: 'Juan',
//     email: 'juan@prestador1.com',
//     phone: '1234551234',
//     address: '423 Julio Prado',
//     city: 'Santiago',
//     state: 'Metropolitana',
//     country: 'Chile',
//     comunas: ['SANTIAGO', 'PROVIDENCIA', 'LAS CONDES'],
//     service: 'Soporte Terapéutico',
//     speciality: 'Kinesiología',
//     profile_pic: 'https://icon-library.com/images/google-user-icon/google-user-icon-7.jpg',
//     availability: ['1', '2', '3', '4', '5', '6', '7'],
//   },
//   {
//     firstname: 'Pedro',
//     email: 'pedro@prestador1.com',
//     phone: '1234551234',
//     address: '423 Julio Prado',
//     city: 'Rancagua',
//     state: 'Sexta Region',
//     country: 'Chile',
//     comunas: ['MACHALI', 'RANCAGUA'],
//     service: 'Soporte Terapéutico',
//     speciality: 'Fonoaudiología',
//     profile_pic:
//       'https://cambodiaict.net/wp-content/uploads/2019/12/computer-icons-user-profile-google-account-photos-icon-account.jpg',
//     availability: ['4', '5', '6', '7'],
//   },
// ];

export const days = [
  {
    id: 1,
    name: 'Lunes',
  },
  {
    id: 2,
    name: 'Martes',
  },
  {
    id: 3,
    name: 'Miercoles',
  },
  {
    id: 4,
    name: 'Jueves',
  },
  {
    id: 5,
    name: 'Viernes',
  },
  {
    id: 6,
    name: 'Sabado',
  },
  {
    id: 7,
    name: 'Domingo',
  },
];

export const generalExperiences = [
  {
    id: 1,
    label: 'Adultos mayores',
    icon: ElderlyOutlinedIcon,
    checkedIcon: ElderlyIcon,
    specialities: [
      { id: 1, label: 'Demencia senil' },
      { id: 2, label: 'Parkinson' },
    ],
  },
  {
    id: 2,
    label: 'Condiciones crónicas',
    icon: LoopOutlinedIcon,
    checkedIcon: LoopIcon,
    specialities: [
      { id: 3, label: 'Artritis' },
      { id: 4, label: 'Asma' },
      { id: 5, label: 'Enfermedades cardiovasculares' },
      { id: 6, label: 'Enfermedades respiratorias' },
      { id: 7, label: 'Diabetes' },
    ],
  },
  {
    id: 3,
    label: 'Discapacidad',
    icon: AccessibleOutlinedIcon,
    checkedIcon: AccessibleForwardIcon,
    specialities: [
      { id: 8, label: 'Lesión Cerebral Adquirida' },
      { id: 9, label: 'Autismo' },
      { id: 10, label: 'Parálisis Cerebral' },
      { id: 11, label: 'Fibrosis Quística' },
      { id: 12, label: 'Síndrome de Down' },
      { id: 13, label: 'Epilepsia' },
      { id: 14, label: 'Discapacidad Auditiva' },
      { id: 15, label: 'Discapacidades Intelectuales' },
      { id: 16, label: 'Enfermedad de Neurona Motora' },
      { id: 17, label: 'Distrofia Muscular' },
      { id: 18, label: 'Discapacidades Físicas' },
      { id: 19, label: 'Espina Bífida' },
      { id: 20, label: 'Lesión de Médula Espinal' },
      { id: 21, label: 'Discapacidad Visual' },
    ],
  },
  {
    id: 4,
    label: 'Salud mental',
    icon: PsychologyOutlinedIcon,
    checkedIcon: PsychologyIcon,
    specialities: [
      { id: 22, label: 'Ansiedad' },
      { id: 23, label: 'Trastorno Bipolar' },
      { id: 24, label: 'Depresión' },
      { id: 25, label: 'Trastornos de la Alimentación' },
      { id: 26, label: 'Acumulación (Síndrome de Diógenes)' },
      { id: 27, label: 'Trastorno Obsesivo-Compulsivo (TOC)' },
      { id: 28, label: 'Trastorno de Estrés Postraumático (TEPT)' },
      { id: 29, label: 'Esquizofrenia' },
      { id: 30, label: 'Abuso de Sustancias y Adicción' },
    ],
  },
];
