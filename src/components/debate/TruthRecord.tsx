'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, ExternalLink, Download, Share2 } from 'lucide-react';
import { TruthRecord } from '@/types/debate';

interface TruthRecordProps {
  truthRecord: TruthRecord;
}

export function TruthRecordDisplay({ truthRecord }: TruthRecordProps) {
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  return (
    <Card className="border-4 border-green-500 bg-green-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-green-600" />
            <span>Truth Record v{truthRecord.version}</span>
          </CardTitle>
          <Badge className="bg-green-600 text-white">
            {Math.round(truthRecord.consensusScore * 100)}% Consensus
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">Summary</h4>
          <p className="text-gray-800">{truthRecord.summary}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Key Evidence</h4>
          <ul className="space-y-2">
            {truthRecord.keyEvidence.map((evidence, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <ExternalLink className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <a href={evidence} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                  {evidence}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Approved By</h4>
          <div className="flex flex-wrap gap-2">
            {truthRecord.approvedBy.map((userId, i) => (
              <Badge key={i} variant="secondary">@user{userId.slice(-4)}</Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-4 border-t">
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        <div className="text-xs text-gray-500 pt-2">
          Created: {new Date(truthRecord.createdAt).toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
}
