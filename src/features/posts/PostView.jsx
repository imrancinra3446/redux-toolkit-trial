import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchPosts, removePost } from "./postSlice";
import PostForm from "./PostForm";


const PostView = () => {

  const dispatch = useDispatch()

  const [isEdit, setIsEdit] = useState(false)
  const [postToEdit, setPostToEdit] = useState({})

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const { isLoading, posts, error } = useSelector(state => state.posts);

  const handlePostToEdit = (post) => {
    setPostToEdit(post);
    setIsEdit(true);
  }

  const handleEdit = (post) => {
    handlePostToEdit(post)
  }

  return (
    <div className="container">
      <PostForm postToEdit={postToEdit} isEdit={isEdit} />
      <div className="text-center">
        {isLoading && <h3>Loading...</h3>}
        {error && <h3>{error}</h3>}
      </div>
      <div className="row justify-content-around my-2">
        {posts && posts.map((post) => {
          return <div key={post.id} className="col-lg-5 mx-auto my-1 p-3 bg-secondary rounded-3">
            <div className="d-flex justify-content-end mb-1">
              <button onClick={() => handleEdit(post)} className="btn btn-sm btn-info me-2">Edit</button>
              <button onClick={() => dispatch(removePost(post.id))} className="btn btn-sm btn-danger">Delete</button>
            </div>
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>
        })}
      </div>
    </div>
  )
};

export default PostView
