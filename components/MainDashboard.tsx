"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { FireModal } from "./FireModal";
import { CreationModal } from "./CreationModal";
import { BulkEmailModal } from "./BulkEmailModal";

import { Navbar } from "./Navbar";

type Team = {
  id: string;
  name: string;
  memberCount: number;
  growth: number;
};

type Toast = {
  id: string;
  message: string;
  type: "success" | "error";
};

type Member = {
  id: string;
  name: string;
  email: string;
  teamId: string;
};

const MainDashboard = () => {
  const [teams, setTeams] = useState<Team[]>([
    { id: "1", name: "Engineering", memberCount: 24, growth: 8.5 },
    { id: "2", name: "Marketing", memberCount: 12, growth: -2.1 },
    { id: "3", name: "Support", memberCount: 18, growth: 5.0 },
  ]);

  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [showFireModal, setShowFireModal] = useState(false);
  const [confirmFireInput, setConfirmFireInput] = useState("");

  const [showBulkEmailModal, setShowBulkEmailModal] = useState(false);


  const [members, setMembers] = useState<Member[]>([
    { id: "u1", name: "Alice", email: "aliceburgers@yopmail.com", teamId: "1" },
    { id: "u2", name: "Bob", email: "bobbyworking5@hotmail.com", teamId: "1" },
    { id: "u3", name: "Charlie", email: "charliedaml@gmail.com", teamId: "2" },
    { id: "u4", name: "Diana", email: "diana597@gmail.com", teamId: "3" },
  ]);

  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const [showCreationModal, setShowCreationModal] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");

  const handleCreateTeam = (members: { name: string; email: string }[]) => {
    setTeams((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: newTeamName,
        memberCount: members.length,
        growth: 0,
      },
    ]);

    showToast("Team created with members!", "success");
    setNewTeamName("");
    setShowCreationModal(false);

    console.log("Created team members:", members);
  };

  const showToast = (message: string, type: "success" | "error") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const handleSendMessage = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      showToast("Message sent to all team members!", "success");
    }, 600);
  };

  const handleFireConfirm = () => {
    if (confirmFireInput.trim().toLowerCase() !== "terminate") return;
    showToast("Employee terminated successfully.", "success");
    setShowFireModal(false);
    setConfirmFireInput("");
  };

  return (
    <div className="flex min-h-screen font-sans bg-background) text-(--text-main)">

    <Navbar/>

      <main className="ml-64 mt-16 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight">
              Welcome back, Alex
            </h2>
            <p className="text-(--text-uted) mt-2 max-w-2xl">
              Manage your teams, automate communications, and streamline HR
              operations — all from one dashboard.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-12">
            <motion.button
              onClick={() => {
                setShowBulkEmailModal(true);
              }}
              disabled={isSending}
              className="p-6 bg-(--surface-alt) rounded-2xl border border-(--border) flex flex-col items-start gap-4 hover:bg-(--surface) transition-all disabled:opacity-70"
              whileHover={{ y: -4, boxShadow: "var(--shadow-medium)" }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="w-12 h-12 rounded-xl bg-(--primary)/15 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-(--primary)"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14v-2H5v2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg"
                >Send Bulk Message</h3>
                <p className="text-(--text-uted) mt-1 text-sm">
                  Reach all members of a team instantly
                </p>
              </div>
              {isSending && (
                <span className="text-xs text-(--text-uted) flex items-center gap-1 mt-2">
                  <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 8.837 7.163 16 16 16v-4c-4.418 0-8-3.582-8-8h4z"
                    ></path>
                  </svg>
                  Sending...
                </span>
              )}
            </motion.button>

            <motion.button
              onClick={() => setShowFireModal(true)}
              className="p-6 bg-(--surface-alt) rounded-2xl border border-(--border) flex flex-col items-start gap-4 hover:bg-(--surface) transition-all"
              whileHover={{ y: -4, boxShadow: "var(--shadow-medium)" }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="w-12 h-12 rounded-xl bg-(--danger)/15 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-(--danger)"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A1 1 0 0117.133 21H6.867A1 1 0 016 19.867L5.133 7.867A1 1 0 016 6h12a1 1 0 011 1.133l-.867 12.142z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Terminate Employee</h3>
                <p className="text-(--text-uted) mt-1 text-sm">
                  Securely offboard team members
                </p>
              </div>
            </motion.button>

            <motion.button
              className="p-6 bg-(--surface-alt) rounded-2xl border border-(--border) flex flex-col items-start gap-4"
              whileHover={{ y: -4, boxShadow: "var(--shadow-medium)" }}
              onClick={() => {
                setShowCreationModal(true);
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-(--success)/15 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-(--success)"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Create New Team</h3>
                <p className="text-(--text-uted) mt-1 text-sm">
                  Build teams from email lists in seconds
                </p>
              </div>
            </motion.button>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-10">
            <div className="bg-(--surface-alt) rounded-2xl p-6 border border-(--border)">
              <h3 className="font-semibold text-lg mb-4">Team Overview</h3>
              <div className="space-y-4">
                {[
                  {
                    label: "Active Teams",
                    value: teams.length,
                    change: "+2 this month",
                    positive: true,
                  },
                  {
                    label: "Total Members",
                    value: teams.reduce((sum, t) => sum + t.memberCount, 0),
                    change: "+8% growth",
                    positive: true,
                  },
                  {
                    label: "Pending Actions",
                    value: 2,
                    change: "-1 resolved",
                    positive: true,
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-2"
                  >
                    <span className="text-(--text-uted)">{stat.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{stat.value}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          stat.positive
                            ? "bg-(--success)/20 text-(--success)"
                            : "bg-(--danger)/20 text-(--danger)"
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-(--surface-alt) rounded-2xl p-6 border border-(--border)">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Recent Activity</h3>
                <button className="text-sm text-(--primary)">View all</button>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-(--success) mt-2"></div>
                  <p>
                    <span className="font-medium">Alex C.</span> sent a message
                    to Engineering team
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-(--primary) mt-2"></div>
                  <p>
                    <span className="font-medium">HR Bot</span> added 3 new
                    members to Support
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-(--danger) mt-2"></div>
                  <p>
                    <span className="font-medium">You</span> reviewed
                    termination request
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-(--surface-alt) rounded-2xl border border-(--border)">
            <div className="p-6 border-b border-(--border) flex justify-between items-center">
              <h3 className="font-semibold text-lg">Your Teams</h3>
              <button
                onClick={() => {
                  setShowCreationModal(true);
                }}
                className="px-4 py-2 bg-(--primary) text-white rounded-lg text-sm font-medium hover:bg-(--primary-ight)"
              >
                + Create Team
              </button>
            </div>
            <div className="divide-y divide-(--border)">
              {teams.map((team) => (
                <div
                  key={team.id}
                  className="p-6 flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-semibold">{team.name}</h4>
                    <p className="text-(--text-uted) text-sm mt-1">
                      {team.memberCount} members
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-medium">{team.memberCount}</p>
                      <p
                        className={`text-sm flex items-center gap-1 ${
                          team.growth >= 0
                            ? "text-(--success)"
                            : "text-(--danger)"
                        }`}
                      >
                        {team.growth >= 0 ? "↗" : "↘"} {Math.abs(team.growth)}%
                      </p>
                    </div>
                    <button
                    onClick={() => {
                        setShowFireModal(true);
                    }}
                    className="px-4 py-2 text-sm text-(--text-uted) hover:text-(--text-main) rounded-lg hover:bg-(--surface)">
                      Manage
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

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

      <AnimatePresence>
        {showFireModal && (
          <FireModal
            activated={showFireModal}
            setActivated={setShowFireModal}
            confirmFireInput={confirmFireInput}
            setConfirmFireInput={setConfirmFireInput}
            teams={teams}
            members={members}
            selectedTeamId={selectedTeamId}
            setSelectedTeamId={setSelectedTeamId}
            selectedMembers={selectedMembers}
            setSelectedMembers={setSelectedMembers}
            handleFireConfirm={handleFireConfirm}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showCreationModal && (
          <CreationModal
            activated={showCreationModal}
            setActivated={setShowCreationModal}
            newTeamName={newTeamName}
            setNewTeamName={setNewTeamName}
            handleCreateTeam={handleCreateTeam}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
  {showBulkEmailModal && (
    <BulkEmailModal
      activated={showBulkEmailModal}
      setActivated={setShowBulkEmailModal}
      teams={teams}
      members={members}
      showToast={showToast}
    />
  )}
</AnimatePresence>

    </div>
  );
};

export default MainDashboard;
