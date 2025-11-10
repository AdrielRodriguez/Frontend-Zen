'use client';

import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useState } from 'react';

interface VoteButtonsProps {
  postId: string;
  initialVotes: number;
  onVote: (postId: string, value: number) => Promise<any>;
}

export function VoteButtons({ postId, initialVotes, onVote }: VoteButtonsProps) {
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const handleVote = async (value: number) => {
    if (loading) return;
    setLoading(true);

    const actualVote = userVote === value ? 0 : value;
    const voteDiff = actualVote - userVote;
    
    // Optimistic update
    setVotes(votes + voteDiff);
    setUserVote(actualVote);

    try {
      await onVote(postId, voteDiff);
    } catch (err) {
      // Revert on error
      setVotes(votes);
      setUserVote(userVote);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        className={`h-8 w-8 p-0 ${userVote === 1 ? 'text-green-600' : 'text-gray-400'}`}
        onClick={() => handleVote(1)}
        disabled={loading}
      >
        <ArrowUp className="w-5 h-5" />
      </Button>
      <span className="text-sm font-semibold">{votes}</span>
      <Button
        variant="ghost"
        size="sm"
        className={`h-8 w-8 p-0 ${userVote === -1 ? 'text-red-600' : 'text-gray-400'}`}
        onClick={() => handleVote(-1)}
        disabled={loading}
      >
        <ArrowDown className="w-5 h-5" />
      </Button>
    </div>
  );
}
