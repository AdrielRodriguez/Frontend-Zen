'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ExternalLink, Plus, X } from 'lucide-react';
import { useState } from 'react';

interface EvidencePanelProps {
  evidenceLinks: string[];
  onAdd?: (url: string) => void;
  onRemove?: (url: string) => void;
  editable?: boolean;
}

export function EvidencePanel({ evidenceLinks, onAdd, onRemove, editable = false }: EvidencePanelProps) {
  const [newUrl, setNewUrl] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleAdd = () => {
    if (newUrl.trim() && onAdd) {
      onAdd(newUrl.trim());
      setNewUrl('');
    }
  };

  if (evidenceLinks.length === 0 && !editable) {
    return null;
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-sm">Evidence Sources</h4>
        <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Collapse' : 'Expand'}
        </Button>
      </div>

      {expanded && (
        <div className="space-y-2">
          {evidenceLinks.map((link, i) => (
            <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <a 
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-blue-600 hover:underline flex-1 truncate"
              >
                <ExternalLink className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{link}</span>
              </a>
              {editable && onRemove && (
                <Button variant="ghost" size="sm" onClick={() => onRemove(link)}>
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}

          {editable && onAdd && (
            <div className="flex gap-2 mt-3">
              <Input
                placeholder="https://example.com/source"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
              />
              <Button onClick={handleAdd} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
