class PasswordPage {
    constructor(page) {
        this.page;
        this.passwordInput = 'input[type="password"]';
        this.enterButton = 'text=Enter';
    }

    async enterPassword(password) {
        await this.page.fill(this.passwordInput, password);
        await this.page.locator(this.enterButton).first.click();
        await this.page.waitForSelector('text=Catalog');
    }
}
module.exports = PasswordPage