import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import PostItem from "./../components/PostItem";

export const PostsPage = () => {
  const [post, setPost] = useState([]);

  const fetchMyPost = async () => {
    try {
      const { data } = await axios.get("/posts/user/me");
      setPost(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyPost();
  }, []);

  return (
    <div className="w-1/2 mx-auto py-10 flex flex-col gap-10">
      {post?.map((p, idx) => (
        <PostItem post={p} key={idx} />
      ))}
    </div>
  );
};
