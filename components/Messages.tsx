"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BulkEmailModal } from "./BulkEmailModal";

// Types
type Team = { id: string; name: string; memberCount: number; growth: number };
type Member = { id: string; name: string; email: string; teamId: string };
type Message = {
  id: string;
  subject: string;
  body: string;
  sender: string;
  recipients: string[];
  teamId: string | null;
  status: "sent" | "delivered" | "failed";
  createdAt: Date;
};
type Toast = { id: string; message: string; type: "success" | "error" };

export const Messages = () => {
  const [teams] = useState<Team[]>([
    { id: "1", name: "Engineering", memberCount: 24, growth: 8.5 },
    { id: "2", name: "Marketing", memberCount: 12, growth: -2.1 },
    { id: "3", name: "Support", memberCount: 18, growth: 5.0 },
  ]);

  const [members] = useState<Member[]>([
    { id: "u1", name: "Alice", email: "aliceburgers@yopmail.com", teamId: "1" },
    { id: "u2", name: "Bob", email: "bobbyworking5@hotmail.com", teamId: "1" },
    { id: "u3", name: "Charlie", email: "charliedaml@gmail.com", teamId: "2" },
    { id: "u4", name: "Diana", email: "diana597@gmail.com", teamId: "3" },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m1",
      subject: "Welcome to Engineering!",
      body: "Your first sprint starts Monday.",
      sender: "HR Team",
      recipients: ["u1", "u2"],
      teamId: "1",
      status: "delivered",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
    {
      id: "m2",
      subject: "Marketing Campaign Kickoff",
      body: "Review the Q3 campaign brief.",
      sender: "HR Team",
      recipients: ["u3"],
      teamId: "2",
      status: "sent",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    },
    {
      id: "m3",
      subject: "System Maintenance Notice",
      body: "HR portal will be down Sunday.",
      sender: "IT Team",
      recipients: ["u1", "u2", "u3", "u4"],
      teamId: null,
      status: "failed",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    },
    {
      id: "m4",
      subject: "Engineering Standup Reminder",
      body: "Daily standup at 10 AM.",
      sender: "Team Lead",
      recipients: ["u1", "u2"],
      teamId: "1",
      status: "delivered",
      createdAt: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: "m5",
      subject: "New Marketing Guidelines",
      body: "Follow the new brand guidelines.",
      sender: "Marketing Lead",
      recipients: ["u3"],
      teamId: "2",
      status: "delivered",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
    },
    {
      id: "m6",
      subject: "Support Team Meeting",
      body: "Weekly meeting tomorrow.",
      sender: "Support Lead",
      recipients: ["u4"],
      teamId: "3",
      status: "sent",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20),
    },
    {
      id: "m7",
      subject: "Company All-Hands",
      body: "All-hands meeting next Friday.",
      sender: "CEO",
      recipients: ["u1", "u2", "u3", "u4"],
      teamId: null,
      status: "sent",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72),
    },
    {
      id: "m8",
      subject: "Project Alpha Update",
      body: "Alpha project milestone reached.",
      sender: "PM",
      recipients: ["u1", "u2"],
      teamId: "1",
      status: "delivered",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    },
    {
      id: "m9",
      subject: "Marketing Report Q2",
      body: "Attached the Q2 performance report.",
      sender: "Marketing Lead",
      recipients: ["u3"],
      teamId: "2",
      status: "delivered",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30),
    },
    {
      id: "m10",
      subject: "Support Ticket Escalation",
      body: "Urgent ticket requires attention.",
      sender: "Support Lead",
      recipients: ["u4"],
      teamId: "3",
      status: "sent",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    },
    {
      id: "m11",
      subject: "HR Policy Update",
      body: "Please read the updated HR policies.",
      sender: "HR Team",
      recipients: ["u1", "u2", "u3", "u4"],
      teamId: null,
      status: "delivered",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 80),
    },
    {
      id: "m12",
      subject: "Engineering Retrospective",
      body: "Retrospective scheduled on Friday.",
      sender: "Team Lead",
      recipients: ["u1", "u2"],
      teamId: "1",
      status: "sent",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 15),
    },
    {
      id: "m13",
      subject: "Marketing Brainstorm",
      body: "Brainstorm session at 3 PM.",
      sender: "Marketing Lead",
      recipients: ["u3"],
      teamId: "2",
      status: "failed",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 7),
    },
    {
      id: "m14",
      subject: "Support Training",
      body: "Training session next Tuesday.",
      sender: "Support Lead",
      recipients: ["u4"],
      teamId: "3",
      status: "delivered",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 50),
    },
    {
      id: "m15",
      subject: "All Teams Survey",
      body: "Company-wide survey link.",
      sender: "CEO",
      recipients: ["u1", "u2", "u3", "u4"],
      teamId: null,
      status: "sent",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 60),
    },
  ]);

  const [toasts, setToasts] = useState<Toast[]>([]);
  const [showBulkEmailModal, setShowBulkEmailModal] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "sent" | "delivered" | "failed"
  >("all");
  const [filterTeam, setFilterTeam] = useState<string | "all">("all");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );

  const showToast = (message: string, type: "success" | "error") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      5000
    );
  };

  const groupedMessages = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 86400000);

    const groups: Record<string, Message[]> = {
      Today: [],
      Yesterday: [],
      "Last 7 Days": [],
      Older: [],
    };

    const filtered = messages.filter((msg) => {
      const matchesSearch =
        msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.body.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || msg.status === filterStatus;
      const matchesTeam = filterTeam === "all" || msg.teamId === filterTeam;
      return matchesSearch && matchesStatus && matchesTeam;
    });

    filtered.forEach((msg) => {
      const msgDate = new Date(msg.createdAt);
      if (msgDate >= today) groups.Today.push(msg);
      else if (msgDate >= yesterday) groups.Yesterday.push(msg);
      else if (msgDate >= new Date(now.getTime() - 7 * 86400000))
        groups["Last 7 Days"].push(msg);
      else groups.Older.push(msg);
    });

    return Object.entries(groups).filter(([_, msgs]) => msgs.length > 0);
  }, [messages, searchQuery, filterStatus, filterTeam]);

  const getTeamName = (teamId: string | null) => {
    if (!teamId) return "All Teams";
    const team = teams.find((t) => t.id === teamId);
    return team ? team.name : "Unknown Team";
  };

  const getStatusColor = (status: Message["status"]) => {
    switch (status) {
      case "delivered":
        return "text-(--success)";
      case "sent":
        return "text-(--warning)";
      case "failed":
        return "text-(--danger)";
      default:
        return "text-(--text-muted)";
    }
  };

  const handleDeleteMessage = () => {
    if (!showDeleteConfirm) return;
    setMessages((prev) => prev.filter((m) => m.id !== showDeleteConfirm));
    showToast("Message deleted.", "success");
    setShowDeleteConfirm(null);
  };

  return (
    <div className="ml-64 mt-16 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
            <p className="text-(--text-muted) mt-2">
              View your message history and send new bulk communications.
            </p>
          </div>
          <button
            onClick={() => setShowBulkEmailModal(true)}
            className="px-5 py-2.5 bg-(--primary) text-white rounded-lg font-medium hover:bg-(--primary-ight) transition-colors w-full sm:w-auto"
          >
            + New Message
          </button>
        </div>

        {/* Messages and filters code omitted for brevity; keep same as original */}
        <div className="space-y-6">
          {groupedMessages.map(([groupName, msgs]) => (
            <div key={groupName}>
              {/* Group Header */}
              <h2 className="text-xl font-semibold text-(--text-main) mb-2">
                {groupName}
              </h2>

              <div className="space-y-3">
                {msgs
                  .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) // recent first
                  .map((msg) => (
                    <div
                      key={msg.id}
                      className="p-4 bg-(--surface-alt) rounded-xl shadow-(--shadow-sm) flex justify-between items-start"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{msg.subject}</span>
                          <span
                            className={`text-sm ${getStatusColor(msg.status)}`}
                          >
                            {msg.status}
                          </span>
                        </div>
                        <p className="text-(--text-muted) mt-1">{msg.body}</p>
                        <p className="text-xs text-(--text-muted) mt-1">
                          From <span className="font-medium">{msg.sender}</span>{" "}
                          to{" "}
                          {msg.recipients
                            .map((r) => {
                              const member = members.find((m) => m.id === r);
                              return member ? member.name : r;
                            })
                            .join(", ")}{" "}
                          | Team: {getTeamName(msg.teamId)}
                        </p>
                        <p className="text-xs text-(--text-muted)">
                          {msg.createdAt.toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => setShowDeleteConfirm(msg.id)}
                        className="ml-3 text-(--danger) hover:opacity-70"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Toasts */}
        <div className="fixed bottom-6 right-6 z-50 space-y-3 max-w-xs w-full">
          <AnimatePresence>
            {toasts.map((toast) => (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, x: 100 }}
                transition={{ duration: 0.25 }}
                className={`p-4 rounded-xl shadow-(--shadow-edium) font-medium flex justify-between items-start ${
                  toast.type === "success"
                    ? "bg-(--success)/10 border border-(--success)/20 text-(--success)"
                    : "bg-(--danger)/10 border border-(--danger)/20 text-(--danger)"
                }`}
              >
                <span>{toast.message}</span>
                <button
                  onClick={() =>
                    setToasts((t) => t.filter((_, i) => t[i].id !== toast.id))
                  }
                  className="ml-3 text-inherit hover:opacity-70"
                >
                  ✕
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bulk Email Modal */}
        <AnimatePresence>
          {showBulkEmailModal && (
            <BulkEmailModal
              activated={showBulkEmailModal}
              setActivated={setShowBulkEmailModal}
              teams={teams}
              members={members}
              selectedTeamId={selectedTeamId}
              selectedMembers={selectedMembers}
              showToast={showToast}
            />
          )}
        </AnimatePresence>

        {/* Delete Confirmation */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowDeleteConfirm(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-(--surface) rounded-2xl p-6 w-full max-w-md border border-(--border) shadow-(--shadow-edium)"
              >
                <h3 className="text-xl font-bold text-(--text-main)">
                  Delete Message?
                </h3>
                <p className="text-(--text-muted) mt-2">
                  This message will be permanently removed from your history.
                </p>
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className="flex-1 px-4 py-2.5 text-(--text-main) rounded-lg border border-(--border) hover:bg-(--surface-alt)"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteMessage}
                    className="flex-1 px-4 py-2.5 bg-(--danger) text-white rounded-lg font-medium hover:bg-(--danger)/90"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
