# Backend (Express + Mongoose)

Minimal Express + Mongoose backend for the blog.

Setup:

```bash
cd backend
npm install
cp .env.example .env
# edit .env if needed
npm run dev
```

API endpoints:
- `GET /api/posts` - list posts
- `POST /api/posts` - create post
- `GET /api/posts/:id` - get post
- `PUT /api/posts/:id` - update post
- `DELETE /api/posts/:id` - delete post
