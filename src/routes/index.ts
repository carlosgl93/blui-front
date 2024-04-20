import asyncComponentLoader from '@/utils/loader';

import { Pages, Routes } from './types';

const routes: Routes = {
  [Pages.Welcome]: {
    component: asyncComponentLoader(() => import('@/pages/Welcome')),
    path: '/',
    title: 'Inicio',
  },
  [Pages.Nosotros]: {
    component: asyncComponentLoader(() => import('@/pages/Nosotros')),
    path: '/nosotros',
    title: 'Nosotros',
  },
  [Pages.Ayuda]: {
    component: asyncComponentLoader(() => import('@/pages/Page2')),
    path: '/ayuda',
    title: 'Ayuda',
  },
  [Pages.Ingresar]: {
    component: asyncComponentLoader(() => import('@/pages/Ingresar')),
    path: '/ingresar',
    title: 'Ingresar',
  },
  [Pages.RegistrarPrestador]: {
    component: asyncComponentLoader(() => import('@/pages/RegistrarPrestador')),
    path: '/registrar-prestador',
    title: 'Registrarse',
  },
  [Pages.RegistrarUsuario]: {
    component: asyncComponentLoader(() => import('@/pages/RegistrarUsuario')),
    path: '/registrar-usuario',
    title: 'Registrarse',
  },
  [Pages.Prestador]: {
    component: asyncComponentLoader(() => import('@/pages/PersonaApoyo')),
    path: '/persona-de-apoyo',
    title: 'Registrarse',
  },
  [Pages.Comenzar]: {
    component: asyncComponentLoader(() => import('@/pages/Page2')),
    path: '/comenzar',
    title: 'Comenzar',
  },
  [Pages.Comienzo]: {
    component: asyncComponentLoader(() => import('@/pages/Comienzo')),
    path: '/comienzo',
  },
  [Pages.EntregaApoyo]: {
    component: asyncComponentLoader(() => import('@/pages/EntregaApoyo')),
    path: '/entrega-apoyo',
  },
  [Pages.RecibeApoyo]: {
    component: asyncComponentLoader(() => import('@/pages/RecibeApoyo')),
    path: '/recibe-apoyo',
  },
  [Pages.Resultados]: {
    component: asyncComponentLoader(() => import('@/pages/Resultados')),
    path: '/resultados',
  },
  [Pages.PerfilPrestador]: {
    component: asyncComponentLoader(() => import('@/pages/PerfilPrestador')),
    path: '/perfil-prestador/:id',
  },
  [Pages.PreviewPerfilPrestador]: {
    component: asyncComponentLoader(() => import('@/pages/PreviewPerfilPrestador')),
    path: '/preview-perfil-prestador/',
  },
  [Pages.ConstruirPerfil]: {
    component: asyncComponentLoader(() => import('@/pages/ConstruirPerfil')),
    path: '/construir-perfil',
  },
  [Pages.Disponibilidad]: {
    component: asyncComponentLoader(() => import('@/pages/ConstruirPerfil/Disponibilidad')),
    path: '/construir-perfil/disponibilidad',
  },
  [Pages.EditarComunasPrestador]: {
    component: asyncComponentLoader(() => import('@/pages/ConstruirPerfil/Comunas')),
    path: '/construir-perfil/comunas',
  },
  [Pages.Tarifas]: {
    component: asyncComponentLoader(() => import('@/pages/ConstruirPerfil/Tarifas')),
    path: '/construir-perfil/tarifas',
  },
  [Pages.Experiencia]: {
    component: asyncComponentLoader(() => import('@/pages/ConstruirPerfil/Experiencia')),
    path: '/construir-perfil/experiencia',
  },
  [Pages.CuentaBancaria]: {
    component: asyncComponentLoader(() => import('@/pages/ConstruirPerfil/CuentaBancaria')),
    path: '/construir-perfil/cuentaBancaria',
  },
  [Pages.HistorialLaboral]: {
    component: asyncComponentLoader(() => import('@/pages/ConstruirPerfil/HistorialLaboral')),
    path: '/construir-perfil/historialLaboral',
  },
  [Pages.EducacionFormacion]: {
    component: asyncComponentLoader(() => import('@/pages/ConstruirPerfil/EducacionFormacion')),
    path: '/construir-perfil/educacionFormacion',
  },
  [Pages.Chat]: {
    component: asyncComponentLoader(() => import('@/pages/Chat')),
    path: '/chat/',
  },
  [Pages.PrestadorChat]: {
    component: asyncComponentLoader(() => import('@/pages/PrestadorChat')),
    path: '/prestador-chat',
  },
  [Pages.PrestadorInbox]: {
    component: asyncComponentLoader(() => import('@/pages/PrestadorInbox')),
    path: '/prestador-inbox',
  },
  [Pages.UsuarioInbox]: {
    component: asyncComponentLoader(() => import('@/pages/UsuarioInbox')),
    path: '/usuario-inbox',
  },
  [Pages.PerfilUsuario]: {
    component: asyncComponentLoader(() => import('@/pages/PerfilUsuario')),
    path: '/perfil-usuario/:id',
  },
  [Pages.UsuarioDashboard]: {
    component: asyncComponentLoader(() => import('@/pages/UsuarioDashboard')),
    path: '/usuario-dashboard',
  },
  [Pages.EmailVerificado]: {
    component: asyncComponentLoader(() => import('@/pages/EmailVerificado')),
    path: '/email-verificado',
  },
  [Pages.EmailVerificadoPrestador]: {
    component: asyncComponentLoader(() => import('@/pages/EmailVerificadoPrestador')),
    path: '/email-verificado-prestador',
  },
  [Pages.PrestadorDashboard]: {
    component: asyncComponentLoader(() => import('@/pages/PrestadorDashboard')),
    path: '/prestador-dashboard',
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
  },
};

export const protectedRoutes = [
  '/prestador-dashboard',
  '/email-verificado-prestador',
  '/construir-perfil',
  '/construir-perfil/disponibilidad',
  '/construir-perfil/comunas',
  '/construir-perfil/tarifas',
  '/construir-perfil/experiencia',
  '/construir-perfil/cuentaBancaria',
  '/construir-perfil/historialLaboral',
  '/construir-perfil/educacionFormacion',
  '/chat',
  '/prestador-chat',
  '/prestador-inbox',
  '/usuario-inbox',
  '/perfil-usuario',
  '/usuario-dashboard',
  '/email-verificado',
];

export default routes;
