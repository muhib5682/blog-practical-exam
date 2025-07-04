import React, { useEffect, useState } from 'react';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [showCommentBox, setShowCommentBox] = useState(null);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`http://localhost:3000/posts/all?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error('Failed to fetch posts:', err));
  }, []);

  const handleCommentSubmit = async (postId) => {
    try {
      const res = await fetch('http://localhost:3000/comments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: user.id,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        setMessage('✅ Comment added successfully');
        setComment('');
        setShowCommentBox(null);
      } else {
        setMessage(result.message || 'Failed to add comment');
      }
    } catch (err) {
      setMessage(' sorry something is happen comment not sent ' );
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl text-center text-blue-600 dark:text-yellow-400 mb-10 tracking-tight">
          All Blogs
        </h2>

        {message && (
          <div className="text-center text-green-600 font-medium mb-6">{message}</div>
        )}

        {posts.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No blog posts found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 flex flex-col overflow-hidden relative"
              >
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-700 dark:text-yellow-300 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-4">
                      {post.content}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(post.createdAt)}
                    </span>
                    <button
                      onClick={() => setShowCommentBox(showCommentBox === post.id ? null : post.id)}
                      className="text-sm font-italic text-green-600 hover:underline"
                    >
                      💬 send Comment
                    </button>
                  </div>

                  {/* Comment Box */}
                  {showCommentBox === post.id && (
                    <div className="mt-4 bg-gray-100 dark:bg-gray-700 p-4 rounded-md shadow-inner animate-fade-in">
                      <textarea
                        placeholder="Write your comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full p-2 text-sm rounded border border-gray-300 dark:border-gray-600 focus:ring focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
                        rows={3}
                      ></textarea>
                      <div className="flex justify-end mt-2 gap-2">
                        <button
                          onClick={() => setShowCommentBox(null)}
                          className="px-3 py-1 bg-gray-400 hover:bg-gray-500 text-white text-sm rounded"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleCommentSubmit(post.id)}
                          className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </section>
  );
};

export default PostList;
