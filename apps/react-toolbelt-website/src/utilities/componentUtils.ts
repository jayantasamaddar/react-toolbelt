import React, {
  ComponentType,
  createElement,
  isValidElement,
  PropsWithChildren,
  ReactNode
} from 'react';

/**
 * Returns whether two components are same when performing a hot module reload.
 * This only compares the equality of the names.
 *
 * @param Component
 * @param AnotherComponent
 * @returns `boolean`
 */
const hotReloadComponentCheck = (
  Component: React.ComponentType<any>,
  AnotherComponent: React.ComponentType<any>
): boolean => {
  const componentName = Component.name;
  const anotherComponentName = (
    AnotherComponent as React.FunctionComponent<any>
  ).displayName;

  return (
    Component === AnotherComponent ||
    (Boolean(componentName) && componentName === anotherComponentName)
  );
};

/**
 * Compare if one component is another component
 *
 * In development, we compare based on the name of the function because React Hot Loader
 * proxies React components in order to make updates.
 * In production we can simply compare the components for equality.
 *
 * @param Component
 * @param AnotherComponent
 * @returns `boolean`
 */
export const isComponent = (
  Component: ComponentType<any>,
  AnotherComponent: ComponentType<any>
): boolean =>
  process.env.NODE_ENV === 'development'
    ? hotReloadComponentCheck(Component, AnotherComponent)
    : Component === AnotherComponent;

/**
 * Returns whether Element is of a certain Type of Element
 * @param element
 * @param Component
 * @returns `boolean`
 */

/**
 * function isElementOfType<TProps>
 * (element: ReactNode, Component: ComponentType<TProps> | ComponentType<TProps>[]): boolean
 */
export function isElementOfType<T>(
  element: ReactNode,
  Component: ComponentType<T> | ComponentType<T>[]
): boolean {
  if (!element || !isValidElement(element) || typeof element.type === 'string')
    return false;

  // Overriding types to bypass default wrapping behaviour of some components like Stack
  const { type: defaultType } = element;
  const type = element.props?.__type__ || defaultType;
  const Components = Array.isArray(Component) ? Component : [Component];

  return Components.some(
    (SomeComponent) =>
      typeof type !== 'string' && isComponent(SomeComponent, type)
  );
}

/**
 * Wrap a Component with a Wrapper Component
 *
 * @param component
 * @param WrapperComponent
 * @param props
 * @returns `ReactNode`
 */
//   export const wrapWithComponent = <TProps extends PropsWithChildren>(
//     component: ReactNode,
//     WrapperComponent: ComponentType<TProps>,
//     props: TProps & JSX.IntrinsicAttributes
//   ): ReactNode => {
//     if (component === null || component === undefined) return;

//     return isElementOfType(component, WrapperComponent) ? (
//       component
//     ) : (
//       <WrapperComponent {...props}>{component}</WrapperComponent>
//     );
//   };

export const wrapWithComponent = <T extends PropsWithChildren>(
  component: ReactNode,
  WrapperComponent: ComponentType<T>,
  props: T & JSX.IntrinsicAttributes
): ReactNode => {
  if (component === null || component === undefined) return;
  return createElement(WrapperComponent, props, component);
};
