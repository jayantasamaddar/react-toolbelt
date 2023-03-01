import { Children, FC, isValidElement, ReactNode } from 'react';

const INSTANCE_HASH_KEYS = ['component', 'min', 'max'];

interface InstanceEnumObject {
  component: FC;
  min?: number;
  max?: number;
}

interface ChildrenOptions {
  count?: number;
  /**
   * Check whether Children contain components and occur a certain number of times.
   * Either pass an array of ReactFunctionalComponents or an array of `InstanceEnumObjects`
   * containing the `component` itself and the, `min` and `max` occurences of the component.
   */
  instanceEnums?: FC[] | InstanceEnumObject[];
}

export const isValidChildren = (
  children: ReactNode,
  { count, instanceEnums }: ChildrenOptions,
  validator?: () => boolean
) => {
  /** Initial validations */
  if (count && Children.count(children) !== count) return false;
  if (!Array.isArray(instanceEnums) || instanceEnums.length === 0) {
    return validator ? validator() : true;
  }

  const isInstanceEnumObject =
    !isValidElement(instanceEnums[0]) && typeof instanceEnums[0] === 'object';

  /** Run validations for FC[] - Check fails if any child doesn't match with any of the enums */
  if (!isInstanceEnumObject) {
    Children.forEach(children, (child) => {
      const isValid = instanceEnums.some(
        (component) => child instanceof (component as FC)
      );
      if (!isValid) return false;
    });
  } else {
    /** Run validations for InstanceEnumObject[] - Check fails if any one enum fails */
    for (const enumsItem of instanceEnums) {
      if (
        Object.keys(enumsItem).some((key) => !INSTANCE_HASH_KEYS.includes(key))
      )
        return false;

      const { component, min, max } = enumsItem as InstanceEnumObject;
      let counter = 0;
      Children.forEach(children, (child) => {
        if (child instanceof component) counter++;
      });
      // Checks to see if `max` and `min` match as expected
      if (!min && !max && counter === 0) return false;
      if (min && counter > min) return false;
      if (max && counter < max) return false;
    }
  }
  // Return result of custom validator or `true`
  return validator ? validator() : true;
};
