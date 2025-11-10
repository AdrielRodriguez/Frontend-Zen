import { Thread, Post, Thought, User } from '@/types/debate';

export const mockUsers: User[] = [
  { id: 'user-1', email: 'alice@zentrais.com', name: 'Alice Chen', integrityScore: 850, tier: 'gold', createdAt: '2025-10-01T00:00:00Z' },
  { id: 'user-2', email: 'bob@zentrais.com', name: 'Bob Martinez', integrityScore: 620, tier: 'silver', createdAt: '2025-10-05T00:00:00Z' },
  { id: 'user-3', email: 'carol@zentrais.com', name: 'Carol Johnson', integrityScore: 1200, tier: 'platinum', createdAt: '2025-09-15T00:00:00Z' }
];

export const mockThreads: Thread[] = [
  {
    id: 'thread-1',
    title: 'Climate Change: Is the 1.5°C target still achievable?',
    topicId: 'climate-001',
    authorId: 'user-1',
    tags: ['climate', 'science', 'policy'],
    status: 'active',
    consensusLevel: 0.72,
    postCount: 24,
    participantCount: 8,
    createdAt: '2025-11-01T10:00:00Z',
    updatedAt: '2025-11-07T14:30:00Z'
  },
  {
    id: 'thread-2',
    title: 'AI Safety: Should we pause frontier model training?',
    topicId: 'ai-safety-001',
    authorId: 'user-3',
    tags: ['ai', 'ethics', 'safety'],
    status: 'consensus',
    consensusLevel: 0.88,
    postCount: 42,
    participantCount: 15,
    truthRecordId: 'truth-1',
    createdAt: '2025-10-28T08:00:00Z',
    updatedAt: '2025-11-06T16:20:00Z'
  },
  {
    id: 'thread-3',
    title: 'Universal Basic Income: Evidence from pilot programs',
    topicId: 'ubi-001',
    authorId: 'user-2',
    tags: ['economics', 'policy', 'welfare'],
    status: 'active',
    consensusLevel: 0.54,
    postCount: 18,
    participantCount: 6,
    createdAt: '2025-11-05T12:00:00Z',
    updatedAt: '2025-11-07T11:15:00Z'
  }
];

export const mockPosts: Post[] = [
  {
    id: 'post-1',
    threadId: 'thread-1',
    authorId: 'user-1',
    body: 'According to the latest IPCC 2024 report, we need to reduce emissions by 43% by 2030 to stay on track for 1.5°C. Current policies put us at 2.7°C warming by 2100.',
    votes: 12,
    confidenceLevel: 0.9,
    evidenceLinks: ['https://ipcc.ch/report/ar7/wg1/'],
    createdAt: '2025-11-01T10:05:00Z'
  },
  {
    id: 'post-2',
    threadId: 'thread-1',
    authorId: 'user-2',
    body: 'But renewable energy deployment is accelerating faster than predicted. Solar and wind are now cheaper than fossil fuels in most markets.',
    votes: 8,
    confidenceLevel: 0.85,
    evidenceLinks: ['https://iea.org/reports/renewables-2024'],
    parentId: 'post-1',
    createdAt: '2025-11-01T11:20:00Z'
  },
  {
    id: 'post-3',
    threadId: 'thread-1',
    authorId: 'user-3',
    body: 'True, but deployment speed isn\'t enough. We also need carbon removal at scale, which is still nascent and expensive.',
    votes: 15,
    confidenceLevel: 0.8,
    evidenceLinks: ['https://nature.com/articles/cdr-scale-2024'],
    parentId: 'post-2',
    createdAt: '2025-11-01T14:30:00Z'
  }
];

export const debateMockApi = {
  getThreads: async (filters?: { tag?: string; status?: string }): Promise<Thread[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    let filtered = [...mockThreads];
    if (filters?.tag) filtered = filtered.filter(t => t.tags.includes(filters.tag));
    if (filters?.status) filtered = filtered.filter(t => t.status === filters.status);
    return filtered;
  },

  getThread: async (id: string): Promise<Thread | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockThreads.find(t => t.id === id) || null;
  },

  getPosts: async (threadId: string): Promise<Post[]> => {
    await new Promise(resolve => setTimeout(resolve, 250));
    return mockPosts.filter(p => p.threadId === threadId);
  },

  createThought: async (thought: Omit<Thought, 'id' | 'createdAt'>): Promise<Thought> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { id: 'thought-' + Date.now(), ...thought, createdAt: new Date().toISOString() };
  },

  createPost: async (post: Omit<Post, 'id' | 'createdAt' | 'votes'>): Promise<Post> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newPost: Post = { id: 'post-' + Date.now(), ...post, votes: 0, createdAt: new Date().toISOString() };
    mockPosts.push(newPost);
    return newPost;
  },

  votePost: async (postId: string, value: number): Promise<{ success: boolean; newVotes: number }> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const post = mockPosts.find(p => p.id === postId);
    if (post) {
      post.votes += value;
      return { success: true, newVotes: post.votes };
    }
    return { success: false, newVotes: 0 };
  },

  getUser: async (id: string): Promise<User | null> => {
    await new Promise(resolve => setTimeout(resolve, 150));
    return mockUsers.find(u => u.id === id) || null;
  }
};