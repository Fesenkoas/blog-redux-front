import React, { useEffect } from "react";
import { PopularPost } from "../components/PopularPost";
import PostItem from "../components/PostItem";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllPost } from "../redux/future/post/postSlise";

export const MainPage = () => {
  const dispatch = useDispatch();
  const { posts, popularPosts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAllPost());
  }, [dispatch]);


  return (
    <div className="max-w-[900px] mx-auto py-10">
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-10 basis-4/5">
          {
            posts?.map((post, idx) => (
              <PostItem key={idx} post={post} />)
          )}
        </div>
        <div className="basis-1/5">
          <div className="text-xs uppercase text-white">Popular Post</div>
          {popularPosts?.map((post, idx) => (
            <PopularPost key={idx} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};
