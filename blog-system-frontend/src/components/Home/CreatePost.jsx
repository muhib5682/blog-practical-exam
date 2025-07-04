import React, { useState, useEffect } from 'react';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [selectedPostComments, setSelectedPostComments] = useState([]);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [selectedPostTitle, setSelectedPostTitle] = useState('');

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchUserPosts = async () => {
    try {
      const res = await fetch(`http://localhost:3000/posts/my-posts/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (Array.isArray(data)) setPosts(data);
    } catch (err) {
      console.error('Failed to load posts:', err);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = editingPost
      ? `http://localhost:3000/posts/update/${editingPost.id}`
      : 'http://localhost:3000/posts/create_posts';

    const method = editingPost ? 'PUT' : 'POST';

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          userId: user.id,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        setMessage(editingPost ? 'Post updated successfully!' : ' Post created successfully!');
        setTitle('');
        setContent('');
        setEditingPost(null);
        fetchUserPosts();
      } else {
        setMessage(result.message || 'Failed to save post.');
      }
    } catch (err) {
      setMessage('Error Occured Try again later: ' + err.message);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const res = await fetch(`http://localhost:3000/posts/delete/${postId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();
      if (res.ok) {
        setMessage('🗑️ Post deleted');
        fetchUserPosts();
      } else {
        setMessage(result.message || 'Delete failed');
      }
    } catch (err) {
      setMessage('❌ Error: ' + err.message);
    }
  };

  const handleViewComments = async (postId, postTitle) => {
    try {
      const res = await fetch(`http://localhost:3000/comments/by-post/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setSelectedPostComments(data);
      setSelectedPostTitle(postTitle);
      setShowCommentsModal(true);
    } catch (err) {
      console.error('Failed to fetch comments:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      {/* Form */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600 dark:text-yellow-400">
          {editingPost ? '✏️ Edit Post' : 'Create New Post'}
        </h2>
        {message && <div className="mb-4 text-center text-green-600 font-medium">{message}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
          <textarea
            placeholder="Write your content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
          <div className="flex justify-between items-center gap-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md shadow transition"
            >
              {editingPost ? 'Update Post' : 'Submit'}
            </button>
            {editingPost && (
              <button
                type="button"
                onClick={() => {
                  setEditingPost(null);
                  setTitle('');
                  setContent('');
                }}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-md shadow"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* User's Posts */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Your Posts</h3>
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">You have not created any posts yet.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h4 className="text-lg text-blue-700 dark:text-yellow-300 mb-1">{post.title}</h4>
              <p className="text-gray-700 dark:text-gray-300">{post.content}</p>
              <p className="text-sm text-right text-gray-400 mt-2">
                🕒 {new Date(post.createdAt).toLocaleString()}
              </p>
              <div className="flex justify-end mt-4 gap-2">
                <button
                  onClick={() => handleViewComments(post.id, post.title)}
                  className="px-4 py-1 text-sm bg-indigo-500 hover:bg-indigo-600 text-white rounded-md transition"
                >
                  💬 View Comments
                </button>
                <button
                  onClick={() => handleEdit(post)}
                  className="px-4 py-1 text-sm bg-green-500 hover:bg-green-600 text-white rounded-md transition"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="px-4 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md transition"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Comments Modal */}
      {showCommentsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-xl shadow-lg relative">
            <h3 className="text-lg font-semibold mb-4 text-blue-600 dark:text-yellow-400">
              💬 Comments on: <span className="font-bold">{selectedPostTitle}</span>
            </h3>
            {selectedPostComments.length === 0 ? (
              <p className="text-gray-500">No comments yet.</p>
            ) : (
              <ul className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {selectedPostComments.map((comment) => (
                  <li
                    key={comment.id}
                    className="border-l-4 border-yellow-500 pl-3 text-sm text-gray-700 dark:text-gray-300"
                  >
                   {' '}
                    • <em className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleString()}</em>
                    <p className="mt-1">{comment.content}</p>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => setShowCommentsModal(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
