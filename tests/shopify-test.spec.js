const {test, expect, page} = require('@playwright/test');
const PasswordPage = require('../pages/PasswordPage')
const ProductPage = require('../pages/ProductPage')
const CartPage = require('../pages/CartPage');
const CatalogPage= require('../pages/CatalogPage');
const CheckoutPage = require('../pages/CheckoutPage');
const urlToTest = 'https://drpt-external-dev.myshopify.com/password';

test.describe('Shopify Test Spec', async () =>{
    test('POSITIVE - Should Be To Successfully Complete Checkout Flow', async ({page}) =>{
        const passwordPage = new PasswordPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const catalogPage = new CatalogPage(page);
        const checkoutPage = new CheckoutPage(page);
        await page.goto(urlToTest);
        await page.waitForTimeout(3000)
        await passwordPage.enterPassword('giclao');
        
        await catalogPage.searchProduct('Dropit Hamburger (QA Automation)');
        await catalogPage.selectProduct('Dropit Hamburger (QA Automation)');
        await productPage.addProductToCart('Large', 2);

        await catalogPage.verifyCartBadge(4);

        await cartPage.openCart();
        await cartPage.verifyTotalAmout('£56.99 GBP');
        await cartPage.proceedToCheckout();

        await checkoutPage.fillDetails({
            email: 'test@example.com',
            cardNumber: '1',  
            expirationDate: '12/26',
            securityCode: '777',
            nameOnCard: 'Bogus Gateway',
        });
        await checkoutPage.submitOrder();
    });
    test('NEGATIVE = Should Fail To Place An Order With Invalid Details', async ({page}) =>{
        const passwordPage = new PasswordPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const catalogPage = new CatalogPage(page);
        const checkoutPage = new CheckoutPage(page);

        await page.goto(urlToTest);
        await passwordPage.enterPassword('giclao');

        await catalogPage.searchProduct('Dropit Hamburger (QA Automation)');
        await catalogPage.selectProduct('Dropit Hamburger (QA Automation)');
        await productPage.addProductToCart('Small', 1);

        await catalogPage.searchProduct('Dropit Chips (QA Automation)');
        await catalogPage.selectProduct('Dropit Chips (QA Automation)');
        await productPage.addProductToCart('Small', 1);

        await catalogPage.openCart();
        await cartPage.verifyTotalAmout('£33.00 GBP');
        await cartPage.proceedToCheckout();

        await checkoutPage.fillInvalidDetails('invalid-email', '1234');
        await checkoutPage.verifyErrorMessage();
        await checkoutPage.attemptToPlaceOrder();
    });

    
})
