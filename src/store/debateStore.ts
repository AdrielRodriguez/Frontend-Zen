import { create } from 'zustand';
import { Thread, Post } from '@/types/debate';

interface DebateStore {
  threads: Thread[];
  activeThread: Thread | null;
  posts: Record<string, Post[]>;
  loading: boolean;
  error: string | null;
  selectedTags: string[];

  setThreads: (threads: Thread[]) => void;
  setActiveThread: (thread: Thread | null) => void;
  setPosts: (threadId: string, posts: Post[]) => void;
  addPost: (threadId: string, post: Post) => void;
  updatePostVote: (postId: string, newVotes: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedTags: (tags: string[]) => void;
}

export const useDebateStore = create<DebateStore>((set) => ({
  threads: [],
  activeThread: null,
  posts: {},
  loading: false,
  error: null,
  selectedTags: [],

  setThreads: (threads) => set({ threads }),
  setActiveThread: (thread) => set({ activeThread: thread }),
  setPosts: (threadId, posts) => set((state) => ({ posts: { ...state.posts, [threadId]: posts } })),
  addPost: (threadId, post) => set((state) => ({
    posts: { ...state.posts, [threadId]: [...(state.posts[threadId] || []), post] }
  })),
  updatePostVote: (postId, newVotes) => set((state) => {
    const updatedPosts = { ...state.posts };
    Object.keys(updatedPosts).forEach(threadId => {
      updatedPosts[threadId] = updatedPosts[threadId].map(post =>
        post.id === postId ? { ...post, votes: newVotes } : post
      );
    });
    return { posts: updatedPosts };
  }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setSelectedTags: (tags) => set({ selectedTags: tags })
}));
