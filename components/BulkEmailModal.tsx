"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Team = {
  id: string;
  name: string;
  memberCount: number;
  growth: number;
};

type Member = {
  id: string;
  name: string;
  email: string;
  teamId: string;
};

type BulkEmailModalProps = {
  activated: boolean;
  setActivated: (b: boolean) => void;
  teams: Team[];
  members: Member[];
  showToast: (msg: string, type: "success" | "error") => void;
};

export const BulkEmailModal = ({
  activated,
  setActivated,
  teams,
  members,
  showToast,
}: BulkEmailModalProps) => {
  const [stage, setStage] = useState(1);
  const [selectedTeamIds, setSelectedTeamIds] = useState<string[]>([]);
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [sending, setSending] = useState(false);

  const handleToggleTeam = (id: string) => {
    setSelectedTeamIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleToggleMember = (id: string) => {
    setSelectedMemberIds((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const filteredMembers = members.filter(
    (m) => selectedTeamIds.includes(m.teamId)
  );

  const handleSendEmails = () => {
    if (!emailSubject.trim() || !emailBody.trim()) {
      showToast("Please fill subject and message body.", "error");
      return;
    }

    setSending(true);

    // Simulate sending
    setTimeout(() => {
      setSending(false);
      showToast(
        `Emails sent to ${selectedMemberIds.length} member(s)!`,
        "success"
      );
      setActivated(false);
      setStage(1);
      setSelectedTeamIds([]);
      setSelectedMemberIds([]);
      setEmailSubject("");
      setEmailBody("");
    }, 1000);
  };

  return (
    <AnimatePresence>
      {activated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-(--surface-alt) rounded-2xl p-6 w-[500px] max-w-full"
          >
            <h2 className="text-xl font-semibold mb-4">Bulk Email</h2>

            {stage === 1 && (
              <>
                <p className="mb-4">Select team(s) to email:</p>
                <div className="space-y-2 max-h-64 overflow-y-auto mb-4">
                  {teams.map((team) => (
                    <label
                      key={team.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTeamIds.includes(team.id)}
                        onChange={() => handleToggleTeam(team.id)}
                      />
                      <span>{team.name}</span>
                    </label>
                  ))}
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    className="px-4 py-2 rounded-lg bg-(--surface) hover:bg-(--surface-alt)"
                    onClick={() => setActivated(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg bg-(--primary) text-white disabled:opacity-50"
                    disabled={selectedTeamIds.length === 0}
                    onClick={() => setStage(2)}
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {stage === 2 && (
              <>
                <p className="mb-4">Select member(s) to email:</p>
                <div className="space-y-2 max-h-64 overflow-y-auto mb-4">
                  {filteredMembers.map((member) => (
                    <label
                      key={member.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedMemberIds.includes(member.id)}
                        onChange={() => handleToggleMember(member.id)}
                      />
                      <span>
                        {member.name} ({member.email})
                      </span>
                    </label>
                  ))}
                </div>
                <div className="flex justify-between gap-2">
                  <button
                    className="px-4 py-2 rounded-lg bg-(--surface) hover:bg-(--surface-alt)"
                    onClick={() => setStage(1)}
                  >
                    Back
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg bg-(--primary) text-white disabled:opacity-50"
                    disabled={selectedMemberIds.length === 0}
                    onClick={() => setStage(3)}
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {stage === 3 && (
              <>
                <p className="mb-2">Email subject:</p>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full p-2 mb-4 rounded-lg border border-(--border)"
                />
                <p className="mb-2">Email body:</p>
                <textarea
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  className="w-full p-2 mb-4 rounded-lg border border-(--border) h-32 resize-none"
                ></textarea>
                <div className="flex justify-between gap-2">
                  <button
                    className="px-4 py-2 rounded-lg bg-(--surface) hover:bg-(--surface-alt)"
                    onClick={() => setStage(2)}
                  >
                    Back
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg bg-(--success) text-white disabled:opacity-50"
                    disabled={sending}
                    onClick={handleSendEmails}
                  >
                    {sending ? "Sending..." : "Send Emails"}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
