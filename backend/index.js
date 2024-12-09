import express from 'express';
import cors from 'cors';
import { connectDB } from './configs/mongodb.config.js';
import { Post } from './models/mongodb.schema.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.get('/search', async (req, res) => {
    const { query, filterField, sortOrder, limit = 10, skip = 0 } = req.query;

    try {
        const searchQuery = query
            ? {
                $or: [
                    { title: { $regex: query, $options: 'i' } },
                    { body: { $regex: query, $options: 'i' } },
                ],
            }
            : {};

        const sortQuery = filterField && sortOrder
            ? { [filterField !== 'views' ? [`reactions.${filterField}`] : [filterField]]: sortOrder === 'asc' ? 1 : -1 }
            : {};

        const posts = await Post.find(searchQuery)
            .sort(sortQuery)
            .skip(parseInt(skip))
            .limit(parseInt(limit));

        const totalItems = await Post.countDocuments(searchQuery);

        const totalPages = Math.ceil(totalItems / limit);

        return res.json({
            data: posts,
            totalItems,
            totalPages,
            currentPage: Math.floor(skip / limit) + 1,
        });
    } catch (error) {
        console.error('Error occurred during search:', error);
        res.status(500).json({ message: 'An error occurred while processing the request.', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
