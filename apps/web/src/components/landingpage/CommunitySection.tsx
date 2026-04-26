
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, ThumbsUp, Share } from "lucide-react";

const CommunitySection = () => {
  const posts = [
    {
      id: 1,
      author: "Sarah Johnson",
      authorRole: "IP Attorney",
      avatar: "SJ",
      content: "Just published my analysis on recent copyright infringement cases in the digital art space. The boundaries between inspiration and infringement continue to blur.",
      likes: 42,
      comments: 8,
      shares: 15
    },
    {
      id: 2,
      author: "Michael Chen",
      authorRole: "Corporate Lawyer",
      avatar: "MC",
      content: "Interesting developments in B-corp legislation across different states. The shift towards socially responsible business models is gaining legal recognition.",
      likes: 37,
      comments: 6,
      shares: 12
    },
    {
      id: 3,
      author: "Elena Rodriguez",
      authorRole: "Human Rights Advocate",
      avatar: "ER",
      content: "New precedent set in immigration case law with the recent Supreme Court ruling. This could significantly impact how asylum cases are processed.",
      likes: 56,
      comments: 14,
      shares: 23
    }
  ];

  return (
    <section id="community" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our <span className="gradient-text">Legal Community</span>
          </h2>
          <p className="text-legal-gray text-lg">
            Connect with legal professionals, share insights, and stay updated on the latest developments in the legal world.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="shadow-soft hover-scale overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarFallback className="bg-legal-blue text-white">{post.avatar}</AvatarFallback>
                    <AvatarImage src="" />
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{post.author}</h3>
                    <p className="text-sm text-legal-gray">{post.authorRole}</p>
                  </div>
                </div>
                <p className="text-legal-dark mb-6">{post.content}</p>
                <div className="flex items-center justify-between text-sm text-legal-gray border-t border-legal-light pt-4">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.comments}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Share className="h-4 w-4" />
                    <span>{post.shares}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
