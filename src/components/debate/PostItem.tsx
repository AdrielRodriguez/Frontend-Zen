'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { VoteButtons } from './VoteButtons';
import { Post } from '@/types/debate';
import { Reply, ExternalLink } from 'lucide-react';

interface PostItemProps {
  post: Post;
  depth?: number;
  onReply?: (postId: string) => void;
  onVote: (postId: string, value: number) => Promise<any>;
}

export function PostItem({ post, depth = 0, onReply, onVote }: PostItemProps) {
  const marginLeft = depth > 0 ? `${depth * 2}rem` : '0';

  return (
    <div style={{ marginLeft }}>
      <Card className="p-4 mb-3">
        <div className="flex gap-3">
          <VoteButtons postId={post.id} initialVotes={post.votes} onVote={onVote} />
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <span className="text-sm font-semibold">@user{post.authorId.slice(-4)}</span>
              <span className="text-xs text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
              <Badge variant="outline" className="text-xs">
                {Math.round(post.confidenceLevel * 100)}% confident
              </Badge>
            </div>

            <p className="text-gray-800 mb-3">{post.body}</p>

            {post.evidenceLinks && post.evidenceLinks.length > 0 && (
              <div className="mb-3 space-y-1">
                {post.evidenceLinks.map((link, i) => (
                  <a 
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {link}
                  </a>
                ))}
              </div>
            )}

            {onReply && (
              <Button variant="ghost" size="sm" onClick={() => onReply(post.id)}>
                <Reply className="w-4 h-4 mr-1" />
                Reply
              </Button>
            )}
          </div>
        </div>
      </Card>

      {post.replies && post.replies.map((reply) => (
        <PostItem 
          key={reply.id}
          post={reply}
          depth={depth + 1}
          onReply={onReply}
          onVote={onVote}
        />
      ))}
    </div>
  );
}