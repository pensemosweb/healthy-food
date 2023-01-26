import { LitElement, html, css } from 'lit';
import '@vaadin/button';
import '@vaadin/dialog';
import './pw-login-form';

class PwAutenticacion extends LitElement {
  static get properties() {
    return {
      isLogin: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.isLogin = false;
  }

  toggleModal() {
    this.isLogin = !this.isLogin;
  }

  render() {
    return html`
      ${this.isLogin
        ? html`
            <form><pw-login-form></pw-login-form></form>
            <br />
            <hr />
            <vaadin-button style="float: right" @click="${this.toggleModal}"
              >Cambiar a Registrarse</vaadin-button
            ><br />
          `
        : html`
            <form>
              <label>
                Nombre:
                <input type="text" required />
              </label>
              <label>
                Email:
                <input type="email" required />
              </label>
              <label>
                Contraseña:
                <input type="password" required />
              </label>
              <label>
                Confirme contraseña:
                <input type="password" required />
              </label>
              <button type="submit">Registrarse</button>
            </form>
            <br />
            <hr />
            <vaadin-button style="float: right" @click="${this.toggleModal}"
              >Cambiar a Login</vaadin-button
            ><br />
          `}
    `;
  }
}

customElements.define('pw-autenticacion', PwAutenticacion);
