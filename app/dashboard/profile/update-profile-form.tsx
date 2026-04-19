"use client";

import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface UpdateProfileFormProps {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
}

export function UpdateProfileForm({ user }: UpdateProfileFormProps) {
  const [name, setName] = useState(user.name);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed || trimmed === user.name) return;
    setIsPending(true);
    const { error } = await authClient.updateUser({ name: trimmed });
    setIsPending(false);
    if (error) {
      toast.error(error.message ?? "Failed to update profile");
    } else {
      toast.success("Profile updated");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your display name and account details.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Display Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              aria-label="name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={user.email} disabled className="text-muted-foreground" />
          </div>
          <Button type="submit" disabled={isPending || !name.trim() || name.trim() === user.name}>
            {isPending ? "Saving…" : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
