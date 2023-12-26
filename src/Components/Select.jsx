import React from "react";

function Select(props) {
  return (
    <div className={props.divClass}>
      <label htmlFor={props.id} className={props.labelClass}>{props.label}</label>
      <select
      defaultValue={props.defaultValue}
      disabled={props.disabled}
        name={props.name}
        id={props.id}
        className={props.className}
      >
        {props.options.map((element, index) => (
          <option
            value={`${element}`}
            key={`option${index + 1}`}
            className= {props.optionsClassname}
          >
            {element}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
