import React, { useState } from 'react';
import { User, ForumPost } from '../types';
import { forumPosts as mockPosts } from '../constants';

interface ForumProps {
    currentUser: User | null;
}

export const Forum: React.FC<ForumProps> = ({ currentUser }) => {
    const [posts, setPosts] = useState<ForumPost[]>(mockPosts);
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);

    const handlePostSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPostTitle || !newPostContent || !currentUser) return;
        
        const newPost: ForumPost = {
            id: posts.length + 1,
            author: {
                name: isAnonymous ? 'Anonymous' : currentUser.name,
                avatar: isAnonymous ? 'https://api.dicebear.com/8.x/adventurer/svg?seed=anonymous' : currentUser.avatar
            },
            title: newPostTitle,
            content: newPostContent,
            timestamp: 'Just now',
            replies: 0,
            isAnonymous,
        };

        setPosts([newPost, ...posts]);
        setNewPostTitle('');
        setNewPostContent('');
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Community Forum</h1>
            
            {/* New Post Form */}
            {currentUser && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8 transition-colors duration-300">
                    <h2 className="text-xl font-bold mb-4">Ask a Question</h2>
                    <form onSubmit={handlePostSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="postTitle" className="sr-only">Title</label>
                            <input
                                type="text"
                                id="postTitle"
                                value={newPostTitle}
                                onChange={e => setNewPostTitle(e.target.value)}
                                placeholder="Enter a descriptive title..."
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="postContent" className="sr-only">Content</label>
                            <textarea
                                id="postContent"
                                value={newPostContent}
                                onChange={e => setNewPostContent(e.target.value)}
                                placeholder="What's on your mind?"
                                rows={4}
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent"
                                required
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <input id="anonymous" type="checkbox" checked={isAnonymous} onChange={e => setIsAnonymous(e.target.checked)} className="h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                                <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">Post Anonymously</label>
                            </div>
                            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700">Post</button>
                        </div>
                    </form>
                </div>
            )}
            
            {/* Posts List */}
            <div className="space-y-6">
                {posts.map(post => (
                    <div key={post.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-300">
                        <div className="flex items-center mb-4">
                            <img src={post.author.avatar} alt="author" className="w-10 h-10 rounded-full" />
                            <div className="ml-3">
                                <p className="font-semibold text-gray-800 dark:text-white">{post.author.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{post.timestamp}</p>
                            </div>
                        </div>
                        <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">{post.content}</p>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                           <ReplyIcon />
                           <span className="ml-1">{post.replies} Replies</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ReplyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>;
