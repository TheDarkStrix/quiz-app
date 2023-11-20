import React from "react";
import PropTypes from "prop-types";
import style from "./options.module.css";

Option.propTypes = {};

function Option({ text, onClick, checked }) {
  console.log("checked", checked);
  return (
    <div
      className={`${style.container} ${checked && style.checked}`}
      onClick={onClick}
    >
      <div className={style.checkContainer}>
        {checked ? (
          <span className={style.checkmark}>✓</span>
        ) : (
          <span className={style.noCheckMark}></span>
        )}
      </div>
      <div>{text}</div>
    </div>
  );
}

export default Option;
