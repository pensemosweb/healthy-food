import { LitElement, html, css } from 'lit';
import '@vaadin/button';
import '@vaadin/dialog';
import './pw-access-forms.js';

export class HealthyFood extends LitElement {
  static get styles() {
    return css`
      :host {
        background-color: var(--hf-bg-color);
        display: block;
      }
    `;
  }

  static get properties() {
    return {
      isAccessFormsOpened: { type: Boolean, state: true },
      signUp: { type: Object, state: true },
    };
  }

  constructor() {
    super();
    this.isAccessFormsOpened = false;
    this.signUp = { hasError: false, message: '' };
  }

  render() {
    return html`
      <main>
        <h1>Healthy Food</h1>
        <vaadin-button data-testid="publish" @click=${this.openAccessForm}>
          Publicar
        </vaadin-button>

        <pw-access-form
          data-testid="access-form"
          .isOpened=${this.isAccessFormsOpened}
        ></pw-access-form>
      </main>
    `;
  }

  openAccessForm() {
    this.isAccessFormsOpened = true;
  }

  accessFormChanged(e) {
    this.isAccessFormsOpened = e.detail.value;
  }
}
