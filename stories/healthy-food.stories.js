import { html } from 'lit';
import '../src/healthy-food.js';

export default {
  title: 'HealthyFood',
  component: 'healthy-food',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ title, backgroundColor }) {
  return html`
    <healthy-food
      style="--healthy-food-background-color: ${backgroundColor || 'white'}"
      .title=${title}
    >
    </healthy-food>
  `;
}

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
