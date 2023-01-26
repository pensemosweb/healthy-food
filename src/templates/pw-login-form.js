import { LitElement, html, css } from 'lit-element';
import '@vaadin/button';
import '@vaadin/password-field';
import '@vaadin/email-field';

class PwLoginForm extends LitElement {
  static get properties() {
    return {
      email: { type: String },
      password: { type: String },
      errorMessage: { type: String },
    };
  }
  static get styles() {
    return css`
      form {
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
      }
      vaadin-text-button {
        margin: 20px;
      }
    `;
  }

  constructor() {
    super();
    this.email = '';
    this.password = '';
    this.errorMessage = '';
  }

  handleSubmit(event) {
    console.log(event);
    event.preventDefault();

    // Envía una petición para comprobar que las credenciales email y password son correctas.
    // Si sí lo son, (email y password correctos), redirije al usuario a su /feed?/tablero?
    // Si no lo son, (email y password incorrectos), muestra un mensaje de error.
    console.log('Iniciando sesión');
  }

  render() {
    return html`
      <form @submit="${this.handleSubmit}">
        <vaadin-email-field
          label="Email"
          data-testid="email-login"
          helper-text="Revise que su correo electrónico sea el correcto."
          .value="${this.email}"
          @input="${e => (this.email = e.target.value)}"
          error-message="Ingrese una dirección válida de email."
          required
        ></vaadin-email-field>
        <vaadin-password-field
          label="Contraseña"
          data-testid="password-login"
          helper-text="Se pide un mínimo de 10 caracteres e incluir al menos un caracter especial, una letra y un número."
          pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[.#$%&_-]).{10,}$"
          .value="${this.password}"
          @input="${e => (this.password = e.target.value)}"
          error-message="No es una contraseña válida."
          required
        ></vaadin-password-field>
        <div>${this.errorMessage}</div>
        <br />
        <vaadin-button @click="${this.handleSubmit}">Ingresar</vaadin-button>
      </form>
    `;
  }
}
customElements.define('pw-login-form', PwLoginForm);
