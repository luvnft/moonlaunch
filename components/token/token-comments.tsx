"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { TokenData } from "@/types/token";

export function TokenComments({ token }: { token: TokenData }) {
  const [comment, setComment] = useState("");

  const handleComment = () => {
    if (!comment.trim()) {
      toast({
        title: "Error",
        description: "Please enter a comment",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Comment Posted",
      description: "Your comment has been added successfully",
    });
    setComment("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Textarea
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button onClick={handleComment}>Post</Button>
          </div>
          <div className="space-y-4">
            {token.comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <img
                  src={comment.avatar}
                  alt={comment.user}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-semibold">{comment.user}</p>
                    <span className="text-sm text-muted-foreground">
                      {comment.timestamp}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}