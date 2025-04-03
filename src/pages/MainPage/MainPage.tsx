import { useSelector } from "react-redux";
import styles from "./style.module.scss";
import { postsSelector } from "@/shared/slices/posts/postsSlice";
import { useDeletePostMutation, useEditPostMutation, useGetPostsQuery } from "@/shared/api/postsApi";
import { Post } from "@/shared/types/jsonplaceholder";

function MainPage() {
  useGetPostsQuery();
  const [editTitle] = useEditPostMutation();
  const [deletePost] = useDeletePostMutation();
  const { posts, loading, error } = useSelector(postsSelector);

  const handleDelete = (id: number) => {
    deletePost(id);
  };

  const handleEditTitle = (post: Post) => {
    const newTitle = prompt("Enter new title", post.title);
    if (newTitle) {
      editTitle({ ...post, title: newTitle });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.array}>
      {posts.map(post => (
        <div key={post.id} className={styles.post}>
          <div className={styles.id}>ID: {post.id}</div>
          <div className={styles.title}>
            <p>Title: {post.title}</p>
            <a onClick={() => handleEditTitle(post)}>edit</a>
          </div>
          <div className={styles.body}>Views: {post.views}</div>
          <button
            onClick={() => {
              handleDelete(post.id);
            }}
          >
            DELETE
          </button>
        </div>
      ))}
    </div>
  );
}

export default MainPage;
