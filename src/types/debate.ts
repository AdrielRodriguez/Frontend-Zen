export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  integrityScore: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  createdAt: string;
}

export interface Thought {
  id: string;
  authorId: string;
  content: string;
  tags: string[];
  confidenceLevel: number;
  evidenceLinks?: string[];
  createdAt: string;
}

export interface Thread {
  id: string;
  title: string;
  topicId: string;
  authorId: string;
  tags: string[];
  status: 'draft' | 'active' | 'consensus' | 'archived';
  consensusLevel: number;
  postCount: number;
  participantCount: number;
  truthRecordId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  threadId: string;
  authorId: string;
  body: string;
  votes: number;
  confidenceLevel: number;
  evidenceLinks?: string[];
  parentId?: string;
  replies?: Post[];
  createdAt: string;
}

export interface TruthRecord {
  id: string;
  threadId: string;
  version: number;
  summary: string;
  keyEvidence: string[];
  consensusScore: number;
  approvedBy: string[];
  createdAt: string;
}