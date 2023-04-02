import { LitElement, html, css } from 'lit';
import { dialogRenderer } from '@vaadin/dialog/lit.js';

import './components/pw-publish-form/pw-publish-form.js';

import '@vaadin/button';
import '@vaadin/dialog';

export class HealthyFood extends LitElement {
  static get styles() {
    return css`
      :host {
        background-color: var(--healthy-food-background-color);
      }

      main {
        margin-top: 6rem;
      }
    `;
  }

  static get properties() {
    return {
      isAccessFormOpened: { type: Boolean, state: true },
      isPublishFormOpened: { type: Boolean, state: true },
    };
  }

  constructor() {
    super();
    this.isAccessFormOpened = false;
  }

  render() {
    return html`
      <main>
        <h1>Healthy Food</h1>
        <vaadin-button data-testid="publish" @click=${this.openAccessForm}>
          Acceder
        </vaadin-button>

        <vaadin-button
          data-testid="publish"
          @click=${() => {
            this.isPublishFormOpened = true;
          }}
        >
          Publicar
        </vaadin-button>

        <vaadin-dialog
          .opened=${this.isAccessFormOpened}
          @opened-changed=${this.accessFormChanged}
          data-testid="access-form"
        >
          <pw-login></pw-login>
          <!-- Alex -->
          <pw-register></pw-register>
          <!-- Pepe -->
        </vaadin-dialog>

        <vaadin-dialog
          .opened=${this.isPublishFormOpened}
          data-testid="publish-form"
          @opened-changed=${e => {
            this.isPublishFormOpened = e.detail.value;
          }}
          ${dialogRenderer(() => html`<pw-publish-form></pw-publish-form>`, [])}
        >
        </vaadin-dialog>
      </main>
    `;
  }

  openAccessForm() {
    this.isAccessFormOpened = true;
  }

  accessFormChanged(e) {
    this.isAccessFormOpened = e.detail.value;
  }
}
