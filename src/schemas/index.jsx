import * as Yup from "yup";

export const signUpSignInSchema = Yup.object({
  userName: Yup.string()
    .trim()
    .min(2)
    .max(25)
    .required("Please enter your name"),
  email: Yup.string().trim().email().required("Please enter your email"),
  password: Yup.string().trim().min(6).required("Please enter your password"),
  confirmPassword: Yup.string()
    .trim()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must match"),
  mobile: Yup.string()
    .trim()
    .matches(
      /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/,
      "Please enter a valid 10-digit mobile number"
    )
    .required("Please enter your mobile number"),
});
