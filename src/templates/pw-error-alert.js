import { LitElement, html, css } from 'lit';

export class PwErrorAlert extends LitElement {
  static get styles() {
    return css`
      .error {
        background: #f7b4b2;
        padding: 5px 0;
        width: 90%;
        border-radius: 4px;
        border-left: 8px solid #ad1712;
        overflow: hidden;
        opacity: 0;
        pointer-events: none;
      }
      .error.showAlert {
        opacity: 1;
        pointer-events: auto;
      }
      .error.show {
        animation: show_slide 1s ease forwards;
      }
      @keyframes show_slide {
        0% {
          transform: translateX(-100%);
        }
        40% {
          transform: translateX(10%);
        }
        80% {
          transform: translateX(0%);
        }
        100% {
          transform: translateX(10px);
        }
      }
      .error .fa-exclamation-circle {
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        color: #ad1212;
        font-size: 30px;
      }
      .error .msg {
        padding: 0 20px;
        font-size: 18px;
        color: #440606;
      }
      .error .close-btn {
        position: absolute;
        right: 0px;
        top: 50%;
        color: white;
        transform: translateY(-50%);
        background: #ad1212;
        padding: 20px 18px;
        cursor: pointer;
      }
      .error .close-btn:hover {
        background: #ad1212;
      }
    `;
  }

  static get properties() {
    return {
      message: { type: String },
      closed: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.message = '';
    this.closed = false;
  }

  render() {
    return html`<div class="error show showAlert">
      <span class="fas fa-exclamation-circle"></span>
      <span class="msg">${this.message}!</span>
      <div class="close-btn" @click=${this.closeAlert}>
        <vaadin-icon icon="vaadin:close"></vaadin-icon>
      </div>
    </div>`;
  }

  closeAlert(evt) {
    const closeAlert = new CustomEvent('close-alert', {
      composed: true,
      detail: evt,
    });

    this.dispatchEvent(closeAlert);
  }
}

customElements.define('pw-error-alert', PwErrorAlert);
