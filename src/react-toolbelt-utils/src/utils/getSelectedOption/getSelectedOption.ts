/**
 * Get the selected option from select options
 *
 */
export const getSelectedOption = (
  options: HTMLOptionElement[],
  value: string
) => {
  let selectedOption = options.find((option) => option.value === value);
  if (value === undefined) {
    selectedOption = options.find(
      (option) => !option.disabled && option.value !== ''
    );
  }
  return selectedOption || { label: '', value: '' };
};
