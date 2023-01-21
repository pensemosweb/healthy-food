import { html } from 'lit';
import '../src/healthy-food.js';

export default {
  title: 'HealthyFood',
  component: 'healthy-food',
};

function Template({ isAccessFormOpened }) {
  return html`
    <healthy-food .isAccessFormOpened=${isAccessFormOpened}> </healthy-food>
  `;
}

export const App = Template.bind({});
App.args = {
  isAccessFormOpened: false,
};

export const DialogOpened = Template.bind({});
DialogOpened.args = {
  isAccessFormOpened: true,
};
