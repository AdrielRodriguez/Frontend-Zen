'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { useState } from 'react';

interface ConsensusVoteProps {
  threadId: string;
  consensusLevel: number;
  onVote: (option: 'adopt' | 'iterate' | 'reject', reason?: string) => void;
}

export function ConsensusVote({ threadId, consensusLevel, onVote }: ConsensusVoteProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [reason, setReason] = useState('');
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (option: 'adopt' | 'iterate' | 'reject') => {
    setSelectedOption(option);
  };

  const submitVote = () => {
    if (selectedOption) {
      onVote(selectedOption as 'adopt' | 'iterate' | 'reject', reason);
      setHasVoted(true);
    }
  };

  const consensusPercent = Math.round(consensusLevel * 100);

  return (
    <Card className="border-2 border-indigo-200 bg-indigo-50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Consensus Checkpoint</span>
          <Badge variant="outline">{consensusPercent}% Consensus</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="w-full bg-gray-300 rounded-full h-4 mb-4">
          <div 
            className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full"
            style={{ width: `${consensusPercent}%` }}
          />
        </div>

        {!hasVoted ? (
          <>
            <p className="text-sm text-gray-700">
              The community is voting on whether to adopt this consensus position. Cast your vote:
            </p>

            <div className="grid grid-cols-3 gap-3">
              <Button
                variant={selectedOption === 'adopt' ? 'default' : 'outline'}
                className="flex flex-col items-center py-6"
                onClick={() => handleVote('adopt')}
              >
                <CheckCircle className="w-6 h-6 mb-2" />
                <span>Adopt</span>
              </Button>
              <Button
                variant={selectedOption === 'iterate' ? 'default' : 'outline'}
                className="flex flex-col items-center py-6"
                onClick={() => handleVote('iterate')}
              >
                <RefreshCw className="w-6 h-6 mb-2" />
                <span>Iterate</span>
              </Button>
              <Button
                variant={selectedOption === 'reject' ? 'default' : 'outline'}
                className="flex flex-col items-center py-6"
                onClick={() => handleVote('reject')}
              >
                <XCircle className="w-6 h-6 mb-2" />
                <span>Reject</span>
              </Button>
            </div>

            {selectedOption && (
              <div className="space-y-2">
                <label className="text-sm font-semibold">Reason (optional)</label>
                <Textarea
                  placeholder="Why did you vote this way?"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                />
                <Button onClick={submitVote} className="w-full">
                  Submit Vote
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-6">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <p className="font-semibold">Vote Recorded!</p>
            <p className="text-sm text-gray-600">Thank you for participating in consensus building.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}