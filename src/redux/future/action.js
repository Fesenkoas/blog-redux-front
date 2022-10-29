import axios from "axios";

export const fetchMyPost = async () => {
    try {
      const { data } = await axios.get("/posts/user/me");
      return data
    } catch (error) {
      console.log(error);
    }
  };