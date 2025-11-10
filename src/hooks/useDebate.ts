import { useDebateStore } from '@/store/debateStore';
import { debateMockApi } from '@/lib/api/mock/debates';
import { Thought, Post } from '@/types/debate';

export function useDebate() {
  const {
    threads, activeThread, posts, loading, error, selectedTags,
    setThreads, setActiveThread, setPosts, addPost, updatePostVote,
    setLoading, setError, setSelectedTags
  } = useDebateStore();

  const loadThreads = async (filters?: { tag?: string; status?: string }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await debateMockApi.getThreads(filters);
      setThreads(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load threads');
    } finally {
      setLoading(false);
    }
  };

  const loadThread = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const thread = await debateMockApi.getThread(id);
      if (thread) {
        setActiveThread(thread);
        const threadPosts = await debateMockApi.getPosts(id);
        setPosts(id, threadPosts);
      } else {
        setError('Thread not found');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load thread');
    } finally {
      setLoading(false);
    }
  };

  const createThought = async (thought: Omit<Thought, 'id' | 'createdAt'>) => {
    setLoading(true);
    setError(null);
    try {
      const newThought = await debateMockApi.createThought(thought);
      return newThought;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create thought');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (post: Omit<Post, 'id' | 'createdAt' | 'votes'>) => {
    setLoading(true);
    setError(null);
    try {
      const newPost = await debateMockApi.createPost(post);
      addPost(post.threadId, newPost);
      return newPost;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const voteOnPost = async (postId: string, value: number) => {
    try {
      const result = await debateMockApi.votePost(postId, value);
      if (result.success) {
        updatePostVote(postId, result.newVotes);
      }
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to vote');
      throw err;
    }
  };

  return {
    threads, activeThread, posts, loading, error, selectedTags,
    loadThreads, loadThread, createThought, createPost, voteOnPost, setSelectedTags
  };
}