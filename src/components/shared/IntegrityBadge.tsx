'use client';

import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

interface IntegrityBadgeProps {
  score: number;
  tier?: 'bronze' | 'silver' | 'gold' | 'platinum';
  showDetails?: boolean;
}

export function IntegrityBadge({ score, tier = 'bronze', showDetails = false }: IntegrityBadgeProps) {
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum': return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'gold': return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
      case 'silver': return 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900';
      case 'bronze': return 'bg-gradient-to-r from-amber-600 to-amber-700 text-white';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  return (
    <Badge className={`${getTierColor(tier)} px-3 py-1 font-semibold`}>
      <Shield className="w-3 h-3 mr-1" />
      {score}
      {showDetails && (
        <span className="ml-1 text-xs opacity-80">({tier})</span>
      )}
    </Badge>
  );
}