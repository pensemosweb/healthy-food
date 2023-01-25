import { html } from 'lit';
import '../src/healthy-food.js';

export default {
  title: 'HealthyFood',
  component: 'healthy-food',
};

function Template({ isAccessFormOpened, cssVars }) {
  return html`
    <section>
      <healthy-food
        style="--hf-bg-color: ${cssVars?.['--hf-bg-color'] || 'white'}"
        .isAccessFormOpened=${isAccessFormOpened}
      >
      </healthy-food>
    </section>
  `;
}

export const App = Template.bind({});
App.args = {
  isAccessFormOpened: false,
};

export const DialogOpened = Template.bind({});
DialogOpened.args = {
  isAccessFormOpened: true,
  cssVars: {
    '--hf-bg-color': 'pink',
  },
};
