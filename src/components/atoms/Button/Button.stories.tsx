import { StoryFn, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from './Button';
import { ButtonProps } from './Button.types';

export default {
  title: 'Project/Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Accessible and composable Button component',
      },
    },
  },
  argTypes: {
    size: {
      description: 'Size variants',
      options: Object.values(Button.Sizes),
      control: {
        type: 'radio',
      },
    },
    variant: {
      description: 'Color variants',
      options: Object.values(Button.Variants),
      control: {
        type: 'radio',
      },
    },
    testId: {
      control: 'text',
    },
    fluid: {
      control: 'boolean',
    },
    allowWrap: {
      control: 'boolean',
    },
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args: ButtonProps) => <Button {...args} />;

export const ButtonPrimary = Template.bind({});
ButtonPrimary.args = {
  children: 'Button text',
  variant: Button.Variants.Primary,
  size: Button.Sizes.Medium,
  disabled: false,
  fluid: false,
  onClick: action('button-primary-clicked'),
};

export const ButtonSecondary = Template.bind({});
ButtonSecondary.args = {
  children: 'Button text',
  variant: Button.Variants.Secondary,
  size: Button.Sizes.Medium,
  disabled: false,
  fluid: false,
  onClick: action('button-secondary-clicked'),
};

export const ButtonLink = Template.bind({});
ButtonLink.args = {
  children: 'Button text',
  variant: Button.Variants.Link,
  size: Button.Sizes.Medium,
  disabled: false,
  fluid: false,
  onClick: action('button-link-clicked'),
};
