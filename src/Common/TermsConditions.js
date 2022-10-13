const TermsConditions = ({ formik, name }) => {
  return (
    <>
      <input
        type="checkbox"
        name={name}
        id="terms"
        value={true}
        onChange={formik.handleChange}
        checked={formik.values[name]}
      />
      <label htmlFor="terms">Terms and TermsConditions</label>
      {formik.errors[name] && (
        <div className="error">{formik.errors[name]}</div>
      )}
    </>
  );
};

export default TermsConditions;
