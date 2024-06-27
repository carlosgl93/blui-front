import { test, expect } from '@playwright/test';
import { goToEnvUrl } from './utils/goToEnvUrl';

test('test', async ({ page }) => {
  await page.goto(goToEnvUrl());
  await page.getByRole('list').getByRole('link', { name: 'Comenzar' }).click();
  await page.getByRole('link', { name: 'Entregar apoyo' }).click();
  await page.getByPlaceholder('Indicanos tu comuna').click();
  await page.getByPlaceholder('Indicanos tu comuna').fill('Provi');
  await page.getByPlaceholder('Indicanos tu comuna').press('Enter');
  await page.getByText('Providencia').click();
  await page.getByRole('button', { name: 'Siguiente' }).click();
  await page.getByRole('button', { name: 'Soporte Terapéutico' }).click();
  await page.getByRole('button', { name: 'Siguiente' }).click();
  await page.getByPlaceholder('Ingresa tu nombre').click();
  await page.getByPlaceholder('Ingresa tu nombre').fill('prestador');
  await page.getByPlaceholder('Ingresa tu nombre').press('Tab');
  await page.getByPlaceholder('Ingresa tus apellidos').fill('test');
  await page.getByPlaceholder('Ingresa tus apellidos').press('Tab');
  await page.getByPlaceholder('-5').fill('18445810-1');
  await page.getByPlaceholder('-5').press('Tab');
  await page.getByPlaceholder('Ingresa tu email').fill('prestador@gmail.com');
  await page.getByPlaceholder('Ingresa tu email').press('Tab');
  await page.getByPlaceholder('Ingrese una contraseña').fill('123456');
  await page.getByPlaceholder('Ingrese una contraseña').press('Tab');
  await page.getByPlaceholder('Confirme su contraseña').fill('123456');
  await page.getByPlaceholder('Confirme su contraseña').press('Tab');
  await page.getByRole('button', { name: 'Siguiente' }).press('Enter');
  await expect(page.locator('#root')).toContainText('Construyamos tu perfil');
});