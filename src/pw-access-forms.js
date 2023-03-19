/* eslint import/no-named-as-default-member: off */

import { LitElement, html } from 'lit';
import { dialogRenderer } from '@vaadin/dialog/lit';
import '@vaadin/text-field';
import '@vaadin/password-field';
import { collectFormData } from './utils/forms.js';
import requests from './utils/requests.js';

class PwAccessForm extends LitElement {
  static get is() {
    return 'pw-access-form';
  }

  static get properties() {
    return {
      isOpened: { type: Boolean, attribute: 'is-opened' },
      signUp: { type: Object },
      login: { type: Object },
    };
  }

  constructor() {
    super();
    this.isOpened = false;
    this.signUp = {
      fullName: '',
      password: '',
      confirmedPassword: '',
      hasError: false,
      errorMessage: '',
    };
    this.login = {
      hasError: false,
      errorMessage: '',
    };
  }

  render() {
    return html`
      <vaadin-dialog
        .opened=${this.isOpened}
        data-testid="access-form"
        ${dialogRenderer(this.renderAccessForms, [
          this.signUp.hasError,
          this.signUp.message,
        ])}
      >
      </vaadin-dialog>
    `;
  }

  renderAccessForms() {
    return html` ${this.renderRegister()} ${this.renderLogin()} `;
  }

  renderRegister() {
    const {
      fullName,
      password,
      confirmedPassword,
      hasError,
      errorMessage,
      message,
    } = this.signUp;

    return html`
      <form @submit=${this.doSignUp}>
        <h2>Registrate</h2>
        <vaadin-text-field
          name="fullName"
          label="Nombre"
          .value=${fullName}
          required
        >
        </vaadin-text-field>

        <vaadin-password-field
          name="password"
          label="Contraseña"
          autocomplete="password"
          .value=${password}
        >
        </vaadin-password-field>

        <vaadin-password-field
          label="Confirmar Contraseña"
          name="confirmedPassword"
          autocomplete="password"
          .value=${confirmedPassword}
        >
        </vaadin-password-field>
        ${message}
        <button>Registrar</button>
      </form>

      ${hasError ? html`<p>${errorMessage}</p>` : ''}
    `;
  }

  renderLogin() {
    return html`<h2>Login</h2>
      ${this.login.errorMessage}`;
  }

  async doSignUp(evt) {
    evt.preventDefault();
    const body = collectFormData(evt.target);
    const result = await requests.post(
      '/dummies/api/signup/success.json',
      body
    );

    this.signUp = { ...this.signUp, ...result };
  }
}

customElements.define(PwAccessForm.is, PwAccessForm);
