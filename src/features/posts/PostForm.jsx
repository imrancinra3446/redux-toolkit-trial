import { nanoid } from "nanoid";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "./postSlice";


const ProductForm = ({ postToEdit = {}, isEdit = false }) => {

    const dispatch = useDispatch()

    const [post, setPost] = useState({
        title: '',
        body: ''
    });

    useEffect(() => {
        if (postToEdit) {
            setPost({
                title: postToEdit.title ?? '',
                body: postToEdit.body ?? ''
            })
        }
    }, [postToEdit]);

    const handleChange = e => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (isEdit) {
            dispatch(updatePost({ id: postToEdit.id, post }))
        } else {
            dispatch(createPost({ ...post, id: nanoid() }))
        }
    }



    return (
        <form onSubmit={(e) => handleSubmit(e)} style={{ maxWidth: 600, }} className="mt-3 mx-auto bg-dark p-4 rounded-2">
            <input
                onChange={(e) => handleChange(e)}
                name="title" type="text" value={post.title}
                className="form-control mb-2" placeholder="Title" />
            <textarea
                onChange={(e) => handleChange(e)}
                name="body" className="form-control mb-2" value={post.body} rows="3" placeholder="Your Post" />
            <button type="submit" className="btn btn-success btn-sm">{isEdit ? "Update" : "Post"}</button>
        </form>
    )
}

export default ProductForm
