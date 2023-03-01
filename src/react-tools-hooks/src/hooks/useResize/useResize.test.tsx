import React from 'react';
import {
  render,
  renderHook,
  screen,
  waitFor,
  act
} from '@testing-library/react';
import { useResize } from './useResize';

const TestComponent = () => {
  return (
    <section
      role="region"
      style={{ width: '200px', height: '300px', resize: 'both' }}
    >
      Test Component
    </section>
  );
};

const resizedValues = {
  width: 400,
  height: 500
};

describe('useResize', () => {
  it('should return the window size if no element is provided', () => {
    const { result } = renderHook(() => useResize());
    expect(result.current.width).toBe(window.innerWidth);
    expect(result.current.height).toBe(window.innerHeight);
  });

  it('should return the element size if an element is provided', () => {
    render(<TestComponent />);
    const el = screen.getByRole('region');
    expect(el).toHaveStyle('width: 200px');
    expect(el).toHaveStyle('height: 300px');

    Object.defineProperty(el, 'clientWidth', {
      configurable: true,
      value: 200
    });
    Object.defineProperty(el, 'clientHeight', {
      configurable: true,
      value: 300
    });

    const { result } = renderHook(() => useResize(el));
    expect(result.current).toHaveProperty('width', 200);
    expect(result.current).toHaveProperty('height', 300);
  });

  it('should update the size on window resize', async () => {
    Object.defineProperties(window, {
      innerHeight: {
        value: window.innerHeight,
        writable: true,
        configurable: true
      },
      innerWidth: {
        value: window.innerWidth,
        writable: true,
        configurable: true
      }
    });
    const { result } = renderHook(() => useResize());
    expect(result.current.width).toBe(window.innerWidth);
    expect(result.current.height).toBe(window.innerHeight);

    // Dispatch a resize event
    act(() => {
      window.innerHeight = resizedValues.height;
      window.innerWidth = resizedValues.width;
      window.dispatchEvent(new Event('resize'));
    });

    // Wait for the component to update
    await waitFor(() => expect(result.current.width).toBe(resizedValues.width));
    await waitFor(() =>
      expect(result.current.height).toBe(resizedValues.height)
    );
  });

  it('should update the size on element resize', async () => {
    render(<TestComponent />);
    const el = screen.getByRole('region');

    const { result } = renderHook(() => useResize());
    expect(result.current.width).toBe(resizedValues.width);
    expect(result.current.height).toBe(resizedValues.height);

    // Dispatch a resize event
    Object.defineProperty(el, 'clientWidth', {
      writable: true,
      value: resizedValues.width
    });
    Object.defineProperty(el, 'clientHeight', {
      writable: true,
      value: resizedValues.height
    });
    el.dispatchEvent(new Event('resize'));
  });
});
