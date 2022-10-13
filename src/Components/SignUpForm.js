import axios from "axios";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CheckBoxInput from "../Common/CheckBoxInput";
import Input from "../Common/Input";
import RadioInput from "../Common/RadioButton";
import Select from "../Common/Select";
import TermsConditions from "../Common/TermsConditions";

// 1. managing state
const initialValues = {
  name: "",
  email: "",
  gender: "",
  password: "",
  phoneNumber: "",
  passwordConfirm: "",
  nationality: "",
  intrests: [],
  terms: false,
};

// 2. handling form submission
const onSubmit = (values) => {
  console.log("Submited ....", values);
  axios
    .post("http://localhost:3001/users", values)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};

const PhoneRegex = /^[0-9]{11}$/;

// 3. validation - error messages
const validationSchema = Yup.object({
  name: Yup.string().required("Name is Required"),
  email: Yup.string()
    .email("Invalid Email Format")
    .required("Email is Required"),
  phoneNumber: Yup.string()
    .required("PhoneNumber is Required")
    .matches(PhoneRegex, "Phone number is not valid"),
  password: Yup.string()
    .required("Password is Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must be match")
    .required("PasswordConfrimation is Required"),
  gender: Yup.string().required("Gender is not valid"),
  nationality: Yup.string().required("Nationality is not valid"),
  intrests: Yup.array().min(1).required("at least select one expertise"),
  terms: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
});

const SignUpForm = () => {
  const [formValues, setFormValues] = useState(null);

  const formik = useFormik({
    initialValues: formValues || initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((res) => setFormValues(res.data[0]))
      .catch((err) => console.log(err));
  }, []);

  const inputs = [
    { label: "Name", name: "name" },
    { label: "Email", name: "email" },
    { label: "PhoneNumber", name: "phoneNumber" },
    { label: "Password", type: "password", name: "password" },
    {
      label: "Password Confirmation",
      type: "password",
      name: "passwordConfirm",
    },
  ];

  const RadioBtns = [
    { radioDetail: 0, gender: "Male" },
    { radioDetail: 1, gender: "Female" },
  ];

  const selectOptions = [
    { label: "Select Nationality ...", value: "" },
    { label: "IRAN", value: "IR" },
    { label: "Germany", value: "GER" },
    { label: "USA", value: "USA" },
  ];

  const checkBoxOptions = [
    { label: "React.js", value: "React.js" },
    { label: "Vue.js", value: "Vue.js" },
    { label: "Angular.js", value: "Angular.js" },
  ];
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        {/* <div className="formControl">
          <label>Name</label>
          <input
            type="text"
            name="name"
            // value={formik.values.name}
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            {...formik.getFieldProps("name")}
          />
          {formik.errors.name && formik.touched.name && (
            <div className="error">{formik.errors.name}</div>
          )}
        </div> */}
        {inputs.map((input) => (
          <Input {...input} key={input.name} formik={formik} />
        ))}
        <RadioInput RadioBtns={RadioBtns} formik={formik} name="gender" />
        <Select
          selectOptions={selectOptions}
          formik={formik}
          name="nationality"
        />
        <CheckBoxInput
          checkBoxOptions={checkBoxOptions}
          name="intrests"
          formik={formik}
        />
        <TermsConditions formik={formik} name="terms" />
        <div>
          <button type="submit" disabled={!formik.isValid}>
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
