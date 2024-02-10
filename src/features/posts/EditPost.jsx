import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { deletePost, selectPostById, updatePost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState("idle");

  if (!post) {
    return (
      <section className="flex justify-center items-center">
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onTitleChanged = (event) => setTitle(event.target.value);
  const onContentChanged = (event) => setContent(event.target.value);
  const onAuthorChanged = (event) => setUserId(Number(event.target.value));

  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        // we don't pass the date here becuase the post slice will create a new
        // date object apon successful update request
        // (check the case where the updatePost is handled in the extraReducers function)
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          }),
        ).unwrap();
        setTitle("");
        setUserId("");
        setContent("");
        navigate(`/post/${postId}`);
      } catch (error) {
        console.error("Failed to save the post", error);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const onDeletePostClicked = () => {
    try {
      setRequestStatus("pending");
      dispatch(deletePost({ id: post.id })).unwrap();
      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (error) {
      console.error("Failed to delete the post", error);
    } finally {
      setRequestStatus("idle");
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2 className="text-5xl font-bold mt-10 mb-5 text-slate-800">
        Update Post
      </h2>
      <form className="flex flex-col">
        <label htmlFor="postTitle" className="text-slate-800 text-lg font-bold">
          Post Title:
        </label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          className="bg-slate-100 p-1 text-lg border border-slate-400 rounded-lg"
          onChange={onTitleChanged}
        />
        <label
          htmlFor="postAuthor"
          className="text-slate-800 text-lg font-bold"
        >
          Author:
        </label>
        <select
          id="postAuthor"
          value={userId}
          onChange={onAuthorChanged}
          className="bg-slate-100 p-1 text-lg border border-slate-400 rounded-lg"
        >
          <option value=""></option>
          {usersOptions}
        </select>
        <label
          htmlFor="postContent"
          className="text-slate-800 text-lg font-bold"
        >
          Content:
        </label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          className="bg-slate-100 p-1 text-lg border border-slate-400 rounded-lg"
          onChange={onContentChanged}
        />
        <button
          type="button"
          onClick={onSavePostClicked}
          className="bg-blue-400 p-1 text-blue-900 text-lg border border-blue-800 rounded-lg mt-4 transition hover:scale-105 active:scale-95"
          disabled={!canSave}
        >
          Save Post
        </button>
        <button
          type="button"
          onClick={onDeletePostClicked}
          className="bg-red-300 p-1 text-red-900 text-lg border border-red-900 rounded-lg mt-4 transition hover:scale-105 active:scale-95"
        >
          Delete Post
        </button>
      </form>
    </section>
  );
};

export default EditPost;
