# useChange

`useChange` is a custom React hook that allows you to add change event listeners
to your components. This hook is implemented using the `@react-toolbelt/hooks`
package.

It takes two parameters, a `element` and a `callback` function.

---

## Parameters

### `element`: Document | HTMLElement

The HTML Element on which to listen for change events (optional, defaults to the
document object).

> **Note**: Provide only a single element, not the entire ref object.

### `cb`: (target: HTMLElement) => void

A callback function that will be called when the component is changed. This
function takes one parameter, `target`, which is the DOM element that was
changed.

---

## Return value

Returns `undefined`. Use the `cb` function to handle the `EventTarget` object.

---

## Syntax

```jsx
import { useChange } from '@react-toolbelt/hooks';

useChange(ref.current, (target) => {
  // At every change event, you have access to the EventTarget object
});
```

---

## Example

Here's an example of how you can use `useChange` in your React component:

```javascript
/** Controlled Components and Validations in a Form using the useChange hook */
import { useRef, useState } from 'react';
import { useChange } from '@react-toolbelt/hooks';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    skills: ''
  });

  const formRef = useRef(null);

  useChange(formRef.current, (target) => {
    if (['INPUT', 'SELECT'].includes(target.tagName)) {
      const { name, value, type } = target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  });

  return (
    <form ref={formRef}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        value={formData.firstName}
      />

      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        value={formData.lastName}
      />

      <div className="RadioGroup flex flex-col gap-4">
        <span className="radio-button align-center inline-flex justify-center gap-3">
          <label htmlFor="male">Male</label>
          <input
            id="male"
            name="gender"
            type="radio"
            value="male"
            checked={formData.gender === 'male'}
          />
        </span>

        <span className="radio-button align-center inline-flex justify-center gap-3">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="female"
            name="gender"
            type="radio"
            value="female"
            checked={formData.gender === 'female'}
          />
        </span>

        <span className="radio-button align-center inline-flex justify-center gap-3">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="other"
            name="gender"
            type="radio"
            value="other"
            checked={formData.gender === 'other'}
          />
        </span>
      </div>

      <label htmlFor="skills">Skills</label>
      <select id="skills" name="skills" value={formData.skills}>
        <option value="">{'--Select a Skill--'}</option>
        <option value="javascript">JavaScript</option>
        <option value="css">CSS</option>
        <option value="react">React</option>
      </select>
      <button className="btn btn-submit" type="submit">
        Submit
      </button>
    </form>
  );
};
```
