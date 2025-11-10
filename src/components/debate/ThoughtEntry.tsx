'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDebate } from '@/hooks/useDebate';

export function ThoughtEntry() {
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const { createThought, loading } = useDebate();

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSubmit = async () => {
    if (!content.trim()) return;

    try {
      await createThought({
        authorId: 'user-1',
        content,
        tags,
        confidenceLevel: 0.8,
        evidenceLinks: evidenceUrl ? [evidenceUrl] : []
      });

      setContent('');
      setTags([]);
      setEvidenceUrl('');
      alert('Thought created!');
    } catch (error) {
      alert('Failed to create thought');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Share Your Thought</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Your Argument or Claim</Label>
          <Textarea
            placeholder="What's your perspective?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={1000}
            rows={6}
            className="mt-2"
          />
          <div className="text-xs text-gray-500 mt-1">{content.length}/1000</div>
        </div>

        <div>
          <Label>Tags</Label>
          <div className="flex gap-2 mt-2">
            <Input
              placeholder="Add tag..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTag()}
            />
            <Button onClick={addTag} type="button">Add</Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, i) => (
              <Badge key={i} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                {tag} ×
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <Label>Evidence URL (optional)</Label>
          <Input
            placeholder="https://..."
            value={evidenceUrl}
            onChange={(e) => setEvidenceUrl(e.target.value)}
            className="mt-2"
          />
        </div>

        <Button onClick={handleSubmit} disabled={loading || !content.trim()} className="w-full">
          {loading ? 'Submitting...' : 'Submit Thought'}
        </Button>
      </CardContent>
    </Card>
  );
}