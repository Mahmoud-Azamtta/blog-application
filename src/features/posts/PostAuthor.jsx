import { useSelector } from "react-redux"
import { selectAllUsers } from "../users/usersSlice"

const PostAuthor = ({ userId }) => {
  const users = useSelector(selectAllUsers);
  
  const author = users.find(user => user.id === userId);

  return (
    <span className="text-blue-400 font-bold">
      By { author ? author.name : "Unkonwn author" }
    </span>
  )
}

export default PostAuthor
