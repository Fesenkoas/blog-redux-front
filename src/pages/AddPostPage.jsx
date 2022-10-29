import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "./../redux/future/post/postSlise";
import { useNavigate } from "react-router-dom";
import FileBase64 from "react-file-base64";

export const AddPostPage = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickAdd = () => {
    try {
      setText("");
      setTitle("");
      setImage("");
      dispatch(createPost({title,text,image}));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickCancel = () => {
    setText("");
    setTitle("");
    setImage("");
  };
  return (
    <div className="w-1/3 mx-auto py-10">
        <label className="text-gray-300 py2 bg-gray-600 text-xsmt-3 flex items-center justify-center border-2 border-dotted cursor-pointer">
          <FileBase64
            multiple={false}
            onDone={({ base64 }) => setImage({image:base64})}
          />
        </label>
        <div className="flex object-cover py-2 w-max h-max activator">
          {image && <img src={image.image} alt={image.name} />}
        </div>

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
    </div>
  );
};
