import { deleteCookie } from "../Hooks/cookie";
import axios from "axios";
import Cookies from "js-cookie";
import { confirmDialog } from "primereact/confirmdialog";
import toast from "react-hot-toast";

// Function to fetch the latest token from cookie
export const getToken = () => Cookies.get("Token");

export const request = async (props) => {


  try {
    
    const response = await axios?.[props?.method](
      `${import.meta.env.VITE_API_BASE_URL}${props?.url}`,
      props?.cred,
      {
        headers: {
            Authorization: `${getToken()}`,
        },
        withCredentials: true,
      }
    )
    return response;

  } catch (error) {
    if (error.response.status === 401) {
      deleteCookie("DoctorAddaPanel");
      // window != undefined && (window.location.href = `${import.meta.env.VITE_SIGNUP_URL}`);
      console.error("Unauthorized: Redirecting to login page");
    }
    throw error;
  }
};

export const getRequest = async (url) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}${url}`,
      {
        headers: {
            Authorization: `${getToken()}`,
        },
      }
    );
    // console.log('res',response)

    return response;
  } catch (error) {
    if (error.response.status === 401) {
      deleteCookie("DoctorAddaPanel");
      console.error("Unauthorized: Redirecting to login page");
    }
    throw error;
  }
};
// export const getRequest = async (url) => {
//   try {
//     const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}${url}`, {
//       headers: {
//         Authorization: `${token}`,
//       },
//       ...(params && { params }) // ✅ only include params if provided
//     });

//     return response;
//   } catch (error) {
//     if (error.response?.status === 401) {
//       deleteCookie('DoctorAddaPanel');
//       console.error('Unauthorized: Redirecting to login page');
//     }
//     throw error;
//   }
// };

export const postRequest = async (props) => {
  // console.log("post api props====", props);

  try {
    const response = await axios?.post(
      `${import.meta.env.VITE_API_BASE_URL}${props?.url}`,
      props?.cred,
      {
        headers: {
            Authorization: `${getToken()}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(123, error);
    // toast.error(error?.response?.data?.message);
  }
};

export const putRequest = async (props) => {
  try {
    const response = await axios?.put(
      `${import.meta.env.VITE_API_BASE_URL}${props?.url}`,
      props?.cred,
      {
        headers: {
            Authorization: `${getToken()}`,
        },
      }
    );

    return response;
  } catch (error) {
    if (error.response.status === 401) {
      deleteCookie("DoctorAddaPanel");
      window != undefined &&
        (window.location.href = `${import.meta.env.VITE_SIGNUP_URL}`);
      console.error("Unauthorized: Redirecting to login page");
    }
    // Handle other errors here
    throw error; // Re-throw the error to allow the caller to handle it
  }
};

export const patchRequest = async (props) => {
  try {
    const response = await axios?.patch(
      `${import.meta.env.VITE_API_BASE_URL}${props?.url}`,
      props?.cred,
      {
        headers: {
            Authorization: `${getToken()}`,
        },
      }
    );

    return response;
  } catch (error) {
    if (error.response.status === 401) {
      deleteCookie("DoctorAddaPanel");
      window != undefined &&
        (window.location.href = `${import.meta.env.VITE_SIGNUP_URL}`);
      console.error("Unauthorized: Redirecting to login page");
    }
    // Handle other errors here
    throw error; // Re-throw the error to allow the caller to handle it
  }
};

export const deleteRequest = async (url) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}${url}`,
      {
        headers: {
            Authorization: `${getToken()}`,
        },
      }
    );

    return response;
  } catch (error) {
    if (error.response.status === 401) {
      deleteCookie("DoctorAddaPanel");
      window != undefined &&
        (window.location.href = `${import.meta.env.VITE_SIGNUP_URL}`);
      console.error("Unauthorized: Redirecting to login page");
    }
    // Handle other errors here
    throw error; // Re-throw the error to allow the caller to handle it
  }
};

export const deleteRequest1 = async (url) => {
  try {
    const confirmed = await confirmDeletion(
      "Are you sure you want to delete this item?"
    );
    if (confirmed) {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}${url}`,
        {
          headers: {
              Authorization: `${getToken()}`,
          },
        }
      );

      return response;
    } else {
      throw "An error occurred while deleting the item";
    }
  } catch (error) {
    if (error?.response?.status) {
      if (error.response.status === 401) {
        deleteCookie("DoctorAddaPanel");
        console.error("Unauthorized: Redirecting to login page");
      }
    }
    // Handle other errors here
    throw error; // Re-throw the error to allow the caller to handle it
  }
};

export const noTokenGetRequest = async (url) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}${url}`,
    {
      withCredentials: true,
    }
  );
  return response;
};

export const noTokenPostRequest = async (props) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}${props?.url}`,
    props?.cred,
    {
      withCredentials: true,
    }
  );
  return response;
};

export const noTokenPutRequest = async (props) => {
  const response = await axios.put(
    `${import.meta.env.VITE_API_BASE_URL}${props?.url}`,
    props?.cred,
    {
      withCredentials: true,
    }
  );
  return response;
};

export const noTokenPatchRequest = async (props) => {
  const response = await axios.patch(
    `${import.meta.env.VITE_API_BASE_URL}${props?.url}`,
    props?.cred,
    {
      withCredentials: true,
    }
  );
  return response;
};

export const noTokenDeleteRequest = async (url) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_API_BASE_URL}${url}`,
    {
      withCredentials: true,
    }
  );
  return response;
};

export const fileUpload = async (props) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}${props?.url}`,
      props?.cred,
      {
        headers: {
          Authorization: `${getToken()}`,
          "Content-Type": "multipart/form-data",
        },
        // withCredentials: true,
      }
    );

    return response;
  } catch (error) {
    if (error.response.status === 401) {
      deleteCookie("DoctorAddaPanel");
      window != undefined &&
        (window.location.href = `${import.meta.env.VITE_SIGNUP_URL}`);
      console.error("Unauthorized: Redirecting to login page");
    }
    // Handle other errors here
    throw error; // Re-throw the error to allow the caller to handle it
  }
};

export const noTokenfileUpload = async (props) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}${props?.url}`,
      props?.cred,
      {
        responseType: "arraybuffer",
        headers: {
            Authorization: `${getToken()}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    return response;
  } catch (error) {
    if (error.response.status === 401) {
      console.error("Unauthorized: Redirecting to login page");
    }

    throw error;
  }
};

// Function to display a confirmation dialog
const confirmDeletion = async (message) => {
  return new Promise((resolve) => {
    const accept = () => resolve(true);
    const reject = () => resolve(false);
    confirmDialog({
      message: message,
      header: "Confirm Deletion",
      icon: "warning",
      acceptClassName: "p-button-danger",
      acceptText: "Delete",
      accept: accept,
      reject: reject,
    });
  });
};
