// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like: `expect(element).toHaveTextContent(/react/i)`
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
const noop = () => {};
const resizeTo = (width, height) => {
  window.innerWidth = width;
  window.innerHeight = height;
};
Object.defineProperties(window, {
  scrollTo: { value: noop, writable: true },
  resizeTo: { value: resizeTo, writable: true }
});
