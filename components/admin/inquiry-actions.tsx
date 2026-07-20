"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { replyToInquiry } from "@/actions/inquiries";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RiReplyLine } from "react-icons/ri";

export function AdminInquiryActions({ inquiryId }: { inquiryId: string }) {
  const [replying, setReplying] = useState(false);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleReply() {
    if (!reply.trim()) return;
    setLoading(true);
    await replyToInquiry(inquiryId, reply);
    setReplying(false);
    setReply("");
    router.refresh();
    setLoading(false);
  }

  if (replying) {
    return (
      <div className="space-y-2">
        <Textarea value={reply} onChange={(e) => setReply(e.target.value)} rows={3} placeholder="Type your reply..." />
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="sm" onClick={() => setReplying(false)}>Cancel</Button>
          <Button size="sm" loading={loading} onClick={handleReply}>Send reply</Button>
        </div>
      </div>
    );
  }

  return (
    <Button size="sm" variant="outline" onClick={() => setReplying(true)}>
      <RiReplyLine className="w-3.5 h-3.5" />Reply
    </Button>
  );
}
