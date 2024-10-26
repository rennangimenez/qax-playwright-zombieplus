// @ts-check
const { test } = require('@playwright/test')
const { LoginPage } = require('../pages/LoginPage')
const { MoviesPage } = require('../pages/MoviesPage')
const { Toast } = require('../pages/Components')

let loginPage
let moviesPage
let toast

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page)
    moviesPage = new MoviesPage(page)
    toast = new Toast(page)
})

test('must login as admin', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'pwd123')
    await moviesPage.isLoggedIn()
})

test('must not login with wrong password', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'test123')

    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    await toast.haveText(message)
})

test('must not login when email is invalid', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('rennan.gimenez.com', 'pwd123')
    await loginPage.alertHaveText('Email incorreto')
})

test('must not login when email is not filled', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('', 'pwd123')
    await loginPage.alertHaveText('Campo obrigatório')
})

test('must not login when password is not filled', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', '')
    await loginPage.alertHaveText('Campo obrigatório')
})

test('must not login when fields are not filled', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('', '')
    await loginPage.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})