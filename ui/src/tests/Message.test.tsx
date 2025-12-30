import { test, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { Message } from '../Message';

test('renders message data', async () => {
  const msg = {
    username: 'Bob',
    message: 'Hello World!',
    created_at: '2024',
  };

  const screen = await render(<Message message={msg} username="Alice" />);

  const userHeading = screen.getByText('Bob');
  await expect.element(userHeading).toHaveTextContent('Bob');

  const body = screen.getByText('Hello World!');
  await expect.element(body).toHaveTextContent('Hello World!');
});
