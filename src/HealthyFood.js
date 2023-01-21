import { LitElement, html, css } from 'lit';
import '@vaadin/button';
import '@vaadin/dialog';

import { dialogRenderer } from '@vaadin/dialog/lit.js';

import renderAccessForms from './templates/renderAccessForms.js';

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
          ${dialogRenderer(renderAccessForms, [])}
        >
          <pw-login></pw-login>
          <!-- Alex -->
        </vaadin-dialog>

        <pw-publis-form></pw-publis-form
        ><!-- Octavio -->
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
