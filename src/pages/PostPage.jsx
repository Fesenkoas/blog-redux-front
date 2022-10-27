import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import {
  AiFillEye,
  AiOutlineMessage,
  AiTwotoneEdit,
  AiFillDelete,
} from "react-icons/ai";
import Moment from "react-moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removePost } from "./../redux/future/post/postSlise";
import { toast } from "react-toastify";
import {
  createComment,
  getPostComment,
} from "../redux/future/comment/commentSlice";
import CommentsItem from "../components/CommentsItem";

export const PostPage = () => {
  
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comment);
  const dispatch = useDispatch();
  const params = useParams();
  const navgate = useNavigate();
  
  const commentHandle = () => {
    try {
      const postId = params.id;
      dispatch(createComment({ postId, comment }));
      setComment("");
    } catch (error) {}
  };

  const removeHandler = () => {
    try {
      dispatch(removePost(params.id));
      toast("Post remove");
      navgate("/posts");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setPost(data);
  }, [params.id]);

  const fetchComment = useCallback(async () => {
    try {
      dispatch(getPostComment(params.id));
    } catch (error) {
      console.log(error);
    }
  }, [params.id,dispatch]);

  useEffect(() => {
    fetchPost();
    fetchComment();
  }, [fetchPost, fetchComment]);

  // useEffect(() => {
  //   fetchComment();
  // }, [fetchComment]);

  if (!post) {
    return (
      <div className="text-xl text-center text-white py-10">LOADING....</div>
    );
  }
  return (
    <div>
      <button className="flex justify-center items-center bg-gray-600vtext-xs text-white rounded-sm py-2 px-4">
        <Link to={"/"}>Back</Link>
      </button>
      <div className="flex gap-10 py-8">
        <div className="w-2/3">
          <div className="flex flex-col basis-1/4 flex-grow">
            <div
              className={
                post.imgUrl ? "flex rounded-sm h-80" : "flex rounded-sm"
              }
            >
              {post.imgUrl && (
                <img
                  src={`https://ancient-depths-75826.herokuapp.com/${post.imgUrl}`}
                  alt="amg"
                  className="object-cover w-full"
                />
              )}
            </div>
            <div className="flex justify-between items-center pt-2">
              <div className="text-xs text-white opacity-50">
                {post.username}
              </div>
              <div className="text-xs text-white opacity-50">
                <Moment data={post.createdAt} format="D MMM YYYY" />
              </div>
            </div>
            <div className="text-white text-xl">{post.title}</div>
            <p className="text-white opacity-60 text-xs pt-4">{post.text}</p>

            <div className="flex gap-3 mt-2 items-center justify-between">
              <div className="flex gap-3 mt-4">
                <button className="flex items-center justify-center gap-2 text-white opacity-70">
                  <AiFillEye /> <span>{post.views}</span>
                </button>
                <button className="flex items-center justify-center gap-2 text-white opacity-70">
                  <AiOutlineMessage />
                  <span>{post.comments?.length || 0}</span>
                </button>
              </div>
              {user?._id === post.autor && (
                <div className="flex gap-3 mt-4">
                  <button className="flex items-center justify-center gap-2 text-white opacity-70">
                    <Link to={`/${params.id}/edit`}>
                      <AiTwotoneEdit />
                    </Link>
                  </button>
                  <button
                    onClick={removeHandler}
                    className="flex items-center justify-center gap-2 text-white opacity-70"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-1/3 p-8 bg-gray-400 flex flex-col gap-2 rounded-sm">
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              type="text"
              placeholder="Comment"
              className="text-black w-full rounded-sm bg-gray-300 border p-2 text-xs outline-none placeholder:text-gray-700"
            />
            <button
              onClick={commentHandle}
              type="submit"
              className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-4 px-4"
            >
              Comments
            </button>
          </form>
          {comments?.map((cmt)=> (<CommentsItem key={cmt._id} cmt={cmt}/>))}
        </div>
      </div>
    </div>
  );
};
