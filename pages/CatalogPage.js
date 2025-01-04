class CatalogPage {
    constructor(page) {
        this.page = page;
        this.searchInput = 'input[placeholder="Search"]';
        this.productTitle = (productName) => `text=${productName}`;
        this.cartBadge = 'css=button[aria-label="Cart"] .badge';
    }

    async searchProduct(productName) {
        await this.page.fill(this.searchInaput, productName);
        await this.page.press(this.searchInput, 'Enter');
        await this.page.waitForSelector(this.productTitle(productName)); // Ensure that the prdocut is found
    }

    async selectProduct(productName) {
        await this.page.click(this.productTitle(productName));
    }

    async verifyCartBadge(expectedCount) {
        const cartCount = await this.page.textContent(this.cartBadge);
        if (parseInt(cartCount.trim()) !== expectedCount) {
            throw new Error(`Expected cart badge count: ${expectedCount}, but got: ${cartCount}`);
        }       
    }
}
module.exports = CatalogPage;