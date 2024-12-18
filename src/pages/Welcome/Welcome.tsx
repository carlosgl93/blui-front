import CommunityAdvantages from '@/components/CommunityAdvantages';
import ComoFunciona from '@/components/ComoFunciona';
import ImageSlider from '@/components/ImageSlider';
import Meta from '@/components/Meta';
import Servicios from '@/components/Servicios';
import { comoFuncionaCardsContent } from './comoFuncionaContent';

function Welcome() {
  return (
    <>
      <Meta title="Blui: Inicio" />
      <ImageSlider />
      <ComoFunciona
        subtitle={
          //   `
          //   Únete a Blui de forma gratuita y comienza a vivir esta nueva experiencia en la búsqueda de
          //   personas para ayudarte. Disfruta la posibilidad de poder formar tu propio equipo de
          //   apoyo de acuerdo a tus propias necesidades, intereses y presupuesto.'
          // `} old text wasnt actually explaining how it works so...
          `
        Blui es una plataforma que te permitirá encontrar personas de confianza y capacitadas en la asistencia y cuidado de adultos mayores y personas en situación de discapacidad con algún grado de dependencia. En Blui encontrarás:
        `
        }
        steps={comoFuncionaCardsContent}
      />
      <Servicios />
      <CommunityAdvantages />
      {/* <CommunitySupport /> */}
    </>
  );
}

export default Welcome;
