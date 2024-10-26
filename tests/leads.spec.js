// @ts-check
const { test, expect } = require('@playwright/test');
const { LandingPage } = require('./pages/LandingPage')

test('must register a lead in the waiting queue', async ({ page }) => {
  const landingPage = new LandingPage(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Rennan Gimenez', 'contato.rennang@gmail.com')

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await landingPage.toastHaveText(message)
});

test('must not register a lead with wrong email', async ({ page }) => {
  const landingPage = new LandingPage(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Rennan Gimenez', 'rennan.gimenez')

  await landingPage.alertHaveText('Email incorreto')
});

test('must not register when the name is not filled', async ({ page }) => {
  const landingPage = new LandingPage(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', 'contato.rennang@gmail.com')

  await landingPage.alertHaveText('Campo obrigatório')
});

test('must not register when the email is not filled', async ({ page }) => {
  const landingPage = new LandingPage(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Rennan Gimenez', '')
  
  await landingPage.alertHaveText('Campo obrigatório')
});

test('must not register when the fields are not filled', async ({ page }) => {
  const landingPage = new LandingPage(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', '')

  await landingPage.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])
});