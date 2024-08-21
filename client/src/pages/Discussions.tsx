import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Post {
  _id: string;
  title: string;
  description: string;
  username: string;
  date: string;
  category: string;
  replies: string[];
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postTitle, setPostTitle] = useState<string>('');
  const [postDescription, setPostDescription] = useState<string>('');
  const [category, setCategory] = useState<string>(''); // State for category input
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const postsPerPage: number = 4;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/discussion/posts');
      setPosts(response.data);
      //if(posts.length===0) setTimeout(() => setErrorMessage('No Post Available Right Now'), 2000);

    } catch (error) {
       {console.error('Error fetching posts:', error);
      setErrorMessage('Failed to fetch posts. Please try again.');}
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!postTitle || !postDescription || !category) {
      setErrorMessage('Title, description, and category are required.');
      return;
    }

    try {
      const newPost = {
        title: postTitle,
        description: postDescription,
        username: 'Username', // Replace with actual username
        date: new Date().toLocaleDateString(),
        category: category, // Use category state
      };

      await axios.post('http://localhost:5000/api/discussion/posts', newPost);
      setPostTitle('');
      setPostDescription('');
      setCategory(''); // Clear category input
      setErrorMessage('');
      setSuccessMessage('Post submitted successfully!');
      fetchPosts();

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error creating post:', error);
      setErrorMessage('Failed to create post. Please try again.');
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/discussion/posts/${postId}`);
      fetchPosts(); 
    } catch (error) {
      console.error('Error deleting post:', error);
      setErrorMessage('Failed to delete post. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Kolkata',
    };
    return new Date(dateString).toLocaleString('en-IN', options);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-6xl min-h-screen mx-auto p-4 mt-16 text-white bg-black">
      <main>
        <textarea placeholder="Search the topic" className="w-full bg-secondary rounded-3xl h-9 my-4 py-auto border border-livenow"></textarea>
        <section className="mb-8 border rounded-lg px-8 py-8 h-auto">
          <form className="space-y-4  flex-col md:flex justify-between" onSubmit={handleSubmit}>
            <div className='space-y-4'>
              <input
                type="text"
                placeholder="Enter post title"
                className="w-full p-2 bg-secondary border border-white text-white rounded-lg"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
              />
              <textarea
                placeholder="Add description here"
                className="w-full p-2 h-32 bg-secondary border border-white text-white rounded-lg"
                value={postDescription}
                onChange={(e) => setPostDescription(e.target.value)}
              ></textarea>
              <input
                type="text"
                placeholder="Enter category"
                className="w-full p-2 bg-secondary border border-white text-white rounded-lg"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div>
              <div className='justify-end'>
                <h2 className="text-3xl font-semibold mb-4">Post a</h2>
                <h2 className="text-3xl font-semibold mb-4">new&nbsp;</h2>
                <h2 className="text-3xl font-semibold mb-4">discussion</h2>
              </div>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              {successMessage && <p className="text-green-500">{successMessage}</p>}
              <div className="flex justify-end space-x-4">
                <button type="button" className="py-2 px-4 border text-white rounded-3xl" onClick={() => { setPostTitle(''); setPostDescription(''); setCategory(''); setErrorMessage(''); }}>Cancel</button>
                <button type="submit" className="py-2 px-4 flex bg-red-600 text-white rounded justify-center">
                  Post
                </button>
              </div>
            </div>
          </form>
        </section>
        <h1 className="font-semibold text-3xl my-4 mx-4">All Discussion</h1>
        <section className="bg-black p-4 rounded">
          <div className="flex space-x-4 mb-4">
            <button className="py-2 px-4 bg-livenow rounded-t-lg text-black">Top Post</button>
          </div>
          <hr className="border-t border-livenow" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {currentPosts.map(post => (
                        <div key={post._id} className="bg-secondary p-4 rounded-lg">
              <div className='flex w-full justify-between'>
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <span className='bg-livenow rounded-tl-xl px-2 py-2 text-black'>{post.category}</span>
              </div>
              <p className="mt-2">{post.description}</p>
              <div className="flex justify-between mt-4 text-sm">
                <div className='flex flex-col bg-livenow px-2 py-2 rounded-tr-2xl text-black'>
                  <span>{post.username}</span>
                  <span>{formatDate(post.date)}</span> {/* Use formatted date here */}
                </div>
                <div className='flex gap-3 mt-8'>
                  <button className="py-1 px-2 bg-red-500 text-black rounded-tl-3xl" onClick={() => handleDeletePost(post._id)}>Delete</button>
                </div>
              </div>
            </div>
            ))}
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            {[...Array(Math.ceil(posts.length / postsPerPage)).keys()].map(number => (
              <button key={number + 1} onClick={() => paginate(number + 1)} className="py-1 px-3 bg-gray-700 rounded">{number + 1}</button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
