import { LitElement, html, css } from 'lit';

import '@vaadin/text-field';
import '@vaadin/icon';
import '@vaadin/icons';

export class PwHeader extends LitElement {
  static get styles() {
    return css`
      header {
        background-color: rgba(234, 141, 58, 1);
        color: rgb(234, 243, 212);
        width: calc(100% - 2rem);
        height: 4rem;
        position: fixed;
        top: 0;
        display: flex;
        padding: 1rem;
        justify-content: space-between;
      }

      .header__search {
        margin-top: 0.5rem;
        background-color: #f4f2d9;
        border: none;
        border-radius: 10px;
        padding: 0.2rem;
        outline: none;
        width: 25rem;
      }

      .header__btn {
        width: 8rem;
        margin-top: 0.5rem;
        padding: 0.2rem;
        background-color: #f0ebeb;
        color: black;
        border: none;
        border-radius: 0.8rem;
        display: flex;
        justify-content: center;
        gap: 0.2rem;
      }

      .header__btnIcon {
        height: 1rem;
      }

      .header__btnText,
      .header__btnIcon {
        margin-top: 0.7rem;
        font-size: 14px;
        font-weight: bold;
      }
    `;
  }

  render() {
    return html`
      <header data-testid="header">
        <h2 data-testid="title" class="header__title">HealthyFood</h2>

        <div class="search__container">
          <vaadin-text-field
            data-testid="search"
            placeholder="Buscar"
            clear-button-visible
            class="header__search"
          >
            <vaadin-icon icon="vaadin:search" slot="prefix"></vaadin-icon>
          </vaadin-text-field>
        </div>

        <div class="myAccount">
          <button data-testid="myAccount" class="header__btn">
            <vaadin-icon
              icon="vaadin:user"
              class="header__btnIcon"
            ></vaadin-icon>
            <p class="header__btnText">Mi Cuenta</p>
          </button>
        </div>
      </header>
    `;
  }
}

customElements.define('pw-header', PwHeader);
