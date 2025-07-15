"use client";

import * as z from "zod";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CertificateModalProps {
  open: boolean;
  onClose: () => void;
  courseId: string;
  userName?: string;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
});

export const CertificateModal = ({
  open,
  onClose,
  courseId,
  userName = "",
}: CertificateModalProps) => {
  const [name, setName] = useState(userName);
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    const parsed = formSchema.safeParse({ name });

    if (!parsed.success) {
      toast.error(parsed.error.format().name?._errors?.[0] || "Invalid name");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`/api/courses/${courseId}/certificate`, {
        name: parsed.data.name,
      });

      const url = response.data?.url;
      if (url) {
        window.open(url, "_blank"); // You can also trigger a direct download
        toast.success("Certificate ready!");
      } else {
        toast.error("Certificate generation failed.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>🎓 Generate Certificate</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <Input
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
          <Button
            onClick={handleDownload}
            disabled={loading || name.trim().length < 2}
            className="w-full"
          >
            {loading ? "Generating..." : "Download Certificate"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};