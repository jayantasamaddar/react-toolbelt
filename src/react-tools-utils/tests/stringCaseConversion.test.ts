import { describe, expect, it } from '@jest/globals';
import {
  toCamelCase,
  toKebabCase,
  toPascalCase,
  toSnakeCase,
  detectCase,
  isCamelCase,
  isKebabCase,
  isPascalCase,
  isSnakeCase
} from '../src/utils';

describe('string case conversion', () => {
  /***********************************************/
  /** toCamelCase */
  /***********************************************/
  describe('toCamelCase', () => {
    it('converts kebab-case to camelCase', () => {
      expect(toCamelCase('foo-bar-baz')).toBe('fooBarBaz');
    });

    it('converts PascalCase to camelCase', () => {
      expect(toCamelCase('FooBarBaz')).toBe('fooBarBaz');
    });

    it('converts snake_case to camelCase', () => {
      expect(toCamelCase('foo_bar_baz')).toBe('fooBarBaz');
    });

    it('returns the input if it is already in camelCase', () => {
      expect(toCamelCase('fooBarBaz')).toBe('fooBarBaz');
    });
  });

  /***********************************************/
  /** toKebabCase */
  /***********************************************/
  describe('toKebabCase', () => {
    it('converts camelCase to kebab-case', () => {
      expect(toKebabCase('fooBarBaz')).toBe('foo-bar-baz');
    });

    it('converts PascalCase to kebab-case', () => {
      expect(toKebabCase('FooBarBaz')).toBe('foo-bar-baz');
    });

    it('converts snake_case to kebab-case', () => {
      expect(toKebabCase('foo_bar_baz')).toBe('foo-bar-baz');
    });

    it('returns the input if it is already in kebab-case', () => {
      expect(toKebabCase('foo-bar-baz')).toBe('foo-bar-baz');
    });
  });

  /***********************************************/
  /** toPascalCase */
  /***********************************************/
  describe('toPascalCase', () => {
    it('converts camelCase to PascalCase', () => {
      expect(toPascalCase('fooBarBaz')).toBe('FooBarBaz');
    });

    it('converts kebab-case to PascalCase', () => {
      expect(toPascalCase('foo-bar-baz')).toBe('FooBarBaz');
    });

    it('converts snake_case to PascalCase', () => {
      expect(toPascalCase('foo_bar_baz')).toBe('FooBarBaz');
    });

    it('returns the input if it is already in PascalCase', () => {
      expect(toPascalCase('FooBarBaz')).toBe('FooBarBaz');
    });
  });

  /***********************************************/
  /** toSnakeCase */
  /***********************************************/
  describe('toSnakeCase', () => {
    it('converts camelCase to snake_case', () => {
      expect(toSnakeCase('fooBarBaz')).toBe('foo_bar_baz');
    });

    it('converts kebab-case to snake_case', () => {
      expect(toSnakeCase('foo-bar-baz')).toBe('foo_bar_baz');
    });

    it('converts PascalCase to snake_case', () => {
      expect(toSnakeCase('FooBarBaz')).toBe('foo_bar_baz');
    });

    it('returns the input if it is already in snake_case', () => {
      expect(toSnakeCase('foo_bar_baz')).toBe('foo_bar_baz');
    });
  });

  /***********************************************/
  /** detectCase */
  /***********************************************/
  describe('detectCase', () => {
    it('should return "pascal" for a string in PascalCase', () => {
      expect(detectCase('PascalCase')).toEqual('pascal');
      expect(detectCase('AnotherPascalCaseExample')).toEqual('pascal');
      expect(detectCase('TitleCase')).toEqual('pascal');
    });

    it('should return "kebab" for a string in kebab-case', () => {
      expect(detectCase('kebab-case')).toEqual('kebab');
      expect(detectCase('another-kebab-example')).toEqual('kebab');
      expect(detectCase('kebab')).toEqual('kebab');
    });

    it('should return "snake" for a string in snake_case', () => {
      expect(detectCase('snake_case')).toEqual('snake');
      expect(detectCase('another_snake_example')).toEqual('snake');
      expect(detectCase('snake')).toEqual('kebab'); // Returns kebab for this edge case
    });

    it('should return "camel" for a string in camelCase', () => {
      expect(detectCase('camelCase')).toEqual('camel');
      expect(detectCase('anotherCamelCaseExample')).toEqual('camel');
      expect(detectCase('camel')).toEqual('kebab'); // Returns kebab for this edge case
    });

    it('should return undefined for strings that do not match any of the case types', () => {
      expect(detectCase('Title-Case')).toBeUndefined();
      expect(detectCase('camel_Case')).toBeUndefined();
      expect(detectCase('')).toBeUndefined();
    });
  });

  /***********************************************/
  /** isCamelCase */
  /***********************************************/
  describe('isCamelCase', () => {
    it('should return true for camelCase strings', () => {
      expect(isCamelCase('helloWorld')).toBe(true);
      expect(isCamelCase('helloWorldFooBar')).toBe(true);
      expect(isCamelCase('a')).toBe(true);
    });

    it('should return false for non-camelCase strings', () => {
      expect(isCamelCase('HelloWorld')).toBe(false);
      expect(isCamelCase('hello-world')).toBe(false);
      expect(isCamelCase('hello_world')).toBe(false);
    });
  });

  /***********************************************/
  /** isKebabCase */
  /***********************************************/
  describe('isKebabCase', () => {
    it('should return true for kebab-case strings', () => {
      expect(isKebabCase('hello-world')).toBe(true);
      expect(isKebabCase('hello-world-foo-bar')).toBe(true);
      expect(isKebabCase('a')).toBe(true);
    });

    it('should return false for non-kebab-case strings', () => {
      expect(isKebabCase('helloWorld')).toBe(false);
      expect(isKebabCase('hello_world')).toBe(false);
      expect(isKebabCase('hello-world-')).toBe(false);
    });
  });

  /***********************************************/
  /** isPascalCase */
  /***********************************************/
  describe('isPascalCase', () => {
    it('should return true for PascalCase strings', () => {
      expect(isPascalCase('HelloWorld')).toBe(true);
      expect(isPascalCase('HelloWorldFooBar')).toBe(true);
      expect(isPascalCase('A')).toBe(true);
    });

    it('should return false for non-PascalCase strings', () => {
      expect(isPascalCase('helloWorld')).toBe(false);
      expect(isPascalCase('Hello-World')).toBe(false);
      expect(isPascalCase('Hello_World')).toBe(false);
    });
  });

  /***********************************************/
  /** isSnakeCase */
  /***********************************************/
  describe('isSnakeCase', () => {
    it('should return true for snake_case strings', () => {
      expect(isSnakeCase('hello_world')).toBe(true);
      expect(isSnakeCase('hello_world_foo_bar')).toBe(true);
      expect(isSnakeCase('a')).toBe(true);
    });

    it('should return false for non-snake_case strings', () => {
      expect(isSnakeCase('helloWorld')).toBe(false);
      expect(isSnakeCase('hello-world')).toBe(false);
      expect(isSnakeCase('hello_world_')).toBe(false);
    });
  });
});
