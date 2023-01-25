import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../src/HealthyFood.js';

describe('Mostrado un header dentro de la aplicacion', () => {
  let element;
  let root;
  beforeEach(async () => {
    element = await fixture(html`<pw-header></pw-header>`);
    root = element.shadowRoot;
  });

  it('Entonces el titulo HealthyFood debera ser mostrado', async () => {
    const header = root.querySelector('[data-testid="header"]').innerHTML;

    expect(header).to.have.string('HealthyFood');
  });

  it('Entonces una barra de busqueda debera ser mostrada', () => {
    const header = root.querySelector('[data-testid="header"]');
    const search = root.querySelector('[data-testid="search"]');

    expect(header).to.contain(search);
  });

  it('Entonces una boton de mi cuenta debera ser mostrado', () => {
    const header = root.querySelector('[data-testid="header"]');
    const btn = root.querySelector('[data-testid="myAccount"]');

    expect(header).to.contain(btn);
  });
});
