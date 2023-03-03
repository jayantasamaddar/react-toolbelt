import React from 'react';
import { act, fireEvent, render, renderHook } from '@testing-library/react';
import { useScroll } from './useScroll';

const TestComponent = () => {
  return <div style={{ height: 1080, width: 1920 }}>Test Component</div>;
};

describe('useScroll', () => {
  it('should update scroll direction when scrolling DOWN', () => {
    render(<TestComponent />);
    const { result } = renderHook(() => useScroll());

    // Scroll down
    act(() => {
      fireEvent.scroll(window, { target: { scrollY: 1080 } });
    });

    expect(result.current.scrollDirection).toEqual({ x: 'left', y: 'down' });
  });

  it('should update scroll direction when scrolling UP', () => {
    render(<TestComponent />);
    const { result } = renderHook(() => useScroll());

    // Scroll up
    act(() => {
      fireEvent.scroll(window, { target: { scrollY: 0 } });
    });

    expect(result.current.scrollDirection).toEqual({ x: 'left', y: 'up' });
  });

  it('should update scroll direction when scrolling RIGHT', () => {
    render(<TestComponent />);
    const { result } = renderHook(() => useScroll());

    // Scroll right
    act(() => {
      fireEvent.scroll(window, { target: { scrollX: 1920 } });
    });

    expect(result.current.scrollDirection).toEqual({ x: 'right', y: 'up' });
  });

  it('should update scroll direction when scrolling LEFT', () => {
    render(<TestComponent />);
    const { result } = renderHook(() => useScroll());

    // Scroll left
    act(() => {
      fireEvent.scroll(window, { target: { scrollX: 0 } });
    });

    expect(result.current.scrollDirection).toEqual({ x: 'left', y: 'up' });
  });
});
