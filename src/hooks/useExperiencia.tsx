import { getAllExperiences, saveExperiences } from '@/api/experience';
import {
  aggregatedExperienceState,
  allExperiencesState,
  ExperienceOption,
  ExperienceType,
} from '@/store/construirPerfil/experiencia';
import { notificationState } from '@/store/snackbar';
import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useAuthNew } from './useAuthNew';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useExperiencia = () => {
  const [notification, setNotification] = useRecoilState(notificationState);
  const [aggregatedExperience, setAggregatedExperience] = useRecoilState(aggregatedExperienceState);
  const experienceOptions = useRecoilValue(allExperiencesState);

  const queryClient = useQueryClient();

  const { prestador } = useAuthNew();
  const providerId = prestador?.id;

  const {
    data: allExperiences,
    isError,
    isLoading,
    error,
  } = useQuery(['allExperiences'], () => getAllExperiences(providerId ?? ''), {
    enabled: Boolean(providerId?.length),
    onError: (error: { message: string }) => {
      setNotification({
        ...notification,
        open: true,
        message: error.message,
        severity: 'error',
      });
    },

    onSuccess: (data) => {
      setAggregatedExperience(data);
    },
  });

  const {
    isLoading: saveExpLoading,
    error: saveExpError,
    mutate,
  } = useMutation(() => saveExperiences(providerId ?? '', aggregatedExperience), {
    onSuccess: () => {
      // Handle success
      setNotification({
        ...notification,
        open: true,
        message: 'Experiencia guardada',
        severity: 'success',
      });
      // invalidate prestador Experiences
      queryClient.invalidateQueries('prestadorExperience');
    },
    onError: (error: AxiosError) => {
      // Handle error
      console.log({ error });
      setNotification({
        ...notification,
        open: true,
        message: `Hubo un error, intentalo nuevamente: ${error.message}`,
        severity: 'error',
      });
    },
    onMutate: () => {
      setNotification({
        ...notification,
        open: true,
        message: 'Guardando experiencia...',
        severity: 'info',
      });
    },
  });

  const selectPreviousExperience = (option: ExperienceOption) => {
    const { id, label } = option;
    setAggregatedExperience((prev) => {
      const experience = prev.find((exp) => exp.id === id);
      if (experience) {
        return prev.filter((e) => e.id !== id);
      } else {
        return [
          ...prev,
          {
            id,
            name: label,
            type: [],
            mainAreas: [],
            otherAreas: [],
          },
        ];
      }
    });
  };

  const detectPreviousExperience = (id: number) => {
    return Boolean(aggregatedExperience?.find((e) => e.id === id));
  };

  const selectExperienceType = (type: ExperienceType, id: number) => {
    const experience = aggregatedExperience.find((exp) => exp.id === id);
    if (experience) {
      setAggregatedExperience((prev) => {
        return prev.map((exp) => {
          if (exp.id === id) {
            return {
              ...exp,
              type: exp.type.includes(type)
                ? exp.type.filter((item) => item !== type)
                : [...exp.type, type],
              mainAreas: [...exp.mainAreas],
              otherAreas: [...exp.otherAreas],
            };
          }
          return exp;
        });
      });
    }
  };

  const detectSelectedExperienceType = (type: ExperienceType, id: number) => {
    return Boolean(aggregatedExperience?.find((e) => e.id === id)?.type.includes(type));
  };

  const selectMainExperienceAreas = (label: string, id: number) => {
    setAggregatedExperience((prev) => {
      return prev.map((exp) => {
        if (exp.id === id) {
          return {
            ...exp,
            type: [...exp.type],
            mainAreas: exp.mainAreas.includes(label)
              ? exp.mainAreas.filter((item) => item !== label)
              : exp.mainAreas.length >= 3
              ? [...exp.mainAreas.slice(1), label]
              : [...exp.mainAreas, label],
            otherAreas: exp.otherAreas.includes(label)
              ? exp.otherAreas.filter((l) => l !== label)
              : [...exp.otherAreas, label],
          };
        }
        return exp;
      });
    });
  };

  const detectMainExperienceAreas = (label: string, id: number) => {
    return Boolean(aggregatedExperience?.find((e) => e.id === id)?.mainAreas.includes(label));
  };

  const detectOtherExperienceAreas = (label: string, id: number) => {
    return Boolean(aggregatedExperience?.find((e) => e.id === id)?.otherAreas.includes(label));
  };

  const selectOtherExperienceAreas = (label: string, id: number) => {
    setAggregatedExperience((prev) => {
      return prev.map((exp) => {
        if (exp.id === id) {
          return {
            ...exp,
            type: [...exp.type],
            mainAreas: [...exp.mainAreas],
            otherAreas: exp.otherAreas.includes(label)
              ? exp.otherAreas.filter((item) => item !== label)
              : [...exp.otherAreas, label],
          };
        }
        return exp;
      });
    });
  };

  const handleSaveExperience = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!providerId?.length) {
      navigate('/ingresar');
    }
  }, []);

  return {
    saveExpError,
    saveExpLoading,
    isLoading,
    isError,
    error,
    experienceOptions,
    aggregatedExperience,
    allExperiences,
    selectPreviousExperience,
    detectPreviousExperience,
    selectExperienceType,
    detectSelectedExperienceType,
    selectMainExperienceAreas,
    detectMainExperienceAreas,
    detectOtherExperienceAreas,
    selectOtherExperienceAreas,
    handleSaveExperience,
    setAggregatedExperience,
  };
};
