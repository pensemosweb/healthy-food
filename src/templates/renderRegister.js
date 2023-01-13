import { html } from 'lit';
import '@vaadin/text-field';
import '@vaadin/password-field';

export default function renderRegister(
  fullName = '',
  password = '',
  confirmedPassword = '') {
  return html`
    <form>
      <h2>Registrate</h2>
      <vaadin-text-field
        name="fullName"
        label="Nombre"
        .value=${fullName}
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
    </form>
  `;  
};