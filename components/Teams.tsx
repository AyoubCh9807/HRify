'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { BulkEmailModal } from './BulkEmailModal';
import { FireModal } from './FireModal';

// Types
type Team = { id: string; name: string; memberCount: number; growth: number };
type Member = { id: string; name: string; email: string; teamId: string };
type Toast = { id: string; message: string; type: 'success' | 'error' };

const TeamsPage = () => {
  const [teams, setTeams] = useState<Team[]>([
    { id: '1', name: 'Engineering', memberCount: 24, growth: 8.5 },
    { id: '2', name: 'Marketing', memberCount: 12, growth: -2.1 },
    { id: '3', name: 'Support', memberCount: 18, growth: 5.0 },
  ]);

  const [members] = useState<Member[]>([
    { id: 'u1', name: 'Alice', email: 'aliceburgers@yopmail.com', teamId: '1' },
    { id: 'u2', name: 'Bob', email: 'bobbyworking5@hotmail.com', teamId: '1' },
    { id: 'u3', name: 'Charlie', email: 'charliedaml@gmail.com', teamId: '2' },
    { id: 'u4', name: 'Diana', email: 'diana597@gmail.com', teamId: '3' },
  ]);

  const [toasts, setToasts] = useState<Toast[]>([]);
  const [showBulkEmailModal, setShowBulkEmailModal] = useState(false);
  const [showFireModal, setShowFireModal] = useState(false);
  const [confirmDeleteTeam, setConfirmDeleteTeam] = useState<{ id: string; name: string } | null>(null);

  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [confirmFireInput, setConfirmFireInput] = useState('');

  const showToast = (message: string, type: 'success' | 'error') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 5000);
  };

  const handleDeleteTeam = () => {
    if (!confirmDeleteTeam) return;
    setTeams((prev) => prev.filter((t) => t.id !== confirmDeleteTeam.id));
    showToast(`Team "${confirmDeleteTeam.name}" deleted.`, 'success');
    setConfirmDeleteTeam(null);
  };

  const handleSendToTeam = (teamId: string) => {
    setSelectedTeamId(teamId);
    const teamMembers = members.filter((m) => m.teamId === teamId).map((m) => m.id);
    setSelectedMembers(teamMembers);
    setShowBulkEmailModal(true);
  };

  const getMembersForTeam = (teamId: string) => members.filter((m) => m.teamId === teamId);

  return (
    <div className="ml-64 mt-16 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Teams</h1>
            <p className="text-(--text-muted) mt-2">Manage your teams, members, and communications.</p>
          </div>
          <button
            onClick={() => showToast('Create team modal would open here.', 'success')}
            className="px-5 py-2.5 bg-(--primary) text-white rounded-lg font-medium hover:bg-(--primary-light) transition-colors"
          >
            + New Team
          </button>
        </div>

        <div className="space-y-5">
          {teams.map((team) => {
            const teamMembers = getMembersForTeam(team.id);
            return (
              <motion.div
                key={team.id}
                className="bg-(--surface-alt) rounded-2xl border border-(--border) overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">{team.name}</h2>
                    <p className="text-(--text-muted) mt-1">
                      {team.memberCount} {team.memberCount === 1 ? 'member' : 'members'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-sm flex items-center gap-1 ${
                        team.growth >= 0 ? 'text-(--success)' : 'text-(--danger)'
                      }`}
                    >
                      {team.growth >= 0 ? '↗' : '↘'} {Math.abs(team.growth)}%
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSendToTeam(team.id)}
                        className="px-4 py-2 text-sm bg-(--primary)/15 text-(--primary) rounded-lg hover:bg-(--primary)/20 transition-colors"
                      >
                        Message Team
                      </button>
                      <button
                        onClick={() => setConfirmDeleteTeam({ id: team.id, name: team.name })}
                        className="px-4 py-2 text-sm text-(--text-muted) hover:text-(--danger) rounded-lg hover:bg-(--surface) transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-(--border)">
                  <div className="grid grid-cols-12 bg-(--surface) px-6 py-3 text-(--text-muted) text-sm font-medium">
                    <div className="col-span-4">Name</div>
                    <div className="col-span-5">Email</div>
                    <div className="col-span-3 text-right">Actions</div>
                  </div>
                  <div className="divide-y divide-(--border)">
                    {teamMembers.length > 0 ? (
                      teamMembers.map((member) => (
                        <div key={member.id} className="grid grid-cols-12 px-6 py-4 items-center">
                          <div className="col-span-4 font-medium">{member.name}</div>
                          <div className="col-span-5 text-(--text-muted) wrap-break-words">{member.email}</div>
                          <div className="col-span-3 flex justify-end">
                            <button
                              onClick={() => {
                                setSelectedMembers([member.id]);
                                setSelectedTeamId(team.id);
                                setShowFireModal(true);
                              }}
                              className="text-sm text-(--text-muted) hover:text-(--danger) rounded px-2 py-1 hover:bg-(--surface) transition-colors"
                            >
                              Terminate
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-6 py-4 text-(--text-muted) text-sm italic">No members in this team.</div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="fixed bottom-6 right-6 z-50 space-y-3 max-w-xs w-full">
          <AnimatePresence>
            {toasts.map((toast) => (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, x: 100 }}
                transition={{ duration: 0.25 }}
                className={`p-4 rounded-xl shadow-(--shadow-medium) font-medium flex justify-between items-start ${
                  toast.type === 'success'
                    ? 'bg-(--success)/10 border border-(--success)/20 text-(--success)'
                    : 'bg-(--danger)/10 border border-(--danger)/20 text-(--danger)'
                }`}
              >
                <span>{toast.message}</span>
                <button
                  onClick={() => setToasts((t) => t.filter((_, i) => t[i].id !== toast.id))}
                  className="ml-3 text-inherit hover:opacity-70"
                >
                  ✕
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

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

        <AnimatePresence>
          {showFireModal && (
            <FireModal
              activated={showFireModal}
              setActivated={setShowFireModal}
              members={members}
              selectedMembers={selectedMembers}
              teams={teams}
              selectedTeamId={selectedTeamId}
              setSelectedTeamId={setSelectedTeamId}
              setSelectedMembers={setSelectedMembers}
              confirmFireInput={confirmFireInput}
              setConfirmFireInput={setConfirmFireInput}
              handleFireConfirm={() => {
                showToast('Employee terminated.', 'success');
                setShowFireModal(false);
              }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {confirmDeleteTeam && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setConfirmDeleteTeam(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-(--surface) rounded-2xl p-6 w-full max-w-md border border-(--border) shadow-(--shadow-medium)"
              >
                <h3 className="text-xl font-bold text-(--text-main)">Delete Team?</h3>
                <p className="text-(--text-muted) mt-2">
                  Are you sure you want to delete the team <span className="font-medium">"{confirmDeleteTeam.name}"</span>? This will not delete members, but they will be unassigned.
                </p>
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setConfirmDeleteTeam(null)}
                    className="flex-1 px-4 py-2.5 text-(--text-main) rounded-lg border border-(--border) hover:bg-(--surface-alt)"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteTeam}
                    className="flex-1 px-4 py-2.5 bg-(--danger) text-white rounded-lg font-medium hover:bg-(--danger)/90"
                  >
                    Delete Team
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

export default TeamsPage;
