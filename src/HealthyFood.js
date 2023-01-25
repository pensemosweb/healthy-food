import { LitElement, html, css } from 'lit';
import { dialogRenderer } from '@vaadin/dialog/lit.js';

import './templates/pw-publish-form.js';

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
          Publicar
        </vaadin-button>

        <vaadin-dialog
          .opened=${this.isAccessFormOpened}
          @opened-changed=${this.accessFormChanged}
          data-testid="access-form"
          ${dialogRenderer(this.renderPublishForm, [])}
        >
          <pw-login></pw-login>
          <!-- Alex -->
          <pw-register></pw-register>
          <!-- Pepe -->
        </vaadin-dialog>
      </main>
    `;
  }

  openAccessForm() {
    this.isAccessFormOpened = true;
  }

  renderPublishForm() {
    return html` <pw-publish-form></pw-publish-form> `;
  }

  accessFormChanged(e) {
    this.isAccessFormOpened = e.detail.value;
  }
}
