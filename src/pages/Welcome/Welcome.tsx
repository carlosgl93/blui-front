import CommunityAdvantages from '@/components/CommunityAdvantages';
import ComoFunciona from '@/components/ComoFunciona';
import ImageSlider from '@/components/ImageSlider';
import Meta from '@/components/Meta';
import Servicios from '@/components/Servicios';
import CommunitySupport from '@/components/CommunitySupport';
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
        Blui es una plataforma que te permite encontrar personas de confianza que pueda ayudarte. 
        Puedes encontrar soporte terapeutico (ocupacional, kine, fono, podología y más), enfermería (general y técnico), cuidado o acompañamiento.
        
        `
        }
        steps={comoFuncionaCardsContent}
      />
      <Servicios />
      <CommunityAdvantages />
      <CommunitySupport />
    </>
  );
}

export default Welcome;
