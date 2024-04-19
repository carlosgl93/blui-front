import { atom } from 'recoil';

import {
  ElderlyOutlined as ElderlyOutlinedIcon,
  LoopOutlined as LoopOutlinedIcon,
  AccessibleOutlined as AccessibleOutlinedIcon,
  PsychologyAltOutlined as PsychologyAltOutlinedIcon,
  Elderly as ElderlyIcon,
  Loop as LoopIcon,
  Accessible as AccessibleIcon,
  Psychology as PsychologyIcon,
} from '@mui/icons-material';

import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';
import { generalExperiences } from '@/utils/constants';

export type ExperienceType = 'Personal' | 'Profesional'[];

export type ExperienceOption = {
  id: number;
  label: string;
  icon: OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>> & {
    muiName: string;
  };
  checkedIcon: OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>> & {
    muiName: string;
  };
  specialities: Array<{
    id: number;
    label: string;
  }>;
};

export type ExperienceState = {
  id: number;
  name: string;
  type: ExperienceType[];
  mainAreas: string[];
  otherAreas: string[];
}[];

export const generalExperienceState = atom<number[]>({
  key: 'generalExperienceState',
  default: [],
});

export const experienceTypeState = atom<string[]>({
  key: 'experienceTypeState',
  default: [],
});

export const mainExperienceAreasState = atom<string[]>({
  key: 'mainExperienceAreasState',
  default: [],
});

export const otherExperienceAreasState = atom<string[]>({
  key: 'otherExperienceAreasState',
  default: [],
});

export const aggregatedExperienceState = atom<ExperienceState>({
  key: 'aggregatedExperienceState',
  default: [],
});

export const allExperiencesState = atom<ExperienceOption[]>({
  key: 'allExperiencesState',
  default: generalExperiences,
});

export const mapExperiencesToState = (
  experiences: {
    id: number;
    label: string;
    specialities: [
      {
        id: number;
        label: string;
      },
    ];
  }[],
): ExperienceOption[] => {
  return experiences?.map((exp) => {
    switch (exp.label) {
      case 'Adultos Mayores':
        return {
          id: exp.id,
          label: exp.label,
          icon: ElderlyOutlinedIcon,
          checkedIcon: ElderlyOutlinedIcon,
          specialities: exp.specialities,
        };
      case 'Condiciones crónicas':
        return {
          id: exp.id,
          label: exp.label,
          icon: LoopOutlinedIcon,
          checkedIcon: LoopIcon,
          specialities: exp.specialities.map((s) => {
            return {
              id: s.id,
              label: s.label,
            };
          }),
        };

      case 'Discapacidad':
        return {
          id: exp.id,
          label: exp.label,
          icon: AccessibleOutlinedIcon,
          checkedIcon: AccessibleIcon,
          specialities: exp.specialities.map((s) => {
            return {
              id: s.id,
              label: s.label,
            };
          }),
        };

      case 'Salud mental':
        return {
          id: exp.id,
          label: exp.label,
          icon: PsychologyAltOutlinedIcon,
          checkedIcon: PsychologyIcon,
          specialities: exp.specialities.map((s) => {
            return {
              id: s.id,
              label: s.label,
            };
          }),
        };

      default:
        return {
          id: exp.id,
          label: exp.label,
          icon: ElderlyOutlinedIcon,
          checkedIcon: ElderlyIcon,
          specialities: exp?.specialities?.map((s) => {
            return {
              id: s.id,
              label: s.label,
            };
          }),
        };
    }
  });
};
