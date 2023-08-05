import * as Yup from "yup";

export const RegisterRes = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name should contain at least 2 characters")
    .max(25, "Name should be less than 26 characters"),
  email: Yup.string()
    .email()
    .required("Please enter your email")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$/i,
      "email must be a valid email"
    ),
  country: Yup.string().required("Please enter your country name"),
  city: Yup.string().required("Please enter your city name"),
  // file: Yup.mixed().required("Please upload a file"),
  password: Yup.string()
    .required("Please enter your password")
    .min(6, "Password must be more than 6 characters"),
});
export const RegisterCustomer = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name should contain at least 2 characters")
    .max(25, "Name should be less than 26 characters"),
  email: Yup.string()
    .email()
    .required("Please enter your email")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$/i,
      "email must be a valid email"
    ),
  phone: Yup.string().required("Phone number is required"),
  country: Yup.string().required("Please enter your country name"),
  city: Yup.string().required("Please enter your city name"),
  password: Yup.string()
    .required("Please enter your password")
    .min(6, "Password must be more than 6 characters"),
});

export const LoginSchemaRes = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(2, "Username should contain at least 2 characters")
    .max(25, "Username should be less than 26 characters"),
  // email: Yup.string()
  //   .email()
  //   .required("Please enter your email")
  //   .matches(
  //     /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$/i,
  //     "email must be a valid email"
  //   ),
  password: Yup.string()
    .required("Please enter your password")
    .min(6, "Password must be more than 6 characters"),
});
export const LoginSchemaCustomer = Yup.object({
  // username: Yup.string()
  //   .required("Username is required")
  //   .min(2, "Username should contain at least 2 characters")
  //   .max(25, "Username should be less than 26 characters"),
  email: Yup.string()
    .email()
    .required("Please enter your email")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$/i,
      "email must be a valid email"
    ),
  password: Yup.string()
    .required("Please enter your password")
    .min(6, "Password must be more than 6 characters"),
});

// export const RegisterRes = () => {
//   const schemaObj = {
//     name: Yup.string()
//       .required("Name is required")
//       .min(2, "Name should contain at least 2 characters")
//       .max(25, "Name should be less than 26 characters"),
//     email: Yup.string()
//       .email()
//       .required("Please enter your email")
//       .matches(
//         /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$/i,
//         "email must be a valid email"
//       ),
//     country: Yup.string().required("Please enter your country name"),
//     city: Yup.string().required("Please enter your city name"),
//     password: Yup.string()
//       .required("Please enter your password")
//       .min(6, "Password must be more than 6 characters"),
//     file: Yup.mixed()
//       .required("Please upload a file")
//       .test("filesize", "File size is too large", (value) => {
//         if (!value) {
//           return false;
//         }
//         // Add additional logic to check the file size here if needed
//         return true;
//       }),
//   };

//   return Yup.object().shape(schemaObj);
// };
