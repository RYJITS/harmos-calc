/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Plus,
  Trash2,
  Calculator,
  TrendingUp,
  Info,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  ArrowUpCircle,
  Target,
  Gauge as GaugeIcon,
  Gamepad2,
  Sparkles,
  Moon,
  Sun,
  Frown,
  Lock,
  Play,
  Pause
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Level, Subject, GradeComponent, Track } from './types';

const Celebration = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        onComplete();
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center bg-white/10 backdrop-blur-[2px]"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 10 }}
          className="bg-white p-12 rounded-[40px] shadow-2xl border-4 border-yellow-400"
        >
          <Sparkles className="w-24 h-24 text-yellow-500 mx-auto mb-4 animate-pulse" />
          <h2 className="text-5xl font-black text-[#141414] mb-2 uppercase tracking-tighter italic">BRAVO !</h2>
          <p className="text-xl font-bold text-emerald-600">+1 HEURE DE JEU</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Penalty = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center bg-black/60 backdrop-blur-md"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.5, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', damping: 12 }}
          className="bg-[#141414] p-12 rounded-[40px] shadow-2xl border-4 border-red-600 text-white"
        >
          <Frown className="w-24 h-24 text-red-500 mx-auto mb-4" />
          <h2 className="text-5xl font-black mb-2 uppercase tracking-tighter italic">DOMMAGE...</h2>
          <p className="text-xl font-bold text-red-400">-1 HEURE DE JEU</p>
          <p className="text-sm opacity-50 mt-4">Fais mieux la prochaine fois !</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ParentModal = ({
  onClose,
  initialSettings,
  onSave,
  logs,
  setLogs,
  initialPassword,
  onResetTimer,
  onResetGrades,
  onResetHours,
  onResetAll,
  onResetGradeHours
}: {
  onClose: () => void,
  initialSettings: any,
  onSave: (settings: any, password: string) => void,
  logs: any[],
  setLogs: any,
  initialPassword: string,
  onResetTimer: () => void,
  onResetGrades: () => void,
  onResetHours: () => void,
  onResetAll: () => void,
  onResetGradeHours: () => void
}) => {
  const [settings, setSettings] = useState(initialSettings);
  const [password, setPassword] = useState(initialPassword);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-[#141414] text-white w-full max-w-2xl max-h-[90vh] rounded-[32px] shadow-2xl overflow-hidden flex flex-col border border-white/10"
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Lock className="text-purple-400" size={24} />
            <h2 className="text-2xl font-bold tracking-tight">Mode Parent</h2>
          </div>
          <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
            <Plus className="rotate-45" size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-8">

          {/* Tableboard Summary - 3 Columns */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-2xl flex flex-col items-center text-center">
              <div className="text-[9px] uppercase opacity-60 font-bold mb-1 tracking-widest text-emerald-400">Notes ≥ 5</div>
              <div className="text-2xl font-black text-emerald-400">+{initialSettings.stats?.goodCount || 0}h</div>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-2xl flex flex-col items-center text-center">
              <div className="text-[9px] uppercase opacity-60 font-bold mb-1 tracking-widest text-red-400">Notes &lt; 4</div>
              <div className="text-2xl font-black text-red-400">-{initialSettings.stats?.badCount || 0}h</div>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/20 p-3 rounded-2xl flex flex-col items-center text-center">
              <div className="text-[9px] uppercase opacity-60 font-bold mb-1 tracking-widest text-purple-400">Parents</div>
              <div className="text-2xl font-black text-purple-400">
                {Number(settings.bonusHours) - Math.abs(Number(settings.malusHours)) >= 0 ? '+' : ''}
                {Number(settings.bonusHours) - Math.abs(Number(settings.malusHours))}h
              </div>
            </div>
          </div>

          {/* SEC: PASSWORD */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest opacity-50 flex items-center gap-2">
              <Lock size={16} /> Sécurité
            </h3>
            <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5">
              <div>
                <div className="font-bold">Mot de passe du Mode Parent</div>
                <div className="text-xs opacity-60">Modifiez le mot de passe pour accéder à cet écran.</div>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black border border-white/20 rounded-lg px-3 py-2 w-32 text-center focus:outline-none focus:border-purple-400"
              />
            </div>
          </section>

          {/* SEC: SETTINGS */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest opacity-50 flex items-center gap-2">
              <Gamepad2 size={16} /> Réglages des Heures
            </h3>

            <div className="space-y-4 bg-white/5 p-4 rounded-2xl border border-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold">Heures Ajoutées manuellement (+)</div>
                  <div className="text-xs opacity-60">Ajouter du temps bonus arbitrairement.</div>
                </div>
                <input
                  type="number"
                  value={settings.bonusHours}
                  onChange={(e) => setSettings({ ...settings, bonusHours: parseInt(e.target.value) || 0 })}
                  className="bg-black border border-white/20 rounded-lg px-3 py-2 w-20 text-center focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold">Heures Retirées manuellement (-)</div>
                  <div className="text-xs opacity-60">Retirer du temps (ex: pour comportement).</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-400 font-bold">-</span>
                  <input
                    type="number"
                    value={settings.malusHours}
                    onChange={(e) => setSettings({ ...settings, malusHours: Math.abs(parseInt(e.target.value) || 0) })}
                    className="bg-black border border-white/20 rounded-lg px-3 py-2 w-20 text-center focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-2">
                <div className="font-bold text-purple-400 uppercase text-[10px] tracking-widest">Résultat des ajustements parents</div>
                <div className="text-xl font-black text-purple-400">
                  {Number(settings.bonusHours) - Math.abs(Number(settings.malusHours)) >= 0 ? '+' : ''}
                  {Number(settings.bonusHours) - Math.abs(Number(settings.malusHours))}h
                </div>
              </div>
            </div>

            <h3 className="text-sm font-bold uppercase tracking-widest opacity-50 flex items-center gap-2 pt-4">
              <Calculator size={16} /> Permissions Élevé
            </h3>

            <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5">
              <div>
                <div className="font-bold">Autoriser la suppression de notes</div>
                <div className="text-xs opacity-60">Si désactivé, l'élève ne verra plus la corbeille de suppression.</div>
              </div>
              <button
                onClick={() => setSettings({ ...settings, allowDeletion: !settings.allowDeletion })}
                className={`w-14 h-8 rounded-full p-1 transition-colors ${settings.allowDeletion ? 'bg-emerald-500' : 'bg-white/20'}`}
              >
                <motion.div
                  className="bg-white w-6 h-6 rounded-full shadow-md"
                  animate={{ x: settings.allowDeletion ? 24 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            </div>

            <h3 className="text-sm font-bold uppercase tracking-widest opacity-50 flex items-center gap-2 pt-4">
              <RotateCcw size={16} /> Système
            </h3>
            <div className="flex flex-col gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold">Minuteur de session</div>
                  <div className="text-xs opacity-60">Remettre à 60:00.</div>
                </div>
                <button
                  onClick={() => {
                    onResetTimer();
                    alert("Minuteur réinitialisé !");
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors"
                >
                  Réinitialiser
                </button>
              </div>

              <div className="w-full h-px bg-white/5" />

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold">Toutes les Notes</div>
                  <div className="text-xs opacity-60">Effacer et remettre les branches par défaut.</div>
                </div>
                <button
                  onClick={() => {
                    if (confirm("Voulez-vous vraiment effacer TOUTES les notes ?")) {
                      onResetGrades();
                      onClose(); // Re-open would be needed to see 0 stats, cleaner to close
                    }
                  }}
                  className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 px-4 py-2 rounded-xl text-xs font-bold transition-colors"
                >
                  Effacer Notes
                </button>
              </div>

              <div className="w-full h-px bg-white/5" />

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold">Heures Bonus/Malus</div>
                  <div className="text-xs opacity-60">Remettre les ajustements manuels à 0.</div>
                </div>
                <button
                  onClick={() => {
                    setSettings({ ...settings, bonusHours: 0, malusHours: 0 });
                    onResetHours();
                    alert("Ajustements d'heures réinitialisés !");
                  }}
                  className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 px-4 py-2 rounded-xl text-xs font-bold transition-colors"
                >
                  Effacer Heures
                </button>
              </div>

              <div className="w-full h-px bg-white/5" />

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold">Heures des Notes</div>
                  <div className="text-xs opacity-60">Remettre le solde des notes à 0 (sans les supprimer).</div>
                </div>
                <button
                  onClick={() => {
                    const count = (initialSettings.stats?.goodCount || 0) - (initialSettings.stats?.badCount || 0);
                    if (confirm(`Cela va créer une compensation de ${-count}h pour annuler le solde actuel des notes (${count}h). Continuer ?`)) {
                      setSettings({ ...settings, gradeOffset: -count });
                      onResetGradeHours();
                      alert("Heures des notes réinitialisées !");
                    }
                  }}
                  className="bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 px-4 py-2 rounded-xl text-xs font-bold transition-colors"
                >
                  Remettre à Zéro
                </button>
              </div>

              <div className="w-full h-px bg-white/5" />

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-red-400">Remise à Zéro Totale</div>
                  <div className="text-xs opacity-60">Notes, Heures, Logs et Mot de passe.</div>
                </div>
                <button
                  onClick={() => {
                    if (confirm("ATTENTION : Cette action efface ABSOLUMENT TOUT. Continuer ?")) {
                      onResetAll();
                      onClose(); // Force close to prevent stale save
                    }
                  }}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-2 rounded-xl text-xs font-bold transition-colors border border-red-500/20"
                >
                  TOUT EFFACER
                </button>
              </div>
            </div>
          </section>

          {/* SEC: LOGS */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold uppercase tracking-widest opacity-50 flex items-center gap-2">
                <Info size={16} /> Historique des actions
              </h3>
              <button
                onClick={() => {
                  if (confirm("Effacer tout l'historique ?")) setLogs([]);
                }}
                className="text-xs text-red-400 hover:text-red-300 transition-colors bg-red-400/10 px-3 py-1.5 rounded-lg"
              >
                Effacer les logs
              </button>
            </div>

            <div className="bg-white/5 rounded-2xl border border-white/5 p-2 h-64 overflow-y-auto">
              {logs.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-40 font-mono text-sm">
                  Aucun historique enregistré.
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {logs.map((log) => (
                    <div key={log.id} className="p-3 flex items-start justify-between gap-4 text-sm">
                      <div className="font-medium text-white/90">{log.action}</div>
                      <div className="text-xs font-mono opacity-50 shrink-0 mt-0.5">{log.date}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* SEC: SAVE */}
          <section className="space-y-4 pt-4">
            <button
              onClick={() => {
                onSave(settings, password);
                onClose();
              }}
              className="w-full py-4 rounded-xl bg-purple-600 text-white font-bold uppercase tracking-wider text-sm hover:bg-purple-500 transition-colors shadow-lg shadow-purple-500/20 flex justify-center items-center gap-2"
            >
              <CheckCircle2 size={18} />
              Sauvegarder les modifications
            </button>
          </section>

        </div>
      </motion.div>
    </motion.div >
  );
};

const DEFAULT_SUBJECTS: Subject[] = [
  {
    id: 'fr',
    name: 'Français',
    isMain: true,
    hasLevel: true,
    level: Level.B,
    components: [
      { id: 'fr-1', name: 'Production O+E', grades: [4.5], average: 4.5 },
      { id: 'fr-2', name: 'Compréhension O+E', grades: [6, 5], average: 5.5 },
      { id: 'fr-3', name: 'Structuration', grades: [5.5, 6, 4.5], average: 5.3 }
    ],
    grades: [],
    average: 5.11
  },
  {
    id: 'ma',
    name: 'Mathématiques',
    isMain: true,
    hasLevel: true,
    level: Level.A,
    components: [
      { id: 'ma-1', name: 'Problèmes', grades: [4.5, 5, 5, 5], average: 4.875 },
      { id: 'ma-2', name: 'Connaissance de base', grades: [3, 4.5, 5.5, 4.5, 3], average: 4.1 }
    ],
    grades: [],
    average: 4.49
  },
  {
    id: 'al',
    name: 'Allemand',
    isMain: true,
    hasLevel: true,
    level: Level.B,
    components: [
      { id: 'al-1', name: 'Compréhension O+E', grades: [5, 5, 5], average: 5 },
      { id: 'al-2', name: 'Production O+E', grades: [5, 4.5, 4.5, 4.5, 4.5], average: 4.6 }
    ],
    grades: [],
    average: 4.80
  },
  {
    id: 'an',
    name: 'Anglais',
    isMain: false,
    hasLevel: false,
    components: [
      { id: 'an-1', name: 'Compréhension O+E', grades: [5.5, 5], average: 5.25 },
      { id: 'an-2', name: 'Production O+E', grades: [5, 5.5], average: 5.25 }
    ],
    grades: [],
    average: 5.25
  },
  { id: 'mu', name: 'Musique', isMain: false, hasLevel: false, components: [], grades: [5.5, 5], average: 5.25 },
  { id: 'ep', name: 'EPS', isMain: false, hasLevel: false, components: [], grades: [5.5, 5.5, 6], average: 5.67 },
  { id: 'de', name: 'Dessin', isMain: false, hasLevel: false, components: [], grades: [6, 5.5], average: 5.75 },
  { id: 'ac', name: 'ACT', isMain: false, hasLevel: false, components: [], grades: [6, 6], average: 6.00 },
  { id: 'ge', name: 'Géographie', isMain: false, hasLevel: false, components: [], grades: [5, 3.5, 5.5, 4], average: 4.50 },
  { id: 'hi', name: 'Histoire', isMain: false, hasLevel: false, components: [], grades: [5, 5, 4.5, 5], average: 4.88 },
  { id: 'sc', name: 'Sciences', isMain: false, hasLevel: false, components: [], grades: [5, 3.5], average: 4.25 },
  { id: 'ef', name: 'Économie familiale', isMain: false, hasLevel: false, components: [], grades: [5.5], average: 5.50 },
];

const Gauge = ({ percentage }: { percentage: number }) => {
  const rotation = (percentage / 100) * 180 - 90;

  return (
    <div className="relative w-48 h-24 mx-auto overflow-hidden">
      {/* Gauge Background */}
      <svg viewBox="0 0 100 50" className="w-full h-full">
        <path
          d="M 10 45 A 35 35 0 0 1 90 45"
          fill="none"
          stroke="#333"
          strokeWidth="10"
          strokeLinecap="round"
          className="opacity-20"
        />
        {/* Color segments */}
        <path d="M 10 45 A 35 35 0 0 1 36.6 20" fill="none" stroke="#ef4444" strokeWidth="10" />
        <path d="M 36.6 20 A 35 35 0 0 1 63.3 20" fill="none" stroke="#f59e0b" strokeWidth="10" />
        <path d="M 63.3 20 A 35 35 0 0 1 90 45" fill="none" stroke="#10b981" strokeWidth="10" />
      </svg>

      {/* Needle */}
      <motion.div
        className="absolute bottom-0 left-1/2 w-1 h-20 bg-white origin-bottom -translate-x-1/2 rounded-full shadow-lg"
        initial={{ rotate: -90 }}
        animate={{ rotate: rotation }}
        transition={{ type: 'spring', stiffness: 60, damping: 15 }}
        style={{ height: '80%', bottom: '5px' }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full" />
      </motion.div>

      {/* Center Point */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#141414] border-2 border-white rounded-full z-20" style={{ bottom: '-2px' }} />
    </div>
  );
};

export default function App() {
  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const saved = localStorage.getItem('harmos-grades-v3');
    return saved ? JSON.parse(saved) : DEFAULT_SUBJECTS;
  });

  const [isSomberMode, setIsSomberMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('harmos-sombermode');
    return saved === 'true';
  });

  const [parentSettings, setParentSettings] = useState(() => {
    const saved = localStorage.getItem('harmos-parent-settings');
    return saved ? JSON.parse(saved) : { allowDeletion: true, bonusHours: 0, malusHours: 0, gradeOffset: 0 };
  });

  const [logs, setLogs] = useState<{ id: string, date: string, action: string }[]>(() => {
    const saved = localStorage.getItem('harmos-logs');
    return saved ? JSON.parse(saved) : [];
  });

  const [parentPassword, setParentPassword] = useState(() => {
    return localStorage.getItem('harmos-parent-password') || 'password';
  });

  const playTime = useMemo(() => {
    let good = 0;
    let bad = 0;
    subjects.forEach(s => {
      s.grades.forEach(g => { if (g >= 5) good++; else if (g < 4) bad++; });
      s.components.forEach(c => {
        c.grades.forEach(g => { if (g >= 5) good++; else if (g < 4) bad++; });
      });
    });

    const noteBalance = Number(good) - Number(bad) + (Number(parentSettings.gradeOffset) || 0);
    const manualBalance = (Number(parentSettings.bonusHours) || 0) - Math.abs(Number(parentSettings.malusHours) || 0);

    return noteBalance + manualBalance;
  }, [subjects, parentSettings]);

  const [showCelebration, setShowCelebration] = useState(false);
  const [showPenalty, setShowPenalty] = useState(false);
  const [showParentModal, setShowParentModal] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [expandedSubjects, setExpandedSubjects] = useState<Set<string>>(new Set());

  // Timer State
  const [timerSeconds, setTimerSeconds] = useState(3600);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isTimerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerActive(false);
      setTimerSeconds(3600);
      playAlarm();
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timerSeconds]);

  const playAlarm = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // A5

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 1);
  };

  useEffect(() => {
    localStorage.setItem('harmos-grades-v3', JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem('harmos-sombermode', isSomberMode.toString());
  }, [isSomberMode]);

  useEffect(() => {
    localStorage.setItem('harmos-parent-settings', JSON.stringify(parentSettings));
  }, [parentSettings]);

  useEffect(() => {
    localStorage.setItem('harmos-logs', JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem('harmos-parent-password', parentPassword);
  }, [parentPassword]);

  const addLog = (message: string) => {
    setLogs(prev => [{
      id: Date.now().toString(),
      date: new Date().toLocaleString('fr-CH', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }),
      action: message
    }, ...prev].slice(0, 100));
  };

  const toggleExpand = (id: string) => {
    setExpandedSubjects(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const calculateAverage = (grades: number[]) => {
    if (grades.length === 0) return 0;
    const sum = grades.reduce((a, b) => a + b, 0);
    return Math.round((sum / grades.length) * 1000) / 1000;
  };

  const updateSubjectAverage = (subject: Subject): Subject => {
    if (subject.components.length > 0) {
      const compAverages = subject.components.map(c => c.average);
      const avg = compAverages.reduce((a, b) => a + b, 0) / compAverages.length;
      return { ...subject, average: Math.round(avg * 100) / 100 };
    } else {
      return { ...subject, average: Math.round(calculateAverage(subject.grades) * 100) / 100 };
    }
  };

  const removeSubject = (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer cette branche et toutes ses notes ?")) {
      setSubjects(prev => prev.filter(s => s.id !== id));
      addLog(`Branche supprimée : ${id}`);
    }
  };

  const addGrade = (subjectId: string, componentId: string | null, value: number) => {
    if (isNaN(value) || value < 1 || value > 6) return;

    if (value >= 5) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3500);
    } else if (value < 4) {
      setShowPenalty(true);
      setTimeout(() => setShowPenalty(false), 3500);
    }

    const targetSubject = subjects.find(s => s.id === subjectId);
    let targetComponentName = "";
    if (componentId) {
      targetComponentName = targetSubject?.components.find(c => c.id === componentId)?.name || "";
    }
    const logDetails = targetComponentName ? `${targetSubject?.name} (${targetComponentName})` : `${targetSubject?.name}`;
    addLog(`Ajout d'une note de ${value} en ${logDetails}`);

    setSubjects(prev => prev.map(s => {
      if (s.id === subjectId) {
        let updated = { ...s };
        if (componentId) {
          updated.components = s.components.map(c => {
            if (c.id === componentId) {
              const newGrades = [...c.grades, value];
              return { ...c, grades: newGrades, average: calculateAverage(newGrades) };
            }
            return c;
          });
        } else {
          updated.grades = [...s.grades, value];
        }
        return updateSubjectAverage(updated);
      }
      return s;
    }));
  };

  const removeGrade = (subjectId: string, componentId: string | null, index: number) => {
    const subject = subjects.find(s => s.id === subjectId);
    if (!subject) return;

    let gradeToRemove: number | undefined;
    if (componentId) {
      const comp = subject.components.find(c => c.id === componentId);
      if (comp) gradeToRemove = comp.grades[index];
    } else {
      gradeToRemove = subject.grades[index];
    }

    // 2. Apply side-effects
    if (gradeToRemove !== undefined) {
      const logDetails = componentId
        ? `${subject?.name} (${subject?.components.find(c => c.id === componentId)?.name})`
        : `${subject?.name}`;
      addLog(`Suppression d'une note de ${gradeToRemove} en ${logDetails}`);

      if (gradeToRemove >= 5) {
        setShowPenalty(true);
        setTimeout(() => setShowPenalty(false), 3500);
      } else if (gradeToRemove < 4) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3500);
      }
    }

    setSubjects(prev => prev.map(s => {
      if (s.id !== subjectId) return s;
      let updated = { ...s };
      if (componentId) {
        updated.components = s.components.map(c => {
          if (c.id === componentId) {
            const newGrades = c.grades.filter((_, i) => i !== index);
            return { ...c, grades: newGrades, average: calculateAverage(newGrades) };
          }
          return c;
        });
      } else {
        updated.grades = s.grades.filter((_, i) => i !== index);
      }
      return updateSubjectAverage(updated);
    }));
  };

  const changeLevel = (subjectId: string, level: Level) => {
    setSubjects(prev => prev.map(s => s.id === subjectId ? { ...s, level } : s));
  };

  const addSubject = () => {
    if (!newSubjectName.trim()) return;
    const newSub: Subject = {
      id: Date.now().toString(),
      name: newSubjectName,
      isMain: false,
      hasLevel: false,
      components: [],
      grades: [],
      average: 0
    };
    setSubjects([...subjects, newSub]);
    setNewSubjectName('');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const gradeCounts = useMemo(() => {
    let good = 0;
    let bad = 0;
    subjects.forEach(s => {
      s.grades.forEach(g => { if (g >= 5) good++; else if (g < 4) bad++; });
      s.components.forEach(c => {
        c.grades.forEach(g => { if (g >= 5) good++; else if (g < 4) bad++; });
      });
    });
    return { goodCount: good, badCount: bad };
  }, [subjects]);

  const stats = useMemo(() => {
    const allSubjectsWithGrades = subjects.filter(s => s.average > 0);
    const generalAverage = allSubjectsWithGrades.length > 0
      ? Math.round((allSubjectsWithGrades.reduce((acc, s) => acc + s.average, 0) / allSubjectsWithGrades.length) * 100) / 100
      : 0;

    const mainSubjects = subjects.filter(s => s.isMain && s.average > 0);
    const mainSum = mainSubjects.reduce((acc, s) => acc + s.average, 0);

    const levelA = subjects.filter(s => s.hasLevel && s.level === Level.A).length;
    const levelB = subjects.filter(s => s.hasLevel && s.level === Level.B).length;
    const levelC = subjects.filter(s => s.hasLevel && s.level === Level.C).length;

    let currentTrack = Track.GENERAL;
    let nextTrack: Track | null = null;
    let advice = "";
    let progressPoints = levelA * 2 + levelB * 1;
    let progressPercentage = 0;

    if (levelA >= 3 || (levelA >= 2 && levelB >= 1)) {
      currentTrack = Track.PRE_GYMNASE;
      advice = "Excellent ! Vous remplissez les conditions de niveaux pour le Pré-gymnasial (VP).";
      progressPercentage = progressPoints >= 6 ? 95 : 80;
    }
    else if (levelA + levelB >= 3 || (levelA + levelB >= 2 && levelC >= 1)) {
      currentTrack = Track.MODERNE;
      nextTrack = Track.PRE_GYMNASE;
      advice = "Vous êtes actuellement en niveau Moderne. Pour atteindre le Pré-gymnasial, haussez vos niveaux.";
      progressPercentage = 35 + (progressPoints - 2) * 10;
    }
    else {
      currentTrack = Track.GENERAL;
      nextTrack = Track.MODERNE;
      advice = "Niveau Général (VG). Pour atteindre le Moderne, passez en Niveau B ou A.";
      progressPercentage = 5 + progressPoints * 15;
    }

    return {
      generalAverage,
      mainSum,
      mainCount: mainSubjects.length,
      levelACount: levelA,
      levelBCount: levelB,
      levelCCount: levelC,
      currentTrack,
      nextTrack,
      advice,
      progressPercentage
    };
  }, [subjects]);

  const mainSum = stats.mainSum;

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-emerald-100 ${isSomberMode ? 'bg-[#0A0A0A] text-[#E5E5E5]' : 'bg-[#F5F5F4] text-[#141414]'}`}>
      <AnimatePresence>
        {showCelebration && <Celebration onComplete={() => setShowCelebration(false)} />}
        {showPenalty && <Penalty onComplete={() => setShowPenalty(false)} />}
        {showParentModal && (
          <ParentModal
            onClose={() => setShowParentModal(false)}
            initialSettings={{ ...parentSettings, stats: gradeCounts }}
            initialPassword={parentPassword}
            onResetTimer={() => {
              setTimerSeconds(3600);
              setIsTimerActive(false);
              addLog("Minuteur réinitialisé");
            }}
            onResetGrades={() => {
              setSubjects(DEFAULT_SUBJECTS);
              addLog("Notes réinitialisées");
            }}
            onResetHours={() => {
              setParentSettings(prev => ({ ...prev, bonusHours: 0, malusHours: 0 }));
              addLog("Heures manuelles réinitialisées");
            }}
            onResetGradeHours={() => {
              let count = 0;
              subjects.forEach(s => {
                s.grades.forEach(g => { if (g >= 5) count++; else if (g < 4) count--; });
                s.components.forEach(c => {
                  c.grades.forEach(g => { if (g >= 5) count++; else if (g < 4) count--; });
                });
              });
              setParentSettings(prev => ({ ...prev, gradeOffset: -count }));
              addLog("Heures des notes réinitialisées");
            }}
            onResetAll={() => {
              setSubjects(DEFAULT_SUBJECTS);
              setLogs([]);
              setParentSettings({ allowDeletion: true, bonusHours: 0, malusHours: 0, gradeOffset: 0 });
              setParentPassword('password');
              setTimerSeconds(3600);
              setIsTimerActive(false);
              addLog("Remise à zéro totale");
            }}
            onSave={(newSettings, newPassword) => {
              const { stats, ...pureSettings } = newSettings as any;
              setParentPassword(newPassword);
              setParentSettings(pureSettings);
              setShowParentModal(false);
            }}
            logs={logs}
            setLogs={setLogs}
          />
        )}
      </AnimatePresence>

      <header className="sticky top-0 z-30 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-black/5 dark:border-white/5 safe-top">
        <div className="max-w-xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-xl font-black tracking-tighter leading-tight">HARMOS CALC</h1>
            <span className="text-[10px] uppercase tracking-widest opacity-50 font-bold">Système scolaire suisse</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSomberMode(!isSomberMode)}
              className="p-3 bg-black/5 dark:bg-white/10 rounded-full hover:scale-105 transition-transform"
            >
              {isSomberMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => {
                const pass = prompt("Mot de passe Parent :");
                if (pass === parentPassword) setShowParentModal(true);
                else if (pass !== null) alert("Incorrect");
              }}
              className="p-3 bg-purple-600 text-white rounded-full hover:scale-105 transition-transform"
            >
              <Lock size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-6 py-10 space-y-12 pb-32">
        {/* SEC: ORIENTATION */}
        <section className="space-y-4">
          <div className="flex flex-col items-start px-1">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-1">Orientation Actuelle</h2>
            <h3 className="text-4xl font-black tracking-tighter mb-6 italic">{stats.currentTrack}</h3>
          </div>

          <div className={`p-8 rounded-[40px] border transition-all ${isSomberMode ? 'bg-[#141414] border-white/5 shadow-2xl' : 'bg-white border-black/5 shadow-xl'}`}>
            <div className="flex flex-col items-center space-y-10">
              <div className="w-full max-w-[240px]">
                <Gauge percentage={stats.progressPercentage} />
                <div className="flex justify-between mt-3 text-[10px] uppercase font-black tracking-widest opacity-30">
                  <span>VG</span>
                  <span>MODERNE</span>
                  <span>VP</span>
                </div>
              </div>

              <div className="w-full space-y-6 pt-4">
                <div className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-4">
                  <div className="text-[12px] font-bold opacity-60 uppercase tracking-widest">Moyenne Générale</div>
                  <div className="text-2xl font-black tabular-nums">{stats.generalAverage.toFixed(2)}</div>
                </div>

                <div className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-4">
                  <div className="text-[12px] font-bold opacity-60 uppercase tracking-widest">Branches Niveau A</div>
                  <div className="text-2xl font-black tabular-nums text-emerald-500">{stats.levelACount}</div>
                </div>

                <div className="flex justify-between items-center pb-2">
                  <div className="text-[12px] font-bold opacity-60 uppercase tracking-widest">Branches Niveau B</div>
                  <div className="text-2xl font-black tabular-nums text-emerald-500">{stats.levelBCount}</div>
                </div>
              </div>

              {stats.advice && (
                <div className={`w-full p-5 rounded-3xl border text-center font-bold italic text-xs ${isSomberMode ? 'bg-emerald-950/20 text-emerald-300 border-emerald-900/40' : 'bg-emerald-50 text-emerald-800 border-emerald-100'}`}>
                  "{stats.advice}"
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SEC: GRADES */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <div className="flex flex-col">
              <h2 className="text-sm font-black uppercase tracking-widest opacity-50 flex items-center gap-2">
                <GraduationCap size={20} /> Tableau des notes
              </h2>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Somme</div>
              <div className="text-sm font-black text-purple-500">{mainSum.toFixed(2)}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className={`p-4 rounded-2xl border ${isSomberMode ? 'bg-white/5 border-white/5' : 'bg-white border-black/5'}`}>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Nouvelle branche..."
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-bold"
                  value={newSubjectName}
                  onChange={(e) => setNewSubjectName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addSubject()}
                />
                <button
                  onClick={addSubject}
                  className={`p-2 rounded-xl ${isSomberMode ? 'bg-white text-black' : 'bg-black text-white'}`}
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            <div className="divide-y divide-black/5 dark:divide-white/5">
              {subjects.map((subject) => (
                <div key={subject.id} className="group py-2">
                  <div className={`p-6 rounded-3xl transition-all ${isSomberMode ? 'hover:bg-white/5' : 'hover:bg-white shadow-sm border border-transparent hover:border-black/5'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <button onClick={() => toggleExpand(subject.id)} className="p-2 opacity-40 hover:opacity-100">
                          {expandedSubjects.has(subject.id) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`font-black text-lg ${subject.isMain ? 'text-emerald-500' : ''} ${subject.name === 'Anglais' ? 'text-white' : ''}`}>{subject.name}</span>
                            {!subject.isMain && (
                              <button onClick={() => removeSubject(subject.id)} className="p-1 opacity-0 group-hover:opacity-40 hover:text-red-500">
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                          {subject.hasLevel && (
                            <div className="flex gap-1.5 mt-2">
                              {[Level.A, Level.B, Level.C].map(l => (
                                <button
                                  key={l}
                                  onClick={() => changeLevel(subject.id, l)}
                                  className={`w-8 h-8 flex items-center justify-center text-[11px] rounded-xl border font-black transition-all ${subject.level === l
                                    ? (isSomberMode ? 'bg-white text-black border-white' : 'bg-[#141414] text-white border-[#141414]')
                                    : (isSomberMode ? 'bg-transparent text-white/40 border-white/10 hover:border-white/30' : 'bg-white text-[#141414]/40 border-[#141414]/10 hover:border-[#141414]/30')
                                    }`}
                                >
                                  {l}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-black ${subject.average >= 4 ? '' : 'text-red-500'}`}>{subject.average || '-'}</div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedSubjects.has(subject.id) && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="pt-4 border-t border-black/5 dark:border-white/5 space-y-4">
                            {subject.components.length > 0 ? (
                              subject.components.map(comp => (
                                <div key={comp.id} className="p-4 rounded-2xl bg-black/5 dark:bg-white/5">
                                  <div className="flex justify-between mb-3 text-[10px] font-black opacity-50 uppercase tracking-widest">
                                    <span>{comp.name}</span>
                                    <span>{comp.average.toFixed(2)}</span>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {comp.grades.map((grade, idx) => (
                                      <button key={idx} onClick={() => parentSettings.allowDeletion && removeGrade(subject.id, comp.id, idx)} className={`w-9 h-9 rounded-xl border font-black text-xs ${grade >= 4 ? 'bg-white text-black' : 'bg-red-500 text-white'}`}>
                                        {grade}
                                      </button>
                                    ))}
                                    <select className="w-10 h-9 rounded-xl border-dashed border font-black text-[10px] bg-transparent text-center" onChange={(e) => { addGrade(subject.id, comp.id, parseFloat(e.target.value)); e.target.value = ''; }} value="">
                                      <option value="">+</option>
                                      {[6, 5.5, 5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1].map(v => <option key={v} value={v}>{v}</option>)}
                                    </select>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="flex flex-wrap gap-2.5">
                                {subject.grades.map((grade, idx) => (
                                  <button key={idx} onClick={() => parentSettings.allowDeletion && removeGrade(subject.id, null, idx)} className={`w-10 h-10 rounded-xl border font-black text-sm ${grade >= 4 ? 'bg-white text-black' : 'bg-red-500 text-white'}`}>
                                    {grade}
                                  </button>
                                ))}
                                <select className="w-11 h-10 rounded-xl border-dashed border font-black text-sm bg-transparent text-center" onChange={(e) => { addGrade(subject.id, null, parseFloat(e.target.value)); e.target.value = ''; }} value="">
                                  <option value="">+</option>
                                  {[6, 5.5, 5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1].map(v => <option key={v} value={v}>{v}</option>)}
                                </select>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEC: BONUS */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 px-1">
            <Gamepad2 className="text-purple-500" size={24} />
            <h2 className="text-sm font-black uppercase tracking-widest opacity-50">Bonus Mode</h2>
          </div>
          <div className={`p-8 rounded-[40px] border relative overflow-hidden ${isSomberMode ? 'bg-white/5 border-white/5' : 'bg-white border-black/5 shadow-2xl shadow-purple-500/10'}`}>
            <div className="relative z-10 flex flex-col items-center text-center space-y-10">
              <div>
                <div className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-2">Crédit de jeu</div>
                <div className={`text-8xl font-black tracking-tighter tabular-nums ${playTime >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                  {playTime} <span className="text-3xl opacity-50">H</span>
                </div>
              </div>
              <div className={`w-full flex items-center justify-between p-6 rounded-[36px] bg-purple-600 text-white shadow-xl ${isTimerActive ? 'scale-105' : 'opacity-50'}`}>
                <button onClick={() => setIsTimerActive(!isTimerActive)} className="w-16 h-16 rounded-full bg-white text-purple-600 flex items-center justify-center shadow-lg">
                  {isTimerActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" />}
                </button>
                <div className="text-right">
                  <div className="text-4xl font-mono font-black">{formatTime(timerSeconds)}</div>
                  <div className="text-[10px] uppercase font-black opacity-70">Minuteur</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEC: CRITERIA */}
        <section className={`p-8 rounded-[40px] border ${isSomberMode ? 'bg-white/5 border-white/5' : 'bg-white border-black/5 shadow-sm'}`}>
          <h4 className="font-black text-sm uppercase tracking-widest flex items-center gap-2 mb-6">
            <Info size={18} className="text-blue-500" /> Critères HarmoS
          </h4>
          <div className="space-y-4 text-xs font-bold leading-relaxed">
            <div className="flex gap-3 text-emerald-600"><CheckCircle2 size={16} /> VP: Min. 2 en A et 1 en B</div>
            <div className="flex gap-3 text-blue-600"><CheckCircle2 size={16} /> Moderne: Min. 2 en B et 1 en C</div>
            <div className="flex gap-3 text-amber-600"><AlertCircle size={16} /> Général: Min. 3 en C</div>
          </div>
        </section>
      </main>

      <footer className="max-w-xl mx-auto py-10 opacity-30 text-center text-[10px] font-black uppercase tracking-widest">
        © 2024 HarmoS Calc — Système Vaudois
      </footer>
    </div>
  );
}

// Parent utility hook for calculation
const useMemoStats = (subjects: Subject[]) => {
  // Utility for counts if needed elsewhere
  let good = 0;
  let bad = 0;
  subjects.forEach(s => {
    s.grades.forEach(g => { if (g >= 5) good++; else if (g < 4) bad++; });
    s.components.forEach(c => {
      c.grades.forEach(g => { if (g >= 5) good++; else if (g < 4) bad++; });
    });
  });
  return { good, bad };
};
