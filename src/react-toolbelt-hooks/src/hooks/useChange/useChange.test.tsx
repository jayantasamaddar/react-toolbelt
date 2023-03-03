import React from 'react';
import {
  act,
  fireEvent,
  screen,
  render,
  renderHook
} from '@testing-library/react';
import { useChange } from './useChange';

const TestComponent = () => {
  return (
    <>
      <label htmlFor="name">Name</label>
      <input id="name" type="text" name="name" />
    </>
  );
};

describe('useChange', () => {
  it('returns undefined target initially', () => {
    render(<TestComponent />);
    const inputEl = screen.getByLabelText('Name');
    const { result } = renderHook(() => useChange(inputEl));
    expect(result.current).toBe(undefined);
  });

  it('sets target on change', () => {
    render(<TestComponent />);
    const inputEl = screen.getByLabelText('Name');
    const cb = jest.fn();
    renderHook(() => useChange(inputEl, cb));
    act(() => {
      fireEvent.change(inputEl, { target: { value: 'React Tools' } });
    });
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('returns the correct target value on change event', () => {
    render(<TestComponent />);
    const inputEl = screen.getByLabelText('Name');
    const cb = jest.fn((t) => {
      expect(t).toBe(inputEl);
      expect(t).toHaveValue('React Tools');
    });
    const { result } = renderHook(() => useChange(inputEl, cb));
    act(() => {
      fireEvent.change(inputEl, { target: { value: 'React Tools' } });
    });
    // Return undefined
    expect(result.current).toBe(undefined);
  });
});
