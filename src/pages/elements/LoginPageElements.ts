export default class LoginPageElements {
    private readonly usernameInputSelector = "#username";
    private readonly usernameInputSelectors = ["#username",'input[name="username"]', ".username", "//*[@id='username]"];
    private readonly passwordInputSelector = "#password";
    private readonly loginButtonSelector = "#Login";

    getUsernameInput() {
        return this.usernameInputSelector;
    }

    getUsernameInputs() {
        return this.usernameInputSelectors;
    }

    getPasswordInput() {
        return this.passwordInputSelector;
    }

    getLoginButton() {
        return this.loginButtonSelector;
    }
}
