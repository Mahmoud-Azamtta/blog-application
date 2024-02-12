import { useSelector } from "react-redux";
import { selectAllUsers } from "./usersSlice";
import { Link } from "react-router-dom";

const UsersList = () => {
  const users = useSelector(selectAllUsers);

  const renderedUsers = users.map((user) => (
    <li
      className="bg-slate-800 py-2 px-5 my-4 text-xl rounded-lg"
      key={user.id}
    >
      <Link
        className="block text-white hover:text-slate-400"
        to={`/users/${user.id}`}
      >
        {user.name}
      </Link>
    </li>
  ));

  return (
    <section>
      <h2 className="text-5xl font-bold mt-10 mb-5 text-slate-800">Users</h2>
      <ul className="w-full">{renderedUsers}</ul>
    </section>
  );
};

export default UsersList;
