import { html, LitElement, css, nothing } from 'lit';

export class PwSuccessAlert extends LitElement {
  static get styles() {
    return css`
      .success {
        background: #bbff9b;
        padding: 5px 0;
        width: 90%;
        border-radius: 4px;
        border-left: 8px solid #41ad12;
        overflow: hidden;
        opacity: 0;
        pointer-events: none;
      }
      .success.showAlert {
        opacity: 1;
        pointer-events: auto;
      }
      .success.show {
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
      .success .fa-exclamation-circle {
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        color: #41ad12;
        font-size: 30px;
      }
      .success .msg {
        padding: 0 20px;
        font-size: 18px;
        color: #163303;
      }
      .success .close-btn {
        position: absolute;
        right: 0px;
        top: 50%;
        color: white;
        transform: translateY(-50%);
        background: #41ad12;
        padding: 20px 18px;
        cursor: pointer;
      }
      .success .close-btn:hover {
        background: #41ad12;
      }

      .hide {
        display: none;
        transition: all 0.3s ease-in-out;
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
    return html` <div
      class="${this.closed ? 'hide' : ''} success show showAlert"
    >
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

customElements.define('pw-success-alert', PwSuccessAlert);
