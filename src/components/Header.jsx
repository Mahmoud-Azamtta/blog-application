import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="fixed flex justify-between items-center bg-slate-700 text-white w-full py-2 px-24">
      <h1 className="text-3xl">Redux Blogs</h1>
      <ul className="links flex gap-4">
        <li>
          <Link to={"/"}>Posts</Link>
        </li>
        <li>
          <Link to={"/post"}>Add Post</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
