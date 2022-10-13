import React from "react";

const RadioInput = ({ RadioBtns, formik, name }) => {
  return (
    <div className="formControl">
      {RadioBtns.map((radio) => (
        <React.Fragment key={radio.gender}>
          <input
            type="radio"
            name={name}
            id={radio.radioDetail}
            value={radio.radioDetail}
            onChange={formik.handleChange}
            checked={formik.values[name] === JSON.stringify(radio.radioDetail)}
          />
          <label htmlFor={radio.radioDetail}>{radio.gender}</label>
        </React.Fragment>
      ))}
      {formik.errors.gender && formik.touched.gender && (
        <div className="error">{formik.errors.gender}</div>
      )}
    </div>
  );
};

export default RadioInput;
