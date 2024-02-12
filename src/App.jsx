import AddPostForm from "./features/posts/AddPostForm";
import PostsList from "./features/posts/PostList";
import Layout from "./components/Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import PostPage from "./features/posts/PostPage";
import EditPost from "./features/posts/EditPost";
import UsersList from "./features/users/UsersList";
import UserPage from "./features/users/UserPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />
        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<PostPage />} />
          <Route path="edit/:postId" element={<EditPost />} />
        </Route>
        <Route path="users">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
