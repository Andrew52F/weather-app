/* eslint-disable */
import Button from './Button';

export default {
  title: "Button",
};

export const Default = () => (
  <div className='theme_light'>
    <Button onClick={() => console.log('Clicked!!')}> Text </Button>
  </div>
);
export const Dark = () => (
  <div className='theme_dark'>
    <Button onClick={() => console.log('Clicked!!')}> Text </Button>
  </div>
);

Default.story = {
  name: 'light',
};
Dark.story = {
  name: 'dark',
};

