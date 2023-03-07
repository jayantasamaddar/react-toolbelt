import React from 'react';
import {
  act,
  fireEvent,
  screen,
  render,
  renderHook
} from '@testing-library/react';
import { useBlur } from './useBlur';

const TestComponent = () => {
  return (
    <section role="region" style={{ width: '200px', height: '300px' }}>
      <button>Click Me!</button>
    </section>
  );
};

describe('useBlur', () => {
  it('returns undefined target initially', () => {
    render(<TestComponent />);
    const target = screen.getByRole('button');
    const { result } = renderHook(() => useBlur(target));
    expect(result.current).toBe(undefined);
  });

  it('takes focus off target', () => {
    render(<TestComponent />);
    const target = screen.getByRole('button');
    const cb = jest.fn();
    renderHook(() => useBlur(target, cb));
    act(() => {
      fireEvent.focus(target);
      fireEvent.blur(target);
    });
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('returns the correct target value on blur event', () => {
    render(<TestComponent />);
    const target = screen.getByRole('button');
    const cb = jest.fn((t) => expect(t).toBe(target));
    const { result } = renderHook(() => useBlur(target, cb));
    act(() => {
      fireEvent.focus(target);
      fireEvent.blur(target);
    });
    // Return undefined
    expect(result.current).toBe(undefined);
  });
});
