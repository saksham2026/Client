import React from "react";

function Buttun(props) {
  return (
    <div>
      <button value={props.value} id={props.id} className={props.className} type={props.type} onClick={props.onClick}>
        {props.text}
      </button>
    </div>
  );
}

export default Buttun;
