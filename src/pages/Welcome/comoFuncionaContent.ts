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
    title: 'Busca una persona de apoyo',
    text: 'Busca libremente a la persona que pueda brindarte el apoyo que necesitas. Podrás filtrar tu búsqueda según el servicio que requieras y de acuerdo a los perfiles de trabajadores independientes que se encuentren en nuestra comunidad Blui y que mejor se adapten a tus propias necesidades, requerimientos y disponibilidad.',
  },
  {
    image: `/images/blui-icon-2.png`,
    imgAlt: 'Imagen de un saludo con un apreton de manos',
    title: 'Agenda una sesión de apoyo',
    text: 'Una vez que encuentres los perfiles que estabas buscando, podrás contáctalos directamente y agendar el servicio que desees de acuerdo a la disponibilidad que tengan en sus respectivos calendarios. Al momento de agendar tu hora el monto cancelado será transferido a una cuenta de  Blui.',
  },
  {
    image: `/images/blui-icon-3.png`,
    imgAlt: 'Imagen de una casa en nuestras manos',
    title: 'Califica el servicio e informémonos en comunidad',
    text: 'Una vez recibido el servicio podrás calificar el trabajo realizado por el prestador y dejar comentarios en su perfil de manera que toda la comunidad Blui pueda conocer tu experiencia. Al momento de confirmar la sesión recibida el monto cancelado será transferido al prestador.',
  },
];
