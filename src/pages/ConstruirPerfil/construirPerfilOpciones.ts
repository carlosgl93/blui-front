type SettingsKey =
  | 'detallesBasicos'
  | 'disponibilidad'
  | 'comunas'
  | 'tarifas'
  | 'experiencia'
  | 'cuentaBancaria'
  | 'historialLaboral'
  | 'educacionFormacion'
  | 'registroSuperIntendenciaSalud'
  | 'insignias'
  | 'inmunizacion'
  | 'idiomas'
  | 'antecedentesCulturales'
  | 'religion'
  | 'interesesHobbies'
  | 'sobreMi'
  | 'misPreferencias';

export const construirPerfilOpciones: { key: SettingsKey; value: string }[] = [
  { key: 'detallesBasicos', value: 'Detalles basicos' },
  { key: 'disponibilidad', value: 'Disponibilidad' },
  { key: 'comunas', value: 'Comunas' },
  { key: 'tarifas', value: 'Tarifas' },
  { key: 'experiencia', value: 'Experiencia' },
  { key: 'cuentaBancaria', value: 'Cuenta bancaria' },
  { key: 'historialLaboral', value: 'Historial laboral' },
  { key: 'educacionFormacion', value: 'Educación y formación' },
  { key: 'registroSuperIntendenciaSalud', value: 'Registro super intendencia de salud' },
  { key: 'insignias', value: 'Insignias' },
  { key: 'inmunizacion', value: 'Inmunización' },
  { key: 'idiomas', value: 'Idiomas' },
  { key: 'antecedentesCulturales', value: 'Antecedentes culturales' },
  { key: 'religion', value: 'Religión' },
  { key: 'interesesHobbies', value: 'Intereses y hobbies' },
  { key: 'sobreMi', value: 'Sobre mí' },
  { key: 'misPreferencias', value: 'Mis preferencias' },
];
