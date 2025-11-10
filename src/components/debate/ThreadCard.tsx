'use client';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, MessageSquare, Clock } from 'lucide-react';
import { Thread } from '@/types/debate';
import { useRouter } from 'next/navigation';

interface ThreadCardProps {
  thread: Thread;
}

export function ThreadCard({ thread }: ThreadCardProps) {
  const router = useRouter();
  const consensusPercent = Math.round(thread.consensusLevel * 100);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'consensus': return 'bg-blue-100 text-blue-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const timeAgo = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now.getTime() - past.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    if (diffMins > 0) return `${diffMins}m ago`;
    return 'just now';
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-indigo-500"
      onClick={() => router.push(`/debate/${thread.id}`)}
    >
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <CardTitle className="text-lg font-semibold line-clamp-2">{thread.title}</CardTitle>
          <Badge className={getStatusColor(thread.status)}>{thread.status}</Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Avatar className="w-6 h-6">
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span>@user{thread.authorId.slice(-4)}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {thread.tags.map((tag, i) => (
            <Badge key={i} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-600">
            <span>Consensus</span>
            <span className="font-semibold">{consensusPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-blue-500 h-2 rounded-full"
              style={{ width: `${consensusPercent}%` }}
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="text-xs text-gray-500 flex justify-between">
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            <span>{thread.postCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{thread.participantCount}</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{timeAgo(thread.updatedAt)}</span>
        </div>
      </CardFooter>
    </Card>
  );
}