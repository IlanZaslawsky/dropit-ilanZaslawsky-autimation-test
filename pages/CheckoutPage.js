class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.formFields = {
        email: 'input[name="email"]',
        cardNumber: 'input[name="card_number"]'
        };
        this.payNowButton = 'text=Pay now';
        this.orderConfirmation = 'text=Thank you for your order';
        this.emailError = 'text=Enter a valid email';
        this.header = 'header';
    }
    
    async verifyOrderConfirmation() {
        await this.page.waitForSelector(this.orderConfirmation);
    }

    async submitOrder() {
        await this.page.click(this.payNowButton);
        this.verifyOrderConfirmation;
    }

    async verifyErrorMessage() {
        const emailErrorVisible = await this.page.isVisible(this.emailError);
        if (!emailErrorVisible) {
            throw new Error('Expected email error message not displayed.')
        }
        const headerColor = await this.page.evaluate(
            (header) => getComputedStyle(document.querySelector(header)).color,
            this.header
        );

        if (headerColor !== 'rgb(255, 0, 0)') { //red color is rgb(255, 0, 0))
            throw new Error(`Expected header color to be red, but got: ${headerColor}`);
        }
    }

    async fillInvalidDetails(invalidEmail, invalidCardNumber) {
        await this.page.fill(this.formFields.email, invalidEmail);
        await this.page.fill(this.formFields.cardNumber, invalidCardNumber);
    }

    async attemptToPlaceOrder() {
        await this.page.click(this.payNowButton);
        const isOrderConfirmed = await this.page.isVisible(this.orderConfirmation);
        if (isOrderConfirmed) {
            throw new Error('Order should not have been placed with invalid details.')
        }
    }
}
module.exports = CheckoutPage;