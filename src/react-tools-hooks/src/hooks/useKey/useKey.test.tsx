import React from 'react';
import {
  act,
  fireEvent,
  screen,
  render,
  renderHook
} from '@testing-library/react';
import { useKey } from './useKey';

const TestComponent = () => {
  return (
    <section role="region" style={{ width: '200px', height: '300px' }}>
      <button>Click Me!</button>
    </section>
  );
};

describe('useKey', () => {
  it('returns null target initially', () => {
    render(<TestComponent />);
    const target = screen.getByRole('region');
    const { result } = renderHook(() => useKey(target));
    expect(result.current).toBe(undefined);
  });

  it('sets target on key press', () => {
    render(<TestComponent />);
    const target = screen.getByRole('region');
    const cb = jest.fn();
    renderHook(() => useKey(target, 'press', cb));
    act(() => {
      fireEvent.keyPress(target, { key: 'Space' });
    });
    expect(cb).toHaveBeenCalledWith(expect.objectContaining({ key: 'Space' }));
  });

  it('sets target on key down', () => {
    render(<TestComponent />);
    const target = screen.getByRole('region');
    const cb = jest.fn();
    renderHook(() => useKey(target, 'down', cb));
    act(() => {
      fireEvent.keyDown(target, { key: 'Enter' });
    });
    expect(cb).toHaveBeenCalledWith(expect.objectContaining({ key: 'Enter' }));
  });

  it('sets target on key up', () => {
    render(<TestComponent />);
    const target = screen.getByRole('region');
    const cb = jest.fn();
    renderHook(() => useKey(target, 'up', cb));
    act(() => {
      fireEvent.keyUp(target, { key: 'Escape' });
    });
    expect(cb).toHaveBeenCalledWith(expect.objectContaining({ key: 'Escape' }));
  });

  it('returns the correct key value on key event', () => {
    render(<TestComponent />);
    const target = screen.getByRole('button');
    const cb = jest.fn(({ key }) => expect(key).toStrictEqual('Enter'));
    const { result } = renderHook(() => useKey(target, 'down', cb));
    act(() => {
      fireEvent.keyDown(target, { key: 'Enter' });
    });
    expect(result.current).toBe(undefined);
  });
});
