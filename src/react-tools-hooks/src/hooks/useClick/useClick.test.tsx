import React from 'react';
import {
  act,
  fireEvent,
  screen,
  render,
  renderHook
} from '@testing-library/react';
import { useClick } from './useClick';

const TestComponent = () => {
  return (
    <section role="region" style={{ width: '200px', height: '300px' }}>
      <button>Click Me!</button>
    </section>
  );
};

describe('useClick', () => {
  it('returns undefined target initially', () => {
    render(<TestComponent />);
    const target = screen.getByRole('region');
    const { result } = renderHook(() => useClick(target));
    expect(result.current).toBe(undefined);
  });

  it('sets target on click', () => {
    render(<TestComponent />);
    const target = screen.getByRole('region');
    const cb = jest.fn();
    renderHook(() => useClick(target, cb));
    act(() => {
      fireEvent.click(target);
    });
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('returns the correct target value on click event', () => {
    render(<TestComponent />);
    const target = screen.getByRole('button');
    const cb = jest.fn((t) => expect(t).toBe(target));
    const { result } = renderHook(() => useClick(target, cb));
    act(() => {
      fireEvent.click(target);
    });
    // Return undefined
    expect(result.current).toBe(undefined);
  });
});
