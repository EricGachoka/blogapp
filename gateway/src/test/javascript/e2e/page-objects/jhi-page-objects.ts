import { element, by, ElementFinder, browser, ExpectedConditions as ec } from 'protractor';

/* eslint @typescript-eslint/no-use-before-define: 0 */
export class NavBarPage {
  entityMenu = element(by.id('entity-menu'));
  accountMenu = element(by.id('account-menu'));
  adminMenu!: ElementFinder;
  signIn = element(by.id('login'));
  register = element(by.css('[routerLink="account/register"]'));
  signOut = element(by.id('logout'));
  passwordMenu = element(by.css('[routerLink="account/password"]'));
  settingsMenu = element(by.css('[routerLink="account/settings"]'));

  constructor(asAdmin?: boolean) {
    if (asAdmin) {
      this.adminMenu = element(by.id('admin-menu'));
    }
  }

  async clickOnEntityMenu(): Promise<void> {
    await this.entityMenu.click();
  }

  async clickOnAccountMenu(): Promise<void> {
    await this.accountMenu.click();
  }

  async clickOnAdminMenu(): Promise<void> {
    await this.adminMenu.click();
  }

  async clickOnSignIn(): Promise<void> {
    await this.signIn.click();
  }

  async clickOnRegister(): Promise<void> {
    await this.signIn.click();
  }

  async clickOnSignOut(): Promise<void> {
    await this.signOut.click();
  }

  async clickOnPasswordMenu(): Promise<void> {
    await this.passwordMenu.click();
  }

  async clickOnSettingsMenu(): Promise<void> {
    await this.settingsMenu.click();
  }

  async clickOnEntity(entityName: string): Promise<void> {
    await element(by.css('[routerLink="' + entityName + '"]')).click();
  }

  async clickOnAdmin(entityName: string): Promise<void> {
    await element(by.css('[routerLink="admin/' + entityName + '"]')).click();
  }

  async getSignInPage(): Promise<SignInPage> {
    await this.clickOnAccountMenu();
    await this.clickOnSignIn();
    return new SignInPage();
  }

  async goToEntity(entityName: string): Promise<void> {
    await this.clickOnEntityMenu();
    await this.clickOnEntity(entityName);
  }

  async goToSignInPage(): Promise<void> {
    await this.clickOnAccountMenu();
    await this.clickOnSignIn();
  }

  async goToPasswordMenu(): Promise<void> {
    await this.clickOnAccountMenu();
    await this.clickOnPasswordMenu();
  }

  async autoSignOut(): Promise<void> {
    await this.clickOnAccountMenu();
    await this.clickOnSignOut();
  }
}

export class SignInPage {
  username = element(by.name('username'));
  password = element(by.name('password'));
  loginButton = element(by.css('input[type=submit]'));

  async setUserName(username: string): Promise<void> {
    await this.username.sendKeys(username);
  }

  async getUserName(): Promise<string> {
    return this.username.getAttribute('value');
  }

  async clearUserName(): Promise<void> {
    await this.username.clear();
  }

  async setPassword(password: string): Promise<void> {
    await this.password.sendKeys(password);
  }

  async getPassword(): Promise<string> {
    return this.password.getAttribute('value');
  }

  async clearPassword(): Promise<void> {
    await this.password.clear();
  }

  async loginWithOAuth(username: string, password: string): Promise<void> {
    // Entering non angular site, tell webdriver to switch to synchronous mode.
    await browser.waitForAngularEnabled(false);
    await browser.wait(ec.presenceOf(this.username), 5000);

    if (await this.username.isPresent()) {
      await this.username.sendKeys(username);
      await this.password.sendKeys(password);
      await this.loginButton.click();
      if (!(await this.username.isPresent())) {
        await browser.waitForAngularEnabled(true);
      }
    } else {
      // redirected back because already logged in
      browser.waitForAngularEnabled(true);
    }
  }

  async login(): Promise<void> {
    await this.loginButton.click();
  }
}
