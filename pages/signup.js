

import RegisterRestaurant from "@/components/RegisterRestaurant";
import RegisterCustomer from "@/components/RegisterCustomer";

const SignupPage = ({ user, type }) => {
  // console.log(user, type);

  if (user === "restaurant") {
    return <RegisterRestaurant />;
  }
  if (user === "customer") {
    return <RegisterCustomer />;
  }
};

export default SignupPage;
