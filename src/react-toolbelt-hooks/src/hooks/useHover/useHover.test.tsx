import React from 'react';
import {
  act,
  fireEvent,
  screen,
  render,
  renderHook
} from '@testing-library/react';
import { useHover } from './useHover';

const TestComponent = ({ children }: { children?: string }) => {
  return (
    <section role="region" style={{ width: '200px', height: '300px' }}>
      <button>{children ?? 'Click Me!'}</button>
    </section>
  );
};

describe('useHover', () => {
  it('returns false initially', () => {
    render(<TestComponent />);
    const target = screen.getByRole('button');
    const { result } = renderHook(() => useHover(target));
    expect(result.current).toBe(false);
  });

  it('returns hoverState correctly when hovering in and out', () => {
    render(<TestComponent />);
    const target = screen.getByRole('button');
    const { result } = renderHook(() => useHover(target));

    act(() => fireEvent.mouseEnter(target));
    expect(result.current).toBe(true);

    act(() => fireEvent.mouseLeave(target));
    expect(result.current).toBe(false);
  });

  it('executes callback when hovering in and out', () => {
    let buttonText = 'false';
    render(<TestComponent />);
    const target = screen.getByRole('button');

    const cb = jest.fn((hover: boolean) => (buttonText = `${hover}`));
    const { result } = renderHook(() => useHover(target, cb));

    act(() => fireEvent.mouseEnter(target));
    expect(cb).toHaveBeenCalled();
    expect(buttonText).toStrictEqual(`${result.current}`);

    act(() => fireEvent.mouseLeave(target));
    expect(cb).toHaveBeenCalledTimes(2);
    expect(buttonText).toStrictEqual(`${result.current}`);
  });
});
