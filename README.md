# Search and Pagination App

This project implements a search and pagination system using a backend powered by **Node.js, Express**, and **MongoDB**, with a frontend built in **React** and **Bootstrap**. It allows users to search, filter, and sort blog posts or articles by various fields such as "likes," "dislikes," and "views."

## Features

- **Search**: Allows users to search posts by title or body using keywords.
- **Pagination**: Displays paginated results with adjustable items per page.
- **Filtering**: Filter posts based on fields like `likes`, `dislikes`, or `views`.
- **Sorting**: Sort posts in ascending or descending order based on the selected field.
- **Frontend**: Built with React, Bootstrap, and Axios to handle API requests and display results.
- **Backend**: A RESTful API built using Node.js, Express, and MongoDB, managing search, sorting, and pagination operations.

## Technologies Used

- **Frontend**: React, Bootstrap, Axios
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Libraries**:
  - **Mongoose**: MongoDB ODM for object modeling
  - **Cors**: For enabling Cross-Origin Resource Sharing
  - **Axios**: For making HTTP requests from the frontend

## Setup Instructions

Follow these steps to set up and run both the frontend and backend applications locally using **Yarn**.

### Prerequisites

Make sure you have the following installed:

- **Node.js** (version >= 16)
- **MongoDB** (or use MongoDB Atlas for cloud-based database)
- **Yarn** (If you don't have Yarn installed, you can install it by running `npm install -g yarn`)

### Backend Setup (Node.js + MongoDB)

1. **Clone the repository**:

   ```bash
   git clone https://github.com/afzalmansuri786/blog-search-mern.git
   cd blog-search-mern
   ```

2. **Install backend dependencies**:

   In the root of the project, run the following command to install the backend dependencies using Yarn.

   ```bash
   cd backend
   yarn install
   ```

3. **Configure MongoDB**:

   - If you are using a local MongoDB setup, make sure MongoDB is running locally on `mongodb://localhost:27017`.
   - If you're using **MongoDB Atlas**, update the MongoDB URI in `configs/mongodb.config.js` to point to your cloud database.

4. **Import mock data into MongoDB**:

   To quickly get started, you can use the provided `mockdata.json` to populate your MongoDB database. Simply follow these steps:

   - Open **MongoDB Compass** (or use the **mongo shell**).
   - Connect to your MongoDB instance.
   - Select the **desired database** or create a new one.
   - Use the **"Add Data"** option in MongoDB Compass and select **"Import File"**.
   - Choose the `mockdata.json` file from the project and import it. This will populate your database with mock posts, reactions, and views data.

   The `mockdata.json` is located in the `backend/data` folder of this project.

5. **Start the backend server**:

   Once dependencies are installed and MongoDB is configured, run the following command to start the backend server.

   ```bash
   yarn start
   ```

   The backend API will be available at `http://localhost:5000`.

### Frontend Setup (React)

1. **Install frontend dependencies**:

   In the `frontend` directory, run the following command to install the frontend dependencies using Yarn.

   ```bash
   cd frontend
   yarn install
   ```

2. **Configure the frontend to connect with the backend**:

   Make sure that the frontend is configured to connect to the backend running on `http://localhost:5000`. This is done in the frontend's Axios request URLs.

3. **Start the frontend server**:

   To run the frontend React application, execute the following command.

   ```bash
   yarn start
   ```

   The frontend will be available at `http://localhost:3000`.

### Endpoints

#### 1. **GET `/search`**
   - **Query Parameters**:
     - `query` (optional): Search term to filter posts by title or body.
     - `filterField` (optional): Field to filter by (`likes`, `dislikes`, `views`).
     - `sortOrder` (optional): Sorting order (`asc`, `desc`).
     - `limit` (optional, default: `10`): Number of items to display per page.
     - `skip` (optional, default: `0`): Offset for pagination, used to skip records for the correct page.
   - **Response**:
     - `data`: Array of posts matching the search and filter criteria.
     - `totalItems`: Total number of posts matching the search criteria (for pagination purposes).
     - `totalPages`: Total number of pages based on `limit` and `totalItems`.
     - `currentPage`: Current page number.

#### Example Request:
```http
GET http://localhost:5000/search?query=react&filterField=likes&sortOrder=asc&limit=10&skip=0
```

#### Example Response:
```json
{
  "data": [
    {
      "id": 1,
      "title": "Learning React",
      "body": "React is a powerful JavaScript library...",
      "reactions": {
        "likes": 50,
        "dislikes": 2
      },
      "views": 1000
    },
    {
      "id": 2,
      "title": "Advanced React",
      "body": "Understanding advanced topics in React...",
      "reactions": {
        "likes": 45,
        "dislikes": 1
      },
      "views": 900
    }
  ],
  "totalItems": 100,
  "totalPages": 10,
  "currentPage": 1
}
```

### UI Details

- **Search Input**: Users can search for posts by typing keywords in the search box.
- **Filter by Field**: Users can select the field by which to filter the posts (e.g., `likes`, `dislikes`, `views`).
- **Sort Order**: Users can choose the sorting order (ascending or descending).
- **Pagination**: Display the paginated results, allowing users to navigate between pages. The current page is displayed, and users can click on page numbers to navigate.
- **Items per Page**: Users can select how many items to display per page (5, 10, 20, or 50).

### Running in Production

To build and deploy the application for production, you can use the following steps:

1. **Build the React app**:
   ```bash
   cd frontend
   yarn build
   ```

2. **Serve the React app in production**:
   You can configure your backend to serve the built React app by adding the following code in your backend's Express server:
   
   ```javascript
   import path from 'path';

   // Serve static files from the React app
   app.use(express.static(path.join(__dirname, 'frontend/build')));

   // Catch-all handler for any other route, to serve the React app
   app.get('*', (req, res) => {
       res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
   });
   ```

3. **Deploy the app**:
   - **Backend**: You can deploy your backend using services like **Heroku**, **DigitalOcean**, or **AWS**.
   - **Frontend**: You can deploy the React app using **Netlify**, **Vercel**, or **GitHub Pages**.

### Conclusion

This app provides a robust solution for displaying and interacting with a collection of posts, with built-in search, filtering, sorting, and pagination. The backend is built with Node.js and MongoDB, while the frontend is built using React and Bootstrap for a responsive and user-friendly interface. With the **mockdata.json**, you can quickly populate your MongoDB database and start using the app immediately.
