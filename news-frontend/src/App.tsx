import { Routes, Route } from 'react-router-dom';
import NewsPage from './components/NewsPage';
import NewsList from "./components/NewList.tsx";
import AddPostPage from "./components/addPostPage.tsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<NewsList />} />
            <Route path="/news/:id" element={<NewsPage />} />
            <Route path="/add-post" element={<AddPostPage />} />
        </Routes>
    );
}

export default App;
