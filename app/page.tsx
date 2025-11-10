'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MessageSquare, Users, Shield } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url('/fondo-new.jpg')` }}
    >
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto text-center bg-white/80 p-8 rounded-lg shadow-lg">
          <h1 className="text-5xl font-bold mb-6 text-gray-900">
            Zentrais Debate Engine
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Where truth is validated through structured argumentation and community consensus
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <MessageSquare className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Structured Debates</h3>
              <p className="text-sm text-gray-600">
                Create threads, add evidence, and engage in thoughtful discussion
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <Users className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Community Consensus</h3>
              <p className="text-sm text-gray-600">
                Vote on positions and build collective understanding
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <Shield className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Truth Records</h3>
              <p className="text-sm text-gray-600">
                Generate verified truth records backed by evidence
              </p>
            </div>
          </div>

          <Button size="lg" onClick={() => router.push('/debate')}>
            Explore Debates
          </Button>
        </div>
      </div>
    </div>
  );
}
