import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Modal from './Modal';
import Button from '../../atoms/Button/Button';

export default {
  title: 'Project/Molecules/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Accessible and composable Modal component',
      },
    },
  },
  argTypes: {
    size: {
      options: Object.values(Modal.Sizes),
      control: 'radio',
    },
    testId: {
      control: 'text',
    },
    containerId: {
      control: 'text',
    },
    titleId: {
      control: 'text',
    },
    descriptionId: {
      control: 'text',
    },
  },
} as Meta<typeof Modal>;

export const ConfirmModal: StoryFn = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>

      <Modal
        {...args}
        titleId="modal-title-simple"
        descriptionId="modal-description-simple"
        containerId="modal-container-simple"
        isOpen={open}
        onClose={() => setOpen(false)}
        size={Modal.Sizes.Medium}
      >
        <div style={{ position: 'absolute', right: 0, top: 0 }}>
          <Button aria-label="Close modal" variant="link" onClick={() => setOpen(false)}>
            X
          </Button>
        </div>
        <Modal.Title id="modal-title-simple">Header</Modal.Title>

        <Modal.Content id="modal-description-simple">
          <p>
            Reprehenderit consequat nisi velit cupidatat reprehenderit ex consequat officia nulla
            laborum qui. Voluptate deserunt amet amet duis. Laboris nisi dolore magna fugiat
            voluptate ipsum mollit aliquip cupidatat ut nisi laboris quis. Et voluptate dolor irure
            adipisicing. Consequat labore aliqua minim sunt veniam est aute aliqua do fugiat aliqua
            voluptate fugiat nisi.
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button variant="primary" onClick={() => setOpen(false)}>
            Primary
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export const ScrollableModal: StoryFn = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Scrollable Modal</Button>

      <Modal
        {...args}
        titleId="modal-title-with-picture"
        descriptionId="modal-description-with-picture"
        containerId="modal-container-with-picture"
        isOpen={open}
        onClose={() => setOpen(false)}
        size={Modal.Sizes.Medium}
      >
        <div style={{ position: 'absolute', right: 0, top: 0 }}>
          <Button aria-label="Close modal" variant="link" onClick={() => setOpen(false)}>
            X
          </Button>
        </div>
        <Modal.Title id="modal-title-with-picture">Header</Modal.Title>
        <Modal.Content id="modal-description-with-picture">
          <p>
            Reprehenderit consequat nisi velit cupidatat reprehenderit ex consequat officia nulla
            laborum qui. Voluptate deserunt amet amet duis. Laboris nisi dolore magna fugiat
            voluptate ipsum mollit aliquip cupidatat ut nisi laboris quis. Et voluptate dolor irure
            adipisicing. Consequat labore aliqua minim sunt veniam est aute aliqua do fugiat aliqua
            voluptate fugiat nisi.
          </p>

          <div
            style={{
              background: '#c3ebff',
              width: '100%',
              height: '132px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-hidden="true"
            role="presentation"
          >
            Image
          </div>

          <p>
            Reprehenderit consequat nisi velit cupidatat reprehenderit ex consequat officia nulla
            laborum qui. Voluptate deserunt amet amet duis. Voluptate deserunt amet amet duis.
          </p>
        </Modal.Content>
        <Modal.Actions style={{ justifyContent: 'space-between' }}>
          <Button variant="link" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Secondary
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Primary
            </Button>
          </div>
        </Modal.Actions>
      </Modal>
    </>
  );
};
