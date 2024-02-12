import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { addNewPost } from "./postsSlice";

const AddPostForm = () => {
  const users = useSelector(selectAllUsers);

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onTitleChanged = (event) => setTitle(event.target.value);
  const onContentChanged = (event) => setContent(event.target.value);
  const onAuthorChanged = (event) => setUserId(event.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";
  // every in the above line will take the array and convert "every" element in it to Boolean

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost({ title, body: content, userId })).unwrap(); // unwrap will throw an error if the process failed
        setTitle("");
        setContent("");
        setUserId("");
      } catch (error) {
        console.error("Failed to save the post", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section className="w-full">
      <h2 className="text-5xl font-bold mt-10 mb-5 text-slate-800">
        Add a New Post
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
          className="bg-blue-400 p-1 text-blue-900 text-lg border border-blue-800 rounded-lg mt-4"
          disabled={!canSave}
        >
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
