// @ts-check
const { test, expect } = require('@playwright/test');

test('must register a lead in the waiting queue', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: /Aperte o play/ }).click()

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')

  await page.getByPlaceholder('Seu nome completo').fill('Rennan Gimenez')
  await page.getByPlaceholder('Seu email principal').fill('contato.rennang@gmail.com')

  await page.getByTestId('modal').getByText('Quero entrar na fila!').click()

  // This is a way to get the HTML from the page in the same time the toast is visible on it
  /*await page.getByText('seus dados conosco').click()
  const content = await page.content()
  console.log(content)*/

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await expect(page.locator('.toast')).toHaveText(message)

  await expect(page.locator('.toast')).toBeHidden({ timeout: 5000 })
});

test('must not register a lead with wrong email', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: /Aperte o play/ }).click()

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')

  await page.getByPlaceholder('Seu nome completo').fill('Rennan Gimenez')
  await page.getByPlaceholder('Seu email principal').fill('rennan.gimenez')

  await page.getByTestId('modal').getByText('Quero entrar na fila!').click()

  await expect(page.locator('.alert')).toHaveText('Email incorreto')
});