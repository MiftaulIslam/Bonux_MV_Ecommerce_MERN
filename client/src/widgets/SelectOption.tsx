import { FC } from "react"

/**
 * An universal select option component.
 * 
 * @description
 * Takes three properties:
 * 
 * - options: An array of options to be displayed in the select dropdown
 * @param {(e: string | number) => void} onChange - A state updater function to be called when an option is selected
 * - className : An optional prop for styling the dropdown
 */
const SelectOption:FC<{
  options: Array<string|number>,
  /**
   * @param {string | number} State updater function - Called when an option is selected.  
  */
  onChange:(e: string| number)=> void,
  className?:string,
}> = ({options,onChange, className}) => {
  return (
    <>
       <label className="text-sm" htmlFor="useSelect">Show: </label>
              <select
                onChange={(e) => onChange(parseInt(e.target.value))} //
                name="useSelect"
                id="useSelect"
                className={` ${className}`}>
                  {/* Iterating over the options and show as options */}
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
    </>
  )
}

export default SelectOption