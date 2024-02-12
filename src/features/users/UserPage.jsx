import { useSelector } from "react-redux";
import { selectUserById } from "./usersSlice";
import { Link, useParams } from "react-router-dom";
import { selectPostsByUserId } from "../posts/postsSlice";

const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));

  const usersPosts = useSelector((state) =>
    selectPostsByUserId(state, Number(userId)),
  );

  const renderedPosts = usersPosts.map((post) => (
    <li
      className="bg-slate-800 py-2 px-5 my-4 text-xl rounded-lg"
      key={post.id}
    >
      <Link
        className="block text-white capitalize hover:text-slate-400"
        to={`/post/${post.id}`}
      >
        {post.title}
      </Link>
    </li>
  ));

  return (
    <section>
      <h2 className="text-5xl font-bold mt-10 mb-5 text-slate-800">
        {user.name} Posts
      </h2>
      <ul>{renderedPosts}</ul>
    </section>
  );
};

export default UserPage;
