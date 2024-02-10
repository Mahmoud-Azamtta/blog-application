import AddPostForm from "./features/posts/AddPostForm";
import PostsList from "./features/posts/PostList";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import PostPage from "./features/posts/PostPage";
import EditPost from "./features/posts/EditPost";

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
      </Route>
    </Routes>
  );
}

export default App;
