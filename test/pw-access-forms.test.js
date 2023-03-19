import { html, fixture, expect } from '@open-wc/testing';
import '../src/pw-access-forms.js';
import Sinon from 'sinon';
import requests from '../src/utils/requests.js';

describe('When user signup successfully', () => {
  it('Then doSignUp', async () => {
    const elem = await fixture(html`<pw-access-form></pw-access-form>`);
    const postStub = Sinon.stub(requests, 'post');
    postStub.returns({
      hasError: false,
      errorMessage: false,
    });

    elem.doSignUp({
      preventDefault() {},
      target: document.createElement('form'),
    });

    expect(elem.signUp.hasError).to.be.false;
    expect(elem.signUp.errorMessage).to.be.empty;

    postStub.restore();
  });
});
