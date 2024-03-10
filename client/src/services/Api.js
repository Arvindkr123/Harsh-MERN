import { commonRequest } from "./ApiCall";
import { BASE_URL } from "./helpers";
export const registerFunction = async (data, header) => {
  try {
    return await commonRequest(
      "POST",
      `${BASE_URL}/api/users/register`,
      data,
      header
    );
  } catch (error) {
    console.log(error);
  }
};

export const getUsersFunction = async () => {
  try {
    return await commonRequest("GET", `${BASE_URL}/api/users/details`);
  } catch (error) {
    console.log(error);
  }
};
