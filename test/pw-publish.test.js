import { html } from 'lit';
import { fixture, expect, oneEvent } from '@open-wc/testing';
import sinon from 'sinon';
import publishService from '../src/services/publish.service.js';

import '../src/HealthyFood.js';

describe('Dado un formulario de publicacion', () => {
  let element;
  let root;

  beforeEach(async () => {
    element = await fixture(html`<pw-publish-form></pw-publish-form>`);
    root = element.shadowRoot;
  });

  describe('Cuando el usuario quiera escribir el titulo', () => {
    it('Entonces un campo de titulo debera ser mostrado', async () => {
      const title = root.querySelector('[data-testid="title"]');

      expect(title).to.be.visible;
    });

    it('y entonces el usuario debera rellear el campo', async () => {
      const title = root.querySelector('[data-testid="title"]');

      title.value = 'Venta de zanahorias';

      expect(title.value).to.equal('Venta de zanahorias');
    });
  });

  describe('Cuando el usuario quiera escribir el precio del producto', () => {
    it('Entonces un campo de precio debera ser mostrado', async () => {
      const price = root.querySelector('[data-testid="price"]');
      expect(price).to.be.visible;
    });

    it('y entonces el usuario debera rellear el campo', async () => {
      const price = root.querySelector('[data-testid="price"]');

      price.value = '25.5';

      expect(price.value).to.equal('25.5');
    });
  });

  describe('Cuando el usuario quiera seleccionar imagenes del producto', () => {
    it('Entonces un campo de imagenes debera ser mostrado', async () => {
      const image = root.querySelector('[data-testid="file"]');
      expect(image).to.be.visible;
    });

    it('Y entonces el usuario debera elegir la imagen', async () => {
      const image = root.querySelector('[data-testid="file"]');

      image.value = '';

      expect(image.value).to.equal('');
    });

    it('Y entonces en el formulario se mostrara una previsualizacion de la imagen', async () => {
      const onFileLoaded = oneEvent(element.fileReader, 'load');

      element.changeImage({
        target: { files: [new File([new ArrayBuffer(1)], 'hola.jpg')] },
      });
      await onFileLoaded;

      const img = root.querySelector('[data-testid="selected-image"]');
      expect(img).to.not.be.null;
    });
  });

  describe('Cuando el usuario quiera escribir la descripcion de su producto', () => {
    it('Entonces un campo de descripciòn debera ser mostrado', async () => {
      const description = root.querySelector('[data-testid="description"]');
      expect(description).to.be.visible;
    });

    it('y entonces el usuario debera rellear el campo', async () => {
      const description = root.querySelector('[data-testid="description"]');

      description.value = 'zanahorias a buen precio';

      expect(description.value).to.equal('zanahorias a buen precio');
    });

    it('y entonces el campo no debera permitir mas de 150 caracteres', () => {
      const description = root.querySelector('[data-testid="description"]');

      const maxlength = description.maxlength;
      description.value = '';

      expect(description.value.length).to.be.below(maxlength);
    });

    it('Cuando el usuario de click en publicar, la publicacion debera ser guardada', async () => {
      const post = sinon.stub(publishService, 'post');
      post.returns({
        success: true,
        title: 'Venta de tamales',
        price: '12',
        description: '2x1',
        image: 'tamales.png',
      });

      element.onSubmit({
        target: root.querySelector('[data-testid="form"]'),
        preventDefault: () => {},
      });

      await element.updateComplete;

      expect(element.publish.success).to.be.equal(true);
      expect(element.publish.title).to.be.equal('Venta de tamales');
      expect(element.publish.price).to.be.equal('12');
      expect(element.publish.description).to.be.equal('2x1');
      expect(element.publish.image).to.be.equal('tamales.png');
    });
  });
});
