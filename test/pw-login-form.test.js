import { fixture, html, expect } from '@open-wc/testing';
import '../src/templates/pw-login-form.js';

describe('Given two input values required to perform the PwLoginForm, both should update when changed', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<pw-login-form></pw-login-form>`);
  });

  it('When email input value changes, Then the email property is updated', async () => {
    const emailInput = element.shadowRoot.querySelector(
      '[data-testid="email-login"]'
    );

    emailInput.value = 'correo@depaco.com';
    emailInput.dispatchEvent(new InputEvent('input'));
    await element.updateComplete;

    expect(element.email).to.equal('correo@depaco.com');
  });

  it('When password input value changes, Then the password property is updated', async () => {
    const passwordInput = element.shadowRoot.querySelector(
      '[data-testid="password-login"]'
    );

    passwordInput.value = 'password.123';
    passwordInput.dispatchEvent(new InputEvent('input'));
    await element.updateComplete;

    expect(element.password).to.equal('password.123');
  });
});
