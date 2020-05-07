import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DropdownMenu from '../DropdownMenu';

describe('Test Dropdown Menu', () => {
  test('Test render link', () => {
    let active = true;
    let linkList = [
      { to: "/", name: "Details Information" },
      { to: "/child", name: "Logout" }
    ];

    const { getByText } = render(
      <MemoryRouter>
        <DropdownMenu active={active} links={linkList} />
      </MemoryRouter>
    );

    const linkElement = getByText(/Details Information/i);
    expect(linkElement).toBeInTheDocument();

    const logoutElement = getByText(/Logout/i);
    expect(logoutElement).toBeInTheDocument();
  });

  test('Render without crashing', () => {
    let active = false;
    let linkList = [
      { to: "/", name: "Details Information" },
      { to: "/child", name: "Logout" }
    ];

    const { getByTestId } = render(
      <MemoryRouter>
        <DropdownMenu active={active} links={linkList} />
      </MemoryRouter>
    );

    const dropdown = getByTestId('dropdown-test-id');
    expect(dropdown).toBeInTheDocument();
  });
});


