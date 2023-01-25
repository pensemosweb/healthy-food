import { css, html, LitElement } from 'lit';

import { publihPost } from '../services/publish.service';

//COMPONENTES VAADIN
import '@vaadin/button';
import '@vaadin/custom-field';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/number-field';
import '@vaadin/text-area';
import '@vaadin/text-field';

export class pwPublishForm extends LitElement {
  static get styles() {
    return css`
      .publish__viewImage {
        width: 15rem;
      }

      .publish__previewImages,
      .publish__title,
      .publish__description {
        width: 100%;
      }

      .publish__price,
      .publish__selectImage {
        width: auto;
      }

      .publish__description {
        height: 10rem;
        margin-top: -3rem;
      }

      .publish__previewImages {
        margin-top: 0.4rem;
      }

      .publish__viewImage {
        margin-bottom: 2rem;
      }

      .inputfile {
        width: 0px;
        height: 0px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
      }

      .iborrainputfile__icon {
        height: 1.4rem;
        margin-top: -0.4rem;
      }

      .flex {
        display: flex;
        gap: 1rem;
        justify-content: space-between;
      }

      .publish__button {
        width: 100%;
      }

      .btn__container button {
        width: 100%;
        border: none;
        outline: none;
        background: transparent;
      }
    `;
  }

  static get properties() {
    return {
      text: { type: String },
      maxLength: { type: Number },
      currentImage: { type: String },
      hasError: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.text = '';
    this.maxLength = 150;
    this.currentImage = '';
    this.fileReader = null;
    this.hasError = false;
    this.messageError = '';
  }

  connectedCallback() {
    super.connectedCallback();

    this.fileReader = new FileReader();

    this.fileReader.addEventListener('load', evt => {
      this.onFileReaderLoad(evt);
    });
  }

  onFileReaderLoad(evt) {
    this.currentImage = evt.target.result;
  }

  render() {
    console.log(this.messageError);
    return html`
    <p>${this.messageError}</p>
      <form @submit=${this.onSubmit}>
        <div>
          <vaadin-text-field
            label="Titulo de la publicacion"
            name='title'
            class="publish__title"
            data-testid="title"
            required
            error-message="El titulo es obligatorio"
          >
          </vaadin-text-field>
        </div>

        <div class="flex">
          <vaadin-custom-field
            class="publish__selectImage"
            label="Subir imagen"
            data-testid="files"'
            required
            error-message='Debe seleccionar una imagen'
          >
            <div class="container-input">
              <input
                @change=${this.changeImage}
                type="file"
                name="file-3"
                id="file-3"
                class="inputfile"
                data-testid="file"
                required
              />
              <label for="file-3">
                <vaadin-icon
                  icon="vaadin:cloud-upload-o"
                  class="iborrainputfile__icon"
                ></vaadin-icon>
                <span class="iborrainputfile">Seleccionar archivo</span>
              </label>
            </div>
          </vaadin-custom-field>

          <vaadin-number-field
            label="Precio"
            class="publish__price"
            name="price"
            data-testid="price"
            required
            error-message='El precio es necesario'
          >
            <div slot="prefix">$</div>
          </vaadin-number-field>
        </div>

        <div class="publish__previewImages">
          <center>
            <img
              src=${this.currentImage}
              class="publish__viewImage"
              data-testid="selected-image"
            />
          </center>
        </div>

        <div>
          <vaadin-text-area
            class="publish__description"
            name="description"
            label="Descripción"
            .maxlength="${this.maxLength}"
            @value-changed="${this.textChanged}"
            .helperText="${`${this.text.length}/${this.maxLength}`}"
            data-testid="description"
            clear-button-visible
          >
          </vaadin-text-area>
        </div>


        <div class='btn__container'>
        <button>
          <vaadin-button class="publish__button">Publicar</vaadin-button>
          </button>
        </div>
      </form>
    `;
  }

  onSubmit(evt) {
    evt.preventDefault();

    const data = new FormData(evt.target);
    const datos = {
      title: data.get('title'),
      image: this.currentImage,
      price: data.get('price'),
      description: data.get('description'),
    };

    fetch('http://localhost:3000/results', {
      method: 'POST',
      body: JSON.stringify(datos),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
      .then(res => {
        if (res.status === '201') {
          this.messageError = 'SOLICITUD REALIZADA CON EXITO';
        }
        if (!res.ok) throw Error(res.status);

        return res;
      })
      .catch(error => {
        this.hasError = true;
        this.messageError = `Eror en la peticion, ${error}`;
      });
  }

  textChanged(evt) {
    this.text = evt.detail.value;
  }

  changeImage(evt) {
    const input = evt.target;
    const file = input.files[0];

    this.fileReader.readAsDataURL(file);
  }
}

customElements.define('pw-publish-form', pwPublishForm);
