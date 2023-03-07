import React from 'react';
import {
  act,
  fireEvent,
  screen,
  render,
  renderHook
} from '@testing-library/react';
import { useFocus } from './useFocus';

const TestComponent = () => {
  return (
    <section role="region" style={{ width: '200px', height: '300px' }}>
      <button>Click Me!</button>
    </section>
  );
};

describe('useFocus', () => {
  it('returns undefined target initially', () => {
    render(<TestComponent />);
    const target = screen.getByRole('region');
    const { result } = renderHook(() => useFocus(target));
    expect(result.current).toBe(undefined);
  });

  it('sets target on focus', () => {
    render(<TestComponent />);
    const target = screen.getByRole('region');
    const cb = jest.fn();
    renderHook(() => useFocus(target, {}, cb));
    act(() => {
      fireEvent.focus(target);
    });
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('returns the correct target value on focus event', () => {
    render(<TestComponent />);
    const target = screen.getByRole('button');
    const cb = jest.fn((t) => expect(t).toBe(target));
    const { result } = renderHook(() => useFocus(target, {}, cb));
    act(() => {
      fireEvent.focus(target);
    });
    // Return undefined
    expect(result.current).toBe(undefined);
  });
});
