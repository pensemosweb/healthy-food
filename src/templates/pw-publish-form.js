import { html, LitElement, nothing } from 'lit';

import publishService from '../services/publish.service';
import publishFormStyle from '../styles/publishForm.style';

import './pw-success-alert.js';
import './pw-error-alert.js';

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
    return [publishFormStyle];
  }

  static get properties() {
    return {
      text: { type: String },
      maxLength: { type: Number },
      currentImage: { type: String },
      publish: { type: Object },
      closed: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.text = '';
    this.maxLength = 150;
    this.currentImage = '';
    this.fileReader = null;
    this.publish = {
      title: '',
      image: '',
      price: '',
      description: '',
      hasError: false,
      success: false,
      message: '',
    };
    this.closed = false;
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
    console.log(this.publish.success, this.closed);
    return html`
		${
      this.publish.success
        ? html`<pw-success-alert
            ?closed=${this.closed}
            @close-alert=${this.closeAlertSuccess}
            .message=${this.publish.message}
          ></pw-success-alert>`
        : this.publish.hasError
        ? html`<pw-error-alert
            ?closed=${this.closed}
            @close-alert=${this.closeAlertError}
            .message=${this.publish.message}
          ></pw-error-alert>`
        : nothing
    }
			<form class='form' @submit=${this.onSubmit} data-testid="form">
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
				<button data-testid="btn">
					<vaadin-button class="publish__button">Publicar</vaadin-button>
					</button>
				</div>
			</form>
		`;
  }

  async onSubmit(evt) {
    evt.preventDefault();

    const data = new FormData(evt.target);

    //REFACTOR: SUBIR FECHA Y HORA DE CREACION
    const datos = {
      title: data.get('title'),
      price: data.get('price'),
      description: data.get('description'),
      image: this.currentImage,
    };

    evt.target.reset();
    this.currentImage = '';

    const result = await publishService.post(
      'http://localhost:3000/results',
      datos
    );

    this.publish = { ...this.publish, ...result };
    this.closed = false;
  }

  closeAlertSuccess() {
    this.closed = true;
    this.publish.success = false;
  }

  closeAlertError() {
    this.closed = true;
    this.publish.hasError = false;
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
