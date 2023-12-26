import React from "react";
import { useState } from "react";
function Input(props) {
  const [ show, setShow ] = useState(false);
  function handleShow(){
    setShow(!show);
  }
  return (
    <div className={props.divClass}>
      <label className={props.labelClass} htmlFor={props.id}>
        {props.label}
      </label>
      {!(props.type == "password") && (
        <input
          name={props.name}
          id={props.id}
          type={props.type}
          required={props.required ? true : false}
          placeholder={props.placeholder}
          autoComplete={false}
          className={props.inputClass}
          onChange={props.onChange}
          defaultValue={props.defaultValue}
          readOnly={props.readOnly}
          pattern={props.pattern}
        />
      )}
      {(props.type == "password") && (
        <div id="password-container" className={props.divClass}>
          <input
            name={props.name}
            id={props.id}
            type={!show?(props.type):`text`}
            required={props.required ? true : false}
            placeholder={props.placeholder}
            onChange={props.onChange}
            autoComplete={false}
            className={props.inputClass}
          />
          <a onClick={handleShow} className="underline text-green-800 cursor-pointer">
            {show&&<>Hide Password</>}
            {!show && (<>Show Password</>)}
          </a>
        </div>
      )}
    </div>
  );
}

export default Input;

