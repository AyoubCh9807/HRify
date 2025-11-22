import { motion } from "framer-motion";
import { useState } from "react";

interface Member {
  name: string;
  email: string;
}

interface CreationModalProps {
  activated: boolean;
  newTeamName: string;
  setNewTeamName: React.Dispatch<React.SetStateAction<string>>;

  setActivated: React.Dispatch<React.SetStateAction<boolean>>;
  handleCreateTeam: (members: Member[]) => void;
}

export const CreationModal = ({
  activated,
  setActivated,
  newTeamName,
  setNewTeamName,
  handleCreateTeam,
}: CreationModalProps) => {
  const [stage, setStage] = useState<1 | 2>(1);
  const [members, setMembers] = useState<Member[]>([
    { name: "", email: "" },
  ]);

  const updateMember = (index: number, field: keyof Member, value: string) => {
    setMembers((prev) => {
      const copy = [...prev];
      copy[index][field] = value;
      return copy;
    });
  };

  const addMember = () => {
    setMembers((prev) => [...prev, { name: "", email: "" }]);
  };

  const removeMember = (i: number) => {
    setMembers((prev) => prev.filter((_, idx) => idx !== i));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setActivated(false)}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-(--surface) rounded-2xl p-6 w-full max-w-lg border border-(--border) shadow-(--shadow-medium)"
      >
        {/* HEADER */}
        <h3 className="text-xl font-bold text-(--text-main)">
          {stage === 1 ? "Create New Team" : "Add Team Members"}
        </h3>

        <p className="text-(--text-muted) mt-2">
          {stage === 1
            ? "Enter the name of the new team."
            : "Add as many members as you want."}
        </p>

        {/* STAGE 1 — Team Name */}
        {stage === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <input
              type="text"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              placeholder="Team name..."
              className="w-full px-4 py-2.5 bg-(--surface-alt) border border-(--border) rounded-lg text-(--text-main) placeholder-(--text-muted) focus:outline-none focus:ring-2 focus:ring-(--primary)/50"
            />

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setActivated(false)}
                className="flex-1 px-4 py-2.5 text-(--text-main) rounded-lg border border-(--border) hover:bg-(--surface-alt)"
              >
                Cancel
              </button>

              <button
                disabled={!newTeamName.trim()}
                onClick={() => setStage(2)}
                className="flex-1 px-4 py-2.5 bg-(--primary) text-white rounded-lg font-medium disabled:opacity-50 hover:bg-(--primary-dark)"
              >
                Next →
              </button>
            </div>
          </motion.div>
        )}

        {/* STAGE 2 — Add Members */}
        {stage === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            {members.map((member, index) => (
              <div
                key={index}
                className="flex gap-3 mb-3 items-center bg-(--surface-alt) p-3 rounded-lg border border-(--border)"
              >
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => updateMember(index, "name", e.target.value)}
                  placeholder="Name"
                  className="flex-1 px-3 py-2 bg-transparent text-(--text-main) placeholder-(--text-muted) focus:outline-none"
                />

                <input
                  type="email"
                  value={member.email}
                  onChange={(e) => updateMember(index, "email", e.target.value)}
                  placeholder="Email"
                  className="flex-1 px-3 py-2 bg-transparent text-(--text-main) placeholder-(--text-muted) focus:outline-none"
                />

                {members.length > 1 && (
                  <button
                    onClick={() => removeMember(index)}
                    className="text-(--danger) px-2 font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

            <button
              onClick={addMember}
              className="mt-2 text-(--primary) font-medium hover:underline"
            >
              + Add another member
            </button>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setStage(1)}
                className="flex-1 px-4 py-2.5 text-(--text-main) rounded-lg border border-(--border) hover:bg-(--surface-alt)"
              >
                ← Back
              </button>

              <button
                onClick={() => handleCreateTeam(members)}
                className="flex-1 px-4 py-2.5 bg-(--primary) text-white rounded-lg font-medium hover:bg-(--primary-dark)"
              >
                Create Team
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};
