export type ComoFuncionaContent = {
  image: string;
  imgAlt: string;
  title: string;
  text: string;
};

export const comoFuncionaCardsContent: ComoFuncionaContent[] = [
  {
    image: `/images/blui-icon-1.png`,
    imgAlt: 'Blui busca una persona de apoyo',
    title: 'BUSCA UNA PERSONA DE APOYO',
    text: 'Busca libremente a la persona que pueda brindarte el apoyo que necesitas. Utiliza nuestros filtros para que puedas encontrar a aquellas personas que respondan a tus necesidades, intereses y disponibilidad.',
  },
  {
    image: `/images/blui-icon-2.png`,
    imgAlt: 'Imagen de un saludo con un apreton de manos',
    title: 'AGENDA UNA SESIÓN DE APOYO',
    text: 'Una vez que encuentres los perfiles que estabas buscando, podrás contáctalos directamente y agendar el servicio que desees de acuerdo a la disponibilidad que tengan en sus respectivos calendarios.',
  },
  {
    image: `/images/blui-icon-3.png`,
    imgAlt: 'Imagen de una casa en nuestras manos',
    title: 'CALIFICA EL SERVICIO E INFORMÉMONOS EN COMUNIDAD',
    text: 'Una vez recibido el servicio podrás calificar el trabajo realizado por el prestador y dejar comentarios en su perfil de manera que toda la comunidad Blui pueda conocer tu experiencia.',
  },
];
