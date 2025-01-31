import React from "react";
import styles from "./inputbox.module.css";

export default function InputBox({ label, margin, onChange, value, disabled }) {
  return (
    <div
      className={`${styles["input-box-container"]} ${
        margin !== undefined ? margin : ""
      }`}
    >
      <input
        name={label}
        className={`${styles.input} ${
          disabled ? styles["disabled-input"] : ""
        }`}
        value={value !== undefined ? value : undefined}
        type="text"
        id="input"
        onChange={(e) => onChange(label, e.target.value)}
        required
      ></input>
      <label className={styles.label} htmlFor="input">
        {label}
      </label>
    </div>
  );
}
