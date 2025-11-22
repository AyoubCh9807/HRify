'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setEmail('');
    }, 800);
  };

  return (
    <div className="font-sans bg-background text-(--text-main) min-h-screen">
      <nav className="px-6 py-5 flex justify-between items-center max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <a href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="HRify Logo" className="h-8 w-8" />
            <span className="text-xl font-bold">HRify</span>
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="hidden md:flex items-center gap-6"
        >
          <a href="#features" className="text-(--text-uted) hover:text-(--text-main) font-medium">Features</a>
          <a href="#how-it-works" className="text-(--text-uted) hover:text-(--text-main) font-medium">How It Works</a>
          <a href="#pricing" className="text-(--text-uted) hover:text-(--text-main) font-medium">Pricing</a>
          <a
            href="/login"
            className="px-5 py-2.5 rounded-lg font-medium bg-(--surface-alt) hover:bg-(--surface) transition-colors"
          >
            Sign In
          </a>
        </motion.div>
        <button className="md:hidden text-(--text-main)">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-16 md:py-28 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-2xl leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Automate Your HR Workflows
            </motion.h1>
            <motion.p
              className="text-(--text-uted) text-lg mt-6 max-w-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Streamline team management, bulk messaging, and staffing changes — all from one intuitive platform built for modern HR teams.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  required
                  className="flex-1 px-5 py-3.5 bg-(--surface-alt) border border-(--border) rounded-xl text-(--text-main) placeholder-(--text-ubtle) focus:outline-none focus:ring-2 focus:ring-(--primary)"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3.5 bg-(--primary) text-white rounded-xl font-medium hover:bg-(--primary-ight) transition-colors disabled:opacity-70 whitespace-nowrap"
                >
                  {isSubmitting ? 'Submitting...' : 'Get Early Access'}
                </button>
              </form>
              {submitted && (
                <motion.p
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-(--success) mt-2"
                >
                  ✅ Thanks! Check your email for next steps.
                </motion.p>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-(--surface) border border-(--border) rounded-2xl p-6 shadow-(--shadow-medium) overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-(--danger)"></div>
                  <div className="w-3 h-3 rounded-full bg-(--warning)"></div>
                  <div className="w-3 h-3 rounded-full bg-(--success)"></div>
                </div>
                <span className="text-sm text-(--text-uted)">Dashboard Preview</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-(--text-uted)">Active Teams</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-(--text-uted)">Team Members</span>
                  <span className="font-semibold">248</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-(--text-uted)">Pending Actions</span>
                  <span className="font-semibold text-(--warning)">3</span>
                </div>
                <div className="pt-4 border-t border-(--border)">
                  <button className="w-full py-3 bg-(--primary) text-white rounded-lg text-sm font-medium">
                    Send Bulk Message
                  </button>
                </div>
              </div>
            </div>
            <motion.div
              className="absolute -top-6 -right-6 w-32 h-32 bg-(--primary)/10 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-(--surface)">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Everything You Need to Manage Teams
            </motion.h2>
            <motion.p
              className="text-(--text-uted) mt-4 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              HRify replaces spreadsheets, email chains, and manual processes with one unified platform.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '📨',
                title: 'Bulk Messaging',
                description: 'Send personalized messages to entire teams or individuals with one click.',
              },
              {
                icon: '👥',
                title: 'Team Management',
                description: 'Create and manage teams using email lists. Add or remove members instantly.',
              },
              {
                icon: '⚠️',
                title: 'Secure Staffing Changes',
                description: 'Terminate employees with audit trails and confirmation safeguards.',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="bg-(--surface-alt) p-6 rounded-2xl border border-(--border)"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-(--text-uted)">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              How HRify Works
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Sign Up', description: 'Create your HRify account in seconds.' },
              { step: '2', title: 'Import Teams', description: 'Add members via email or CSV upload.' },
              { step: '3', title: 'Automate', description: 'Send messages, manage staffing, and more.' },
            ].map((step, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-(--primary)/15 flex items-center justify-center mx-auto text-(--primary) text-xl font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-(--text-uted)">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-(--surface-alt)">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to Transform Your HR Workflow?
          </motion.h2>
          <motion.p
            className="text-(--text-uted) text-lg mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Join hundreds of teams already automating their HR operations with HRify.
          </motion.p>
          <motion.a
            href="/signup"
            className="inline-block px-8 py-4 bg-(--primary) text-white rounded-xl font-bold text-lg hover:bg-(--primary-ight) transition-colors"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Start Free Trial →
          </motion.a>
          <p className="text-(--text-uted) text-sm mt-4">No credit card required. 14-day free trial.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-(--border)">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <img src="/logo.png" alt="HRify Logo" className="h-8 w-8" />
              <span className="text-xl font-bold">HRify</span>
            </div>
            <div className="text-(--text-uted) text-sm">
              © {new Date().getFullYear()} HRify. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};