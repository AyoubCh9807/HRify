import { motion } from "framer-motion";

interface FireTeamModalProps {
  activated: boolean;
  confirmFireInput: string;

  teams: { id: string; name: string }[];
  members: { id: string; name: string; email: string; teamId: string }[];

  selectedTeamId: string | null;
  selectedMembers: string[];

  setActivated: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmFireInput: React.Dispatch<React.SetStateAction<string>>;

  setSelectedTeamId: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedMembers: React.Dispatch<React.SetStateAction<string[]>>;

  handleFireConfirm: () => void;
}

export const FireModal = ({
  activated,
  confirmFireInput,

  teams,
  members,

  selectedTeamId,
  selectedMembers,

  setActivated,
  setConfirmFireInput,
  setSelectedTeamId,
  setSelectedMembers,

  handleFireConfirm,
}: FireTeamModalProps) => {
  const toggleMember = (id: string) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
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
        <h3 className="text-xl font-bold text-(--text-main)">
          Fire Team Members
        </h3>

        {/* TEAM SELECT */}
        <div className="mt-4">
          <label className="text-(--text-muted) text-sm mb-1 block">
            Select Team
          </label>
          <select
            value={selectedTeamId ?? ""}
            onChange={(e) => setSelectedTeamId(e.target.value)}
            className="w-full px-4 py-2.5 bg-(--surface-alt) border border-(--border) rounded-lg"
          >
            <option value="">Select a team...</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        {/* MEMBER SELECT */}
        {selectedTeamId && (
          <div className="mt-5 max-h-48 overflow-y-auto border border-(--border) rounded-lg p-3 bg-(--surface-alt)">
            <p className="text-(--text-muted) text-sm mb-2">Select Members</p>
            {members
              .filter((m) => m.teamId === selectedTeamId)
              .map((m) => (
                <label
                  key={m.id}
                  className="flex items-center gap-3 py-1 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedMembers.includes(m.id)}
                    onChange={() => toggleMember(m.id)}
                    className="h-4 w-4"
                  />
                  <span className="text-(--text-main)">
                    {m.name}{" "}
                    <span className="text-(--text-muted)">({m.email})</span>
                  </span>
                </label>
              ))}
          </div>
        )}

        {/* CONFIRMATION FIELD */}
        <p className="text-(--text-muted) mt-6">
          Type{" "}
          <span className="font-mono bg-(--surface-alt) px-1.5 py-0.5 rounded">
            terminate
          </span>{" "}
          to confirm firing.
        </p>

        <input
          type="text"
          value={confirmFireInput}
          onChange={(e) => setConfirmFireInput(e.target.value)}
          placeholder="Type 'terminate'"
          className="mt-2 w-full px-4 py-2.5 bg-(--surface-alt) border border-(--border) rounded-lg"
        />

        {/* ACTION BUTTONS */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setActivated(false)}
            className="flex-1 px-4 py-2.5 rounded-lg border border-(--border) hover:bg-(--surface-alt)"
          >
            Cancel
          </button>

          <button
            onClick={handleFireConfirm}
            disabled={
              confirmFireInput.trim().toLowerCase() !== "terminate" ||
              selectedMembers.length === 0 ||
              !selectedTeamId
            }
            className="flex-1 px-4 py-2.5 bg-(--danger) text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-(--danger)/90"
          >
            Confirm Firing
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
