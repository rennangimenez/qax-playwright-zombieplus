// @ts-check
const { test } = require('@playwright/test')
const { faker } = require('@faker-js/faker')
const { LandingPage } = require('../pages/LandingPage')
const { Toast } = require('../pages/Components')

let landingPage
let toast

test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page)
  toast = new Toast(page)
})

test('must register a lead in the waiting queue', async ({ page }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(leadName, leadEmail)

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await toast.haveText(message)
})

test('must not register a lead with wrong email', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Rennan Gimenez', 'rennan.gimenez')

  await landingPage.alertHaveText('Email incorreto')
})

test('must not register when the name is not filled', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', 'contato.rennang@gmail.com')

  await landingPage.alertHaveText('Campo obrigatório')
})

test('must not register when the email is not filled', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Rennan Gimenez', '')

  await landingPage.alertHaveText('Campo obrigatório')
})

test('must not register when the fields are not filled', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', '')

  await landingPage.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])
})