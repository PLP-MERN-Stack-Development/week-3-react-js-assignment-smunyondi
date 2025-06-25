import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../../api/postsApi';
import Sidebar from '../Sidebar';

const PostsList = ({
  preview = false,
  getPreviewPosts = null,
  gridCols = "grid-cols-1 sm:grid-cols-2"
}) => {
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [externalPosts, setExternalPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTags, setNewTags] = useState('');
  const [newImage, setNewImage] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editTags, setEditTags] = useState('');
  const [editImage, setEditImage] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch posts and userPosts
  useEffect(() => {
    setLoading(true);
    setError("");
    const localUserPosts = JSON.parse(localStorage.getItem('userPosts') || '[]')
      .filter(post => !query || post.tags.some(tag => tag.includes(query)));
    setUserPosts(localUserPosts);

    fetchPosts(page, 10, query)
      .then(data => {
        setExternalPosts(data);
        // For normal mode, combine both
        if (!isMobile) {
          const combined = page === 1 ? [...localUserPosts, ...data] : prev => [...prev, ...data];
          setPosts(combined);
          setHasMore(data.length === 10);
        }
      })
      .catch(() => setError("Failed to load posts"))
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [page, query, isMobile]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPage(1);
  };

  // Add a new post locally
  const handleCreatePost = () => setShowModal(true);

  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;
    const newPost = {
      id: Date.now(),
      title: newTitle,
      description: newDesc,
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean) || [],
      image: newImage,
      user: { name: "You" },
      url: "#"
    };
    // Save to localStorage
    const saved = JSON.parse(localStorage.getItem('userPosts') || '[]');
    localStorage.setItem('userPosts', JSON.stringify([newPost, ...saved]));
    setUserPosts([newPost, ...saved]);
    setPosts(prev => [newPost, ...prev]);
    setShowModal(false);
    setNewTitle('');
    setNewDesc('');
    setNewTags('');
    setNewImage('');
  };

  // Start editing
  const handleEdit = () => {
    setEditTitle(selectedPost.title);
    setEditDesc(selectedPost.description);
    setEditTags(selectedPost.tags ? selectedPost.tags.join(', ') : '');
    setEditImage(selectedPost.image || '');
    setIsEditing(true);
  };

  // Save edited post
  const handleSaveEdit = (e) => {
    e.preventDefault();
    const updatedPost = {
      ...selectedPost,
      title: editTitle,
      description: editDesc,
      tags: editTags.split(',').map(t => t.trim()).filter(Boolean),
      image: editImage,
    };
    // Update localStorage
    const saved = JSON.parse(localStorage.getItem('userPosts') || '[]');
    const updated = saved.map(p => p.id === updatedPost.id ? updatedPost : p);
    localStorage.setItem('userPosts', JSON.stringify(updated));
    setUserPosts(updated);
    setPosts(posts => posts.map(p => p.id === updatedPost.id ? updatedPost : p));
    setSelectedPost(updatedPost);
    setIsEditing(false);
  };

  // Choose posts to display
  let displayedPosts = posts;
  let isPreviewMode = false;
  if (isMobile) {
    const firstUser = userPosts[0];
    const firstExternal = externalPosts[0];
    displayedPosts = [firstUser, firstExternal].filter(Boolean);
    isPreviewMode = true;
  } else if (preview && getPreviewPosts) {
    displayedPosts = getPreviewPosts(posts);
    isPreviewMode = true;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="hidden lg:block fixed top-0 left-0 h-screen w-20 z-40">
        <Sidebar />
      </div>
      <main className="flex-1 flex flex-col items-center justify-start lg:ml-20 p-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 w-full max-w-5xl">
          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 py-2 rounded-full shadow transition mb-4"
            onClick={handleCreatePost}
          >
            Create Post
          </button>
          {!isPreviewMode && (
            <input
              className="w-full border border-blue-300 rounded px-4 py-2 mb-4"
              placeholder="Search by tag (e.g. react, javascript)..."
              value={query}
              onChange={handleSearch}
            />
          )}
          {loading && <div>Loading...</div>}
          {error && <div className="text-red-500">{error}</div>}
          <ul className={`grid gap-4 ${isPreviewMode ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'} w-full`}>
            {displayedPosts.map(post => (
              <li
                key={post?.id}
                className="bg-blue-50 rounded-xl p-4 sm:p-6 shadow flex flex-col h-56 hover:ring-2 hover:ring-indigo-300 transition"
                onClick={() => {
                  if (post?.user?.name === "You") {
                    setSelectedPost(post);
                  } else if (post?.url && post?.url !== "#") {
                    window.open(post.url, "_blank", "noopener,noreferrer");
                  }
                }}
              >
                <h3 className="font-semibold text-indigo-700 mb-2 text-base sm:text-lg">{post?.title}</h3>
                <p className="text-gray-700 mb-2 line-clamp-4 overflow-hidden">{post?.description}</p>
                {Array.isArray(post?.tags) && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {post.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-blue-200 text-blue-800 rounded-full text-xs">{tag}</span>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
          {!isPreviewMode && hasMore && !loading && (
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => setPage(p => p + 1)}
            >
              Load More
            </button>
          )}

          {/* Modal for creating a post */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <form
                className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full relative"
                onSubmit={handleSubmitPost}
              >
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl"
                  onClick={() => setShowModal(false)}
                  type="button"
                  aria-label="Close"
                >
                  &times;
                </button>
                <h3 className="text-2xl font-bold mb-4">Create Post</h3>
                <input
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
                  placeholder="Title"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  maxLength={100}
                  required
                />
                <textarea
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-4 resize-y min-h-[48px] max-h-60"
                  placeholder="Description"
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  rows={3}
                  required
                />
                <input
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
                  placeholder="Tags (comma separated, e.g. react,js)"
                  value={newTags}
                  onChange={e => setNewTags(e.target.value)}
                />
                <input
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                  placeholder="Image URL (optional)"
                  value={newImage}
                  onChange={e => setNewImage(e.target.value)}
                />
                <button
                  className="w-full py-2 rounded-full bg-blue-700 text-white font-bold text-lg hover:bg-blue-800 transition"
                  type="submit"
                >
                  Post
                </button>
              </form>
            </div>
          )}

          {/* Modal for viewing/editing a post */}
          {selectedPost && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full relative max-h-[80vh] overflow-y-auto">
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl"
                  onClick={() => { setSelectedPost(null); setIsEditing(false); }}
                  aria-label="Close"
                >
                  &times;
                </button>
                {isEditing ? (
                  <form onSubmit={handleSaveEdit}>
                    <h3 className="text-2xl font-bold mb-4">Edit Post</h3>
                    <input
                      className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
                      placeholder="Title"
                      value={editTitle}
                      onChange={e => setEditTitle(e.target.value)}
                      maxLength={100}
                      required
                    />
                    <textarea
                      className="w-full border border-gray-300 rounded px-3 py-2 mb-4 resize-y min-h-[48px] max-h-60"
                      placeholder="Description"
                      value={editDesc}
                      onChange={e => setEditDesc(e.target.value)}
                      rows={3}
                      required
                    />
                    <input
                      className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
                      placeholder="Tags (comma separated)"
                      value={editTags}
                      onChange={e => setEditTags(e.target.value)}
                    />
                    <input
                      className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                      placeholder="Image URL"
                      value={editImage}
                      onChange={e => setEditImage(e.target.value)}
                    />
                    <button
                      className="w-full py-2 rounded-full bg-blue-700 text-white font-bold text-lg hover:bg-blue-800 transition"
                      type="submit"
                    >
                      Save
                    </button>
                  </form>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold mb-2">{selectedPost.title}</h3>
                    <p className="mb-2 text-sm text-gray-600">By {selectedPost.user.name}</p>
                    {selectedPost.image && selectedPost.image.trim() && (
                      <img
                        src={selectedPost.image}
                        alt={selectedPost.title}
                        className="mb-2 rounded max-h-60 object-cover w-full"
                        onError={e => { e.target.style.display = 'none'; }}
                      />
                    )}
                    <div className="text-gray-700 mb-2 max-h-60 overflow-y-auto whitespace-pre-line">
                      {selectedPost.description}
                    </div>
                    {Array.isArray(selectedPost.tags) && selectedPost.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedPost.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-blue-200 text-blue-800 rounded-full text-xs">{tag}</span>
                        ))}
                      </div>
                    )}
                    {selectedPost.user.name === "You" && (
                      <div className="flex gap-2 mt-4">
                        <button
                          className="w-full py-2 rounded-full bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition"
                          onClick={handleEdit}
                          type="button"
                        >
                          Edit
                        </button>
                        <button
                          className="w-full py-2 rounded-full bg-red-600 text-white font-bold text-lg hover:bg-red-700 transition"
                          onClick={() => {
                            const saved = JSON.parse(localStorage.getItem('userPosts') || '[]');
                            const updated = saved.filter(p => p.id !== selectedPost.id);
                            localStorage.setItem('userPosts', JSON.stringify(updated));
                            setUserPosts(updated);
                            setPosts(posts => posts.filter(p => p.id !== selectedPost.id));
                            setSelectedPost(null);
                            setIsEditing(false);
                          }}
                          type="button"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PostsList;