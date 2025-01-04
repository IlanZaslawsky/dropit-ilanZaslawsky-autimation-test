class CartPage { 
    constructor(page) {
        this.page = page;
        this.cartButton = 'css=button[aria-label="Cart"]';
        this.checkoutButton = 'text=Check Out';
        this.totalAmount = 'css=div.total-line--grand-total span';
    }

    async openCart() {
        await this.page.click(this.cartButton);
        await this.page.waitForSelector('text=Your Cart'); // Ensure that CartPage Reached
    }

    async proceedToCheckout() {
        await this.page.click(this.checkoutButton);
    }

    async verifyTotalAmout(expectedTotal) {
        const total = await this.page.textContent(this.totalAmount);
        if (total.trim() !== expectedTotal) {
            throw new Error(`Expected total: ${expectedTotal}, but got: ${total}`);
        }
    }
}
module.exports = CartPage;