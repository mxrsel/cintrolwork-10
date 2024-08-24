import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {deleteNews, fetchNews} from "../store/newsThunks.ts";
import {selectNews, selectNewsError, selectNewsLoading} from "../store/newsSlice.ts";
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {Box, Button, Card, CardContent, List} from "@mui/material";

const NewsList: React.FC = () => {
    const dispatch = useAppDispatch();
    const news = useAppSelector(selectNews);
    const loading = useAppSelector(selectNewsLoading);
    const error = useAppSelector(selectNewsError);

    useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch]);

        const handleDelete = (id: number) => {
            dispatch(deleteNews(id));
        console.log(`Delete news post with id: ${id}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <Box sx={{display: 'flex', 'justifyContent': 'space-between'}}>
            <h1>News List</h1>
           <Button sx={{textDecoration: 'none'}} variant="outlined"><Link to="/add-post">Add new post</Link></Button>
            </Box>
            <Box sx={{display: 'flex', 'flex-direction': 'column'}}>
                {news.map((item) => (
                    <List key={item.id}>
                        <Card>
                            <CardContent sx={{textDecoration: 'none'}}><Link to={`/news/${item.id}`}>{item.title}</Link></CardContent>
                        <Button variant='contained' onClick={() => handleDelete(item.id)}>Delete</Button>
                        </Card>
                    </List>
                ))}
            </Box>
        </div>
    );
};

export default NewsList;
