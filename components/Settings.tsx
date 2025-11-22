'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Toast = {
  id: string;
  message: string;
  type: 'success' | 'error';
};

export const Settings = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Mock form state
  const [profile, setProfile] = useState({
    fullName: 'Alex Chen',
    email: 'alex@hrflow.com',
    avatar: '',
  });

  const [security, setSecurity] = useState({
    twoFactorEnabled: true,
    password: '',
    confirmPassword: '',
  });

  const [workspace, setWorkspace] = useState({
    companyName: 'HRFlow Inc.',
    timezone: 'America/New_York',
    language: 'en',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    teamMessages: true,
    terminationAlerts: true,
  });

  const [teamSettings, setTeamSettings] = useState({
    defaultTeam: '1',
    role: 'manager',
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmInput, setDeleteConfirmInput] = useState('');

  const showToast = (message: string, type: 'success' | 'error') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const handleSave = (section: string) => {
    showToast(`${section} settings saved successfully.`, 'success');
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmInput.trim() !== 'DELETE') return;
    showToast('Account deletion initiated. You will receive a confirmation email.', 'success');
    setShowDeleteConfirm(false);
    setDeleteConfirmInput('');
  };

  const sections = [
    {
      id: 'profile',
      title: 'Profile',
      description: 'Update your personal information and avatar',
      icon: '👤',
    },
    {
      id: 'security',
      title: 'Security',
      description: 'Manage your password and two-factor authentication',
      icon: '🔒',
    },
    {
      id: 'workspace',
      title: 'Workspace',
      description: 'Configure your company settings',
      icon: '🏢',
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Choose how you receive alerts',
      icon: '🔔',
    },
    {
      id: 'team',
      title: 'Team & Roles',
      description: 'Set your default team and permissions',
      icon: '👥',
    },
    {
      id: 'danger',
      title: 'Danger Zone',
      description: 'Advanced actions that cannot be undone',
      icon: '⚠️',
    },
  ];

  return (
    <div className="ml-64 mt-16 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-(--text-uted) mt-2">
            Manage your account, workspace, and notification preferences.
          </p>
        </div>

        <div className="space-y-8">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-(--surface-alt) rounded-2xl border border-(--border) p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl">👤</span>
              <div>
                <h2 className="text-xl font-semibold">Profile</h2>
                <p className="text-(--text-uted) text-sm">Update your personal information and avatar</p>
              </div>
            </div>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm text-(--text-uted) mb-1">Full Name</label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-(--surface) border border-(--border) rounded-lg text-(--text-main) focus:outline-none focus:ring-1 focus:ring-(--primary)"
                />
              </div>
              <div>
                <label className="block text-sm text-(--text-uted) mb-1">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-(--surface) border border-(--border) rounded-lg text-(--text-main) focus:outline-none focus:ring-1 focus:ring-(--primary)"
                />
              </div>
              <div>
                <label className="block text-sm text-(--text-uted) mb-1">Avatar</label>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-(--primary) flex items-center justify-center text-white font-medium">
                    {profile.fullName.charAt(0)}
                  </div>
                  <button className="text-sm text-(--primary) hover:text-(--primary-ight)">Change</button>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={() => handleSave('Profile')}
                className="px-5 py-2.5 bg-(--primary) text-white rounded-lg font-medium hover:bg-(--primary-ight) transition-colors"
              >
                Save Changes
              </button>
            </div>
          </motion.section>

          {/* Security Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-(--surface-alt) rounded-2xl border border-(--border) p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl">🔒</span>
              <div>
                <h2 className="text-xl font-semibold">Security</h2>
                <p className="text-(--text-uted) text-sm">Manage your password and two-factor authentication</p>
              </div>
            </div>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-(--text-uted) text-sm mt-1">Add an extra layer of security to your account</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={security.twoFactorEnabled}
                    onChange={(e) => setSecurity({ ...security, twoFactorEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-(--border) peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-(--border) after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-(--primary)"></div>
                </label>
              </div>
              <div className="max-w-md">
                <label className="block text-sm text-(--text-uted) mb-1">New Password</label>
                <input
                  type="password"
                  value={security.password}
                  onChange={(e) => setSecurity({ ...security, password: e.target.value })}
                  className="w-full px-4 py-2.5 bg-(--surface) border border-(--border) rounded-lg text-(--text-main) focus:outline-none focus:ring-1 focus:ring-(--primary)"
                  placeholder="••••••••"
                />
              </div>
              <div className="max-w-md">
                <label className="block text-sm text-(--text-uted) mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={security.confirmPassword}
                  onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                  className="w-full px-4 py-2.5 bg-(--surface) border border-(--border) rounded-lg text-(--text-main) focus:outline-none focus:ring-1 focus:ring-(--primary)"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={() => handleSave('Security')}
                className="px-5 py-2.5 bg-(--primary) text-white rounded-lg font-medium hover:bg-(--primary-ight) transition-colors"
              >
                Update Security
              </button>
            </div>
          </motion.section>

          {/* Workspace Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-(--surface-alt) rounded-2xl border border-(--border) p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl">🏢</span>
              <div>
                <h2 className="text-xl font-semibold">Workspace</h2>
                <p className="text-(--text-uted) text-sm">Configure your company settings</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl">
              <div>
                <label className="block text-sm text-(--text-uted) mb-1">Company Name</label>
                <input
                  type="text"
                  value={workspace.companyName}
                  onChange={(e) => setWorkspace({ ...workspace, companyName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-(--surface) border border-(--border) rounded-lg text-(--text-main) focus:outline-none focus:ring-1 focus:ring-(--primary)"
                />
              </div>
              <div>
                <label className="block text-sm text-(--text-uted) mb-1">Timezone</label>
                <select
                  value={workspace.timezone}
                  onChange={(e) => setWorkspace({ ...workspace, timezone: e.target.value })}
                  className="w-full px-4 py-2.5 bg-(--surface) border border-(--border) rounded-lg text-(--text-main) focus:outline-none focus:ring-1 focus:ring-(--primary)"
                >
                  <option value="America/New_York">New York</option>
                  <option value="America/Los_Angeles">Los Angeles</option>
                  <option value="Europe/London">London</option>
                  <option value="Asia/Tokyo">Tokyo</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-(--text-uted) mb-1">Language</label>
                <select
                  value={workspace.language}
                  onChange={(e) => setWorkspace({ ...workspace, language: e.target.value })}
                  className="w-full px-4 py-2.5 bg-(--surface) border border-(--border) rounded-lg text-(--text-main) focus:outline-none focus:ring-1 focus:ring-(--primary)"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={() => handleSave('Workspace')}
                className="px-5 py-2.5 bg-(--primary) text-white rounded-lg font-medium hover:bg-(--primary-ight) transition-colors"
              >
                Save Workspace Settings
              </button>
            </div>
          </motion.section>

          {/* Notifications Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-(--surface-alt) rounded-2xl border border-(--border) p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl">🔔</span>
              <div>
                <h2 className="text-xl font-semibold">Notifications</h2>
                <p className="text-(--text-uted) text-sm">Choose how you receive alerts</p>
              </div>
            </div>
            <div className="space-y-4 max-w-md">
              <div className="flex items-center justify-between">
                <span>Email Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.emailNotifications}
                    onChange={(e) => setNotifications({ ...notifications, emailNotifications: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-(--border) peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-(--border) after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-(--primary)"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span>SMS Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.smsNotifications}
                    onChange={(e) => setNotifications({ ...notifications, smsNotifications: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-(--border) peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-(--border) after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-(--primary)"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span>Team Messages</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.teamMessages}
                    onChange={(e) => setNotifications({ ...notifications, teamMessages: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-(--border) peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-(--border) after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-(--primary)"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span>Termination Alerts</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.terminationAlerts}
                    onChange={(e) => setNotifications({ ...notifications, terminationAlerts: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-(--border) peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-(--border) after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-(--primary)"></div>
                </label>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={() => handleSave('Notifications')}
                className="px-5 py-2.5 bg-(--primary) text-white rounded-lg font-medium hover:bg-(--primary-ight) transition-colors"
              >
                Save Notification Preferences
              </button>
            </div>
          </motion.section>

          {/* Team & Roles Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-(--surface-alt) rounded-2xl border border-(--border) p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl">👥</span>
              <div>
                <h2 className="text-xl font-semibold">Team & Roles</h2>
                <p className="text-(--text-uted) text-sm">Set your default team and permissions</p>
              </div>
            </div>
            <div className="max-w-md space-y-4">
              <div>
                <label className="block text-sm text-(--text-uted) mb-1">Default Team</label>
                <select
                  value={teamSettings.defaultTeam}
                  onChange={(e) => setTeamSettings({ ...teamSettings, defaultTeam: e.target.value })}
                  className="w-full px-4 py-2.5 bg-(--surface) border border-(--border) rounded-lg text-(--text-main) focus:outline-none focus:ring-1 focus:ring-(--primary)"
                >
                  <option value="1">Engineering</option>
                  <option value="2">Marketing</option>
                  <option value="3">Support</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-(--text-uted) mb-1">Role</label>
                <div className="px-4 py-2.5 bg-(--surface) border border-(--border) rounded-lg text-(--text-main)">
                  Manager
                </div>
                <p className="text-(--text-uted) text-sm mt-1">Role permissions are managed by your HR admin.</p>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={() => handleSave('Team & Roles')}
                className="px-5 py-2.5 bg-(--primary) text-white rounded-lg font-medium hover:bg-(--primary-ight) transition-colors"
              >
                Save Team Settings
              </button>
            </div>
          </motion.section>

          {/* Danger Zone */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-(--surface-alt) rounded-2xl border border-(--border) p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl">⚠️</span>
              <div>
                <h2 className="text-xl font-semibold">Danger Zone</h2>
                <p className="text-(--text-uted) text-sm">Advanced actions that cannot be undone</p>
              </div>
            </div>
            <div className="border border-(--danger) rounded-xl p-5 bg-(--danger)/5">
              <h3 className="font-medium text-(--danger) mb-2">Delete Account</h3>
              <p className="text-(--text-uted) text-sm mb-4">
                Permanently delete your HRFlow account and all associated data.
              </p>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-4 py-2 bg-(--danger) text-white rounded-lg text-sm font-medium hover:bg-(--danger)/90"
              >
                Delete Account
              </button>
            </div>
            <div className="mt-4">
              <button className="px-4 py-2 bg-(--surface) text-(--text-main) rounded-lg text-sm font-medium hover:bg-(--surface-alt)">
                Export All Data
              </button>
            </div>
          </motion.section>
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

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowDeleteConfirm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-(--surface) rounded-2xl p-6 w-full max-w-md border border-(--border) shadow-(--shadow-edium)"
              >
                <h3 className="text-xl font-bold text-(--text-main)">Delete Account?</h3>
                <p className="text-(--text-uted) mt-2">
                  This will permanently delete your account and all data. Type <span className="font-mono bg-(--surface-alt) px-1.5 py-0.5 rounded">DELETE</span> to confirm.
                </p>
                <input
                  type="text"
                  value={deleteConfirmInput}
                  onChange={(e) => setDeleteConfirmInput(e.target.value)}
                  placeholder="Type 'DELETE'"
                  className="mt-4 w-full px-4 py-2.5 bg-(--surface-alt) border border-(--border) rounded-lg text-(--text-main) placeholder-(--text-ubtle) focus:outline-none focus:ring-2 focus:ring-(--danger)/50"
                />
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-4 py-2.5 text-(--text-main) rounded-lg border border-(--border) hover:bg-(--surface-alt)"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={deleteConfirmInput.trim() !== 'DELETE'}
                    className="flex-1 px-4 py-2.5 bg-(--danger) text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-(--danger)/90"
                  >
                    Confirm Deletion
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
