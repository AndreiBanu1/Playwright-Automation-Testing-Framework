export default class LoginPageElements {
    private readonly usernameInputSelector = "#username";
    private readonly passwordInputSelector = "#password";
    private readonly loginButtonSelector = "#Login";

    getUsernameInput() {
        return this.usernameInputSelector;
    }

    getPasswordInput() {
        return this.passwordInputSelector;
    }

    getLoginButton() {
        return this.loginButtonSelector;
    }
}
