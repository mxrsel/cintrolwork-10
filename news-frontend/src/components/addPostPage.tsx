import { useNavigate } from 'react-router-dom';
import {useAppDispatch} from "../app/hooks.ts";
import {useState} from "react";
import {createNews} from "../store/newsThunks.ts";
import {Button, Container} from "@mui/material";

const AddPostPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate(); // Для навигации
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = () => {
        dispatch(createNews({ title, content, image }))
            .unwrap()
            .then(() => {
                navigate('/');
            });
    };

    return (
        <div>
            <h1>Add New Post</h1>
            <Container sx={{display: 'flex', flexDirection: 'column'}}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
            />
            <input
                type="file"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
            <Button sx={{marginTop: '10px'}} variant='contained' onClick={handleSubmit}>Submit</Button>
            </Container>
        </div>
    );
};

export default AddPostPage;
