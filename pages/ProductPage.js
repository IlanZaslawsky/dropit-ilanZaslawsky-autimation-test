class ProductPage {
    constructor(page) {
        this.page = page
        this.sizeSelector = 'select[name="size"]'
        this.quantityInput = 'input[name="quantity"]';
        this.addToCartButton = 'text=Add to cart';
    }

    async addProductToCart(size, quantity) {
        await this.page.selectOption(this.sizeSelector, size);
        await this.page.fill(this.quantityInput, quantity.toString());
        await this.page.click(this.addToCartButton);
    }
}
module.exports = ProductPage;