import React, { useCallback, useEffect } from "react";
import axios from "../utils/axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { editPost } from "../redux/future/post/postSlise";

export const EditPostPage = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [oldImage, setOldImage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setTitle(data.title);
    setText(data.text);
    setOldImage(data.imgUrl);
  }, [params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handleClickAdd = () => {
    try {
      const updatedPost = new FormData();
      updatedPost.append("title", title);
      updatedPost.append("text", text);
      updatedPost.append("image", image);
      updatedPost.append("id", params.id);
      dispatch(editPost(updatedPost));
      setText("");
      setTitle("");
      setImage("");
      setOldImage("");
      navigate("/posts");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickCancel = () => {
    setText("");
    setTitle("");
    setImage("");
    setOldImage("");
  };

  return (
    <form className="w-1/3 mx-auto py-10" onSubmit={(e) => e.preventDefault()}>

      <label className="text-xs text-white opacity-70">
        Header Post
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="header post"
          value={title}
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700 "
        />
      </label>
      <label className="text-xs text-white opacity-70">
        Text Post
        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="text post"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700 "
        />
      </label>
      <div className="flex gap-8 items-center justify-center mt-4">
        <button
          onClick={handleClickAdd}
          className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
        >
          Add
        </button>
        <button
          onClick={handleClickCancel}
          className="flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
