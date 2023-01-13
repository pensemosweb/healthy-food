import { html } from 'lit';
import renderRegister from './renderRegister.js'
import renderLogin from './renderLogin.js'

export default function renderAccessForms() {
  return html`
    ${renderRegister()}
    ${renderLogin()}
  `;  
};