import { useMemo, useState, type ReactNode } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  Bell,
  BellOff,
  Calendar,
  CheckCircle2,
  Clock,
  Database,
  Eye,
  FileText,
  GitBranch,
  Globe,
  Mail,
  Palette,
  Save,
  Settings as SettingsIcon,
  Shield,
  Upload,
  Users,
  XCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

type SettingsSection = 'general' | 'security' | 'notifications' | 'branding' | 'backup';
type SaveState = 'idle' | 'saved';

interface SystemSettingsState {
  systemName: string;
  organizationName: string;
  supportEmail: string;
  recordsPrefix: string;
  dateFormat: string;
  timezone: string;
  maxFileSize: string;
  allowedFormats: string;
  retentionYears: string;
  enableOCR: boolean;
  externalPortal: boolean;
  maintenanceMode: boolean;
  require2FA: boolean;
  sessionTimeout: string;
  passwordExpiry: string;
  minPasswordLength: string;
  maxLoginAttempts: string;
  auditExports: boolean;
  emailNotifications: boolean;
  inAppNotifications: boolean;
  workflowAlerts: boolean;
  documentAlerts: boolean;
  deadlineReminders: boolean;
  securityAlerts: boolean;
  digestCadence: string;
  smtpHost: string;
  smtpPort: string;
  senderName: string;
  escalationEmail: string;
  themeMode: string;
  logoLockup: string;
  publicHeader: boolean;
  backupFrequency: string;
  backupTime: string;
  backupLocation: string;
  backupRetention: string;
  autoRecovery: boolean;
}

interface SectionConfig {
  id: SettingsSection;
  label: string;
  icon: ReactNode;
  superAdminOnly?: boolean;
}

const defaultSettings: SystemSettingsState = {
  systemName: 'UCC Document Management System',
  organizationName: 'University of Cape Coast',
  supportEmail: 'support@ucc.edu.gh',
  recordsPrefix: 'UCC',
  dateFormat: 'DD/MM/YYYY',
  timezone: 'GMT (UTC+0)',
  maxFileSize: '50',
  allowedFormats: 'pdf, doc, docx, xls, xlsx, ppt, pptx, txt, jpg, png',
  retentionYears: '7',
  enableOCR: true,
  externalPortal: false,
  maintenanceMode: false,
  require2FA: true,
  sessionTimeout: '30',
  passwordExpiry: '90',
  minPasswordLength: '10',
  maxLoginAttempts: '5',
  auditExports: true,
  emailNotifications: true,
  inAppNotifications: true,
  workflowAlerts: true,
  documentAlerts: true,
  deadlineReminders: true,
  securityAlerts: true,
  digestCadence: 'Daily digest at 07:30',
  smtpHost: 'smtp.ucc.edu.gh',
  smtpPort: '587',
  senderName: 'UCC DMS Registry',
  escalationEmail: 'dms-admin@ucc.edu.gh',
  themeMode: 'Institutional Blue',
  logoLockup: 'UDMS + UCC Crest',
  publicHeader: true,
  backupFrequency: 'Daily',
  backupTime: '02:00',
  backupLocation: '/backups/ucc-dms',
  backupRetention: '30',
  autoRecovery: true,
};

const sections: SectionConfig[] = [
  { id: 'general', label: 'System', icon: <SettingsIcon size={18} />, superAdminOnly: true },
  { id: 'security', label: 'Security & Access', icon: <Shield size={18} />, superAdminOnly: true },
  { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
  { id: 'branding', label: 'Branding', icon: <Palette size={18} />, superAdminOnly: true },
  { id: 'backup', label: 'Backup', icon: <Database size={18} />, superAdminOnly: true },
];

const inputClass = 'w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-4 focus:ring-ucc-blue/10 focus:border-ucc-blue block px-4 py-3 outline-none transition-all text-sm font-semibold disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed';
const labelClass = 'block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2';

const getInitialSettings = () => {
  if (typeof window === 'undefined') return defaultSettings;

  let initialSettings = defaultSettings;
  const savedSettings = localStorage.getItem('dms_system_settings');
  if (savedSettings) {
    try {
      const parsedSettings = JSON.parse(savedSettings) as Partial<SystemSettingsState>;
      initialSettings = { ...initialSettings, ...parsedSettings };
    } catch {
      initialSettings = defaultSettings;
    }
  }

  try {
    const savedUser = localStorage.getItem('dms_user');
    if (!savedUser) return initialSettings;

    const parsedUser = JSON.parse(savedUser) as { email?: string; role?: string };
    if (!parsedUser.email || parsedUser.role === 'Super Admin') return initialSettings;

    const savedNotificationSettings = localStorage.getItem(`dms_notification_settings_${parsedUser.email}`);
    if (!savedNotificationSettings) return initialSettings;

    const parsedNotificationSettings = JSON.parse(savedNotificationSettings) as Partial<SystemSettingsState>;
    return { ...initialSettings, ...parsedNotificationSettings };
  } catch {
    return initialSettings;
  }
};

export default function Settings() {
  const { user } = useAuth();
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const [activeSection, setActiveSection] = useState<SettingsSection>('general');
  const [settings, setSettings] = useState<SystemSettingsState>(() => getInitialSettings());
  const [saveState, setSaveState] = useState<SaveState>('idle');

  const isSuperAdmin = user?.role === 'Super Admin';

  const availableSections = useMemo(
    () => sections.filter((section) => isSuperAdmin || !section.superAdminOnly),
    [isSuperAdmin],
  );

  const visibleSection = availableSections.some((section) => section.id === activeSection)
    ? activeSection
    : availableSections[0].id;

  const updateSetting = <K extends keyof SystemSettingsState,>(
    key: K,
    value: SystemSettingsState[K],
  ) => {
    setSettings((currentSettings) => ({ ...currentSettings, [key]: value }));
  };

  const saveSettings = () => {
    const storageKey = isSuperAdmin
      ? 'dms_system_settings'
      : `dms_notification_settings_${user?.email ?? 'guest'}`;

    localStorage.setItem(storageKey, JSON.stringify(settings));
    setSaveState('saved');
    window.setTimeout(() => setSaveState('idle'), 2400);
  };

  return (
    <div className="workspace-page">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2 py-1 rounded bg-ucc-blue/5 text-ucc-blue text-[10px] font-black uppercase tracking-widest border border-ucc-blue/10">
              {isSuperAdmin ? 'Super Admin Console' : 'User Preferences'}
            </span>
            <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest border ${
              isSuperAdmin
                ? 'bg-green-50 text-green-700 border-green-100'
                : 'bg-amber-50 text-amber-700 border-amber-100'
            }`}>
              {isSuperAdmin ? 'Global Access' : 'Limited Access'}
            </span>
          </div>
          <h1 className="workspace-title">
            System <span className="text-ucc-blue">Settings</span>
          </h1>
          <p className="workspace-subtitle max-w-3xl">
            {isSuperAdmin
              ? 'Control institution-wide records policy, security, notification delivery, branding, and recovery operations.'
              : 'Manage notification delivery and account-level preferences for your signed-in role.'}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="px-4 py-2.5 bg-white border border-gray-200 rounded-2xl shadow-sm flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-ucc-blue/5 text-ucc-blue flex items-center justify-center">
              <Bell size={18} />
            </span>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Unread</p>
              <p className="text-sm font-black text-gray-900">{unreadCount} notifications</p>
            </div>
          </div>
          <button
            type="button"
            onClick={saveSettings}
            className="px-6 py-2.5 bg-ucc-blue hover:bg-black text-white rounded-2xl shadow-xl shadow-ucc-blue/20 transition-all hover:-translate-y-1 font-bold text-xs uppercase tracking-widest flex items-center gap-2"
          >
            {saveState === 'saved' ? <CheckCircle2 size={16} /> : <Save size={16} />}
            {saveState === 'saved' ? 'Saved' : 'Save Changes'}
          </button>
        </div>
      </div>

      {!isSuperAdmin && (
        <div className="glass-panel p-5 border-l-4 border-l-amber-400 flex items-start gap-4">
          <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={20} />
          </div>
          <div>
            <h2 className="text-sm font-black text-gray-900">System controls require Super Admin access</h2>
            <p className="text-sm text-gray-500 mt-1 max-w-3xl">
              Your current role can update notification preferences. Global security, backup, branding, and policy settings stay locked to Super Admin users.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-[280px,minmax(0,1fr)] 2xl:grid-cols-[320px,minmax(0,1fr)] gap-6 xl:gap-8">
        <nav className="flex xl:flex-col gap-2 overflow-x-auto xl:overflow-visible pb-2 xl:pb-0">
          {availableSections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm w-full transition-all whitespace-nowrap border ${
                visibleSection === section.id
                  ? 'bg-white text-ucc-blue shadow-sm border-ucc-blue/20'
                  : 'text-gray-600 hover:bg-white/70 hover:text-gray-900 border-transparent'
              }`}
            >
              {section.icon}
              {section.label}
            </button>
          ))}
        </nav>

        <div className="min-w-0 space-y-6">
          {visibleSection === 'general' && (
            <GeneralSettings settings={settings} updateSetting={updateSetting} />
          )}
          {visibleSection === 'security' && (
            <SecuritySettings settings={settings} updateSetting={updateSetting} />
          )}
          {visibleSection === 'notifications' && (
            <NotificationSettings
              isSuperAdmin={isSuperAdmin}
              notifications={notifications}
              unreadCount={unreadCount}
              settings={settings}
              markAllAsRead={markAllAsRead}
              updateSetting={updateSetting}
            />
          )}
          {visibleSection === 'branding' && (
            <BrandingSettings settings={settings} updateSetting={updateSetting} />
          )}
          {visibleSection === 'backup' && (
            <BackupSettings settings={settings} updateSetting={updateSetting} />
          )}
        </div>
      </div>
    </div>
  );
}

interface SettingsPanelProps {
  settings: SystemSettingsState;
  updateSetting: <K extends keyof SystemSettingsState>(
    key: K,
    value: SystemSettingsState[K],
  ) => void;
}

interface NotificationSettingsProps extends SettingsPanelProps {
  isSuperAdmin: boolean;
  notifications: ReturnType<typeof useNotifications>['notifications'];
  unreadCount: number;
  markAllAsRead: () => void;
}

interface FieldProps {
  label: string;
  children: ReactNode;
}

interface ToggleRowProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

interface SettingStatProps {
  title: string;
  value: string;
  icon: ReactNode;
  colorClass: string;
}

function GeneralSettings({ settings, updateSetting }: SettingsPanelProps) {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4">
        <SettingStat title="System Version" value="2.4.1" icon={<SettingsIcon size={20} />} colorClass="text-ucc-blue bg-ucc-blue/5 border-ucc-blue/10" />
        <SettingStat title="Database" value="Online" icon={<Database size={20} />} colorClass="text-green-700 bg-green-50 border-green-100" />
        <SettingStat title="Active Users" value="156" icon={<Users size={20} />} colorClass="text-amber-700 bg-amber-50 border-amber-100" />
        <SettingStat title="Storage" value="45.2 GB" icon={<Upload size={20} />} colorClass="text-purple-700 bg-purple-50 border-purple-100" />
      </div>

      <section className="glass-panel p-6 xl:p-8">
        <SectionHeading icon={<SettingsIcon size={20} />} title="System Configuration" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="System Name">
            <input className={inputClass} value={settings.systemName} onChange={(event) => updateSetting('systemName', event.target.value)} />
          </Field>
          <Field label="Organization Name">
            <input className={inputClass} value={settings.organizationName} onChange={(event) => updateSetting('organizationName', event.target.value)} />
          </Field>
          <Field label="Support Email">
            <input type="email" className={inputClass} value={settings.supportEmail} onChange={(event) => updateSetting('supportEmail', event.target.value)} />
          </Field>
          <Field label="Records Prefix">
            <input className={inputClass} value={settings.recordsPrefix} onChange={(event) => updateSetting('recordsPrefix', event.target.value)} />
          </Field>
          <Field label="Date Format">
            <select className={inputClass} value={settings.dateFormat} onChange={(event) => updateSetting('dateFormat', event.target.value)}>
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </Field>
          <Field label="Timezone">
            <select className={inputClass} value={settings.timezone} onChange={(event) => updateSetting('timezone', event.target.value)}>
              <option>GMT (UTC+0)</option>
              <option>CET (UTC+1)</option>
              <option>EST (UTC-5)</option>
            </select>
          </Field>
        </div>
      </section>

      <section className="glass-panel p-6 xl:p-8">
        <SectionHeading icon={<FileText size={20} />} title="Records Policy" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <Field label="Max File Size (MB)">
            <input type="number" min="1" className={inputClass} value={settings.maxFileSize} onChange={(event) => updateSetting('maxFileSize', event.target.value)} />
          </Field>
          <Field label="Retention Years">
            <input type="number" min="1" className={inputClass} value={settings.retentionYears} onChange={(event) => updateSetting('retentionYears', event.target.value)} />
          </Field>
          <Field label="Allowed Formats">
            <input className={inputClass} value={settings.allowedFormats} onChange={(event) => updateSetting('allowedFormats', event.target.value)} />
          </Field>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <ToggleRow title="Enable OCR" description="Index scanned records during registration." checked={settings.enableOCR} onChange={(checked) => updateSetting('enableOCR', checked)} />
          <ToggleRow title="External Intake Portal" description="Accept documents from approved external senders." checked={settings.externalPortal} onChange={(checked) => updateSetting('externalPortal', checked)} />
          <ToggleRow title="Maintenance Mode" description="Pause non-admin access during planned work." checked={settings.maintenanceMode} onChange={(checked) => updateSetting('maintenanceMode', checked)} />
        </div>
      </section>
    </div>
  );
}

function SecuritySettings({ settings, updateSetting }: SettingsPanelProps) {
  const roleRows = [
    { role: 'Super Admin', access: 'All modules, policy, backup, audit', count: '1' },
    { role: 'Department Head', access: 'Department workflows, reports, templates', count: '18' },
    { role: 'Records Clerk', access: 'Registry, letters, workflow intake', count: '42' },
    { role: 'Viewer', access: 'Read-only repository access', count: '95' },
  ];

  return (
    <div className="space-y-6 animate-slide-up">
      <section className="glass-panel p-6 xl:p-8">
        <SectionHeading icon={<Shield size={20} />} title="Authentication Policy" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <Field label="Session Timeout (minutes)">
            <input type="number" min="5" className={inputClass} value={settings.sessionTimeout} onChange={(event) => updateSetting('sessionTimeout', event.target.value)} />
          </Field>
          <Field label="Password Expiry (days)">
            <input type="number" min="1" className={inputClass} value={settings.passwordExpiry} onChange={(event) => updateSetting('passwordExpiry', event.target.value)} />
          </Field>
          <Field label="Minimum Password Length">
            <input type="number" min="8" className={inputClass} value={settings.minPasswordLength} onChange={(event) => updateSetting('minPasswordLength', event.target.value)} />
          </Field>
          <Field label="Maximum Login Attempts">
            <input type="number" min="1" className={inputClass} value={settings.maxLoginAttempts} onChange={(event) => updateSetting('maxLoginAttempts', event.target.value)} />
          </Field>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ToggleRow title="Require Two-Factor Authentication" description="Apply 2FA to privileged and department accounts." checked={settings.require2FA} onChange={(checked) => updateSetting('require2FA', checked)} />
          <ToggleRow title="Audit Data Exports" description="Record every report and repository export." checked={settings.auditExports} onChange={(checked) => updateSetting('auditExports', checked)} />
        </div>
      </section>

      <section className="glass-panel overflow-hidden">
        <div className="p-6 xl:p-8 pb-4">
          <SectionHeading icon={<Users size={20} />} title="Role Access Matrix" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/70 border-y border-gray-100">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Role</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Access</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Users</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {roleRows.map((row) => (
                <tr key={row.role} className="hover:bg-white transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{row.role}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{row.access}</td>
                  <td className="px-6 py-4 text-right font-black text-ucc-blue">{row.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function NotificationSettings({
  isSuperAdmin,
  notifications,
  unreadCount,
  settings,
  markAllAsRead,
  updateSetting,
}: NotificationSettingsProps) {
  return (
    <div className="space-y-6 animate-slide-up">
      <section className="glass-panel p-6 xl:p-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <SectionHeading icon={<Bell size={20} />} title="Notification Center" />
          <button
            type="button"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-all shadow-sm font-bold text-xs uppercase tracking-widest disabled:opacity-50"
          >
            Mark All Read
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr),320px] gap-6">
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className={`p-4 rounded-2xl border flex gap-4 ${notification.read ? 'bg-white border-gray-100' : 'bg-ucc-blue/[0.03] border-ucc-blue/10'}`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  notification.tone === 'urgent'
                    ? 'bg-red-50 text-ucc-red'
                    : notification.tone === 'warning'
                      ? 'bg-amber-50 text-amber-700'
                      : notification.tone === 'success'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-ucc-blue/5 text-ucc-blue'
                }`}>
                  {notification.tone === 'success' ? <CheckCircle2 size={18} /> : notification.tone === 'urgent' ? <AlertCircle size={18} /> : <Bell size={18} />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-black text-gray-900 leading-snug">{notification.title}</h3>
                    {!notification.read && <span className="w-2 h-2 rounded-full bg-ucc-blue mt-1.5 flex-shrink-0"></span>}
                  </div>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">{notification.body}</p>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">{notification.createdAt}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-ucc-blue text-white shadow-lg shadow-ucc-blue/20">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Current Inbox</p>
              <p className="text-4xl font-black mt-2">{unreadCount}</p>
              <p className="text-sm text-white/70 mt-1">Unread notifications</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Delivery Status</p>
              <div className="mt-4 space-y-3">
                <StatusLine icon={<Mail size={15} />} label="Email" active={settings.emailNotifications} />
                <StatusLine icon={<Bell size={15} />} label="In-app" active={settings.inAppNotifications} />
                <StatusLine icon={<Clock size={15} />} label="Digest" active={settings.digestCadence !== 'Disabled'} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="glass-panel p-6 xl:p-8">
        <SectionHeading icon={<Mail size={20} />} title="Delivery Channels" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <ToggleRow title="Email Notifications" description="Send event notices through configured SMTP." checked={settings.emailNotifications} onChange={(checked) => updateSetting('emailNotifications', checked)} />
          <ToggleRow title="In-App Notifications" description="Show badge alerts in the application header." checked={settings.inAppNotifications} onChange={(checked) => updateSetting('inAppNotifications', checked)} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Digest Cadence">
            <select className={inputClass} value={settings.digestCadence} onChange={(event) => updateSetting('digestCadence', event.target.value)}>
              <option>Daily digest at 07:30</option>
              <option>Weekly digest on Monday</option>
              <option>Immediate only</option>
              <option>Disabled</option>
            </select>
          </Field>
          <Field label="Escalation Email">
            <input type="email" className={inputClass} value={settings.escalationEmail} onChange={(event) => updateSetting('escalationEmail', event.target.value)} disabled={!isSuperAdmin} />
          </Field>
          <Field label="SMTP Host">
            <input className={inputClass} value={settings.smtpHost} onChange={(event) => updateSetting('smtpHost', event.target.value)} disabled={!isSuperAdmin} />
          </Field>
          <Field label="SMTP Port">
            <input className={inputClass} value={settings.smtpPort} onChange={(event) => updateSetting('smtpPort', event.target.value)} disabled={!isSuperAdmin} />
          </Field>
          <Field label="Sender Name">
            <input className={inputClass} value={settings.senderName} onChange={(event) => updateSetting('senderName', event.target.value)} disabled={!isSuperAdmin} />
          </Field>
        </div>
      </section>

      <section className="glass-panel p-6 xl:p-8">
        <SectionHeading icon={<BellOff size={20} />} title="Event Rules" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ToggleRow title="Document Activity" description="Notify on uploads, registration, OCR, and archive changes." checked={settings.documentAlerts} onChange={(checked) => updateSetting('documentAlerts', checked)} />
          <ToggleRow title="Workflow Status Changes" description="Notify approvers when records move between steps." checked={settings.workflowAlerts} onChange={(checked) => updateSetting('workflowAlerts', checked)} />
          <ToggleRow title="Deadline Reminders" description="Send alerts before SLA or routing deadlines expire." checked={settings.deadlineReminders} onChange={(checked) => updateSetting('deadlineReminders', checked)} />
          <ToggleRow title="Security Alerts" description="Notify Super Admins about lockouts and policy changes." checked={settings.securityAlerts} onChange={(checked) => updateSetting('securityAlerts', checked)} disabled={!isSuperAdmin} />
        </div>
      </section>
    </div>
  );
}

function BrandingSettings({ settings, updateSetting }: SettingsPanelProps) {
  return (
    <div className="space-y-6 animate-slide-up">
      <section className="glass-panel p-6 xl:p-8">
        <SectionHeading icon={<Palette size={20} />} title="Institutional Branding" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <Field label="Theme">
            <select className={inputClass} value={settings.themeMode} onChange={(event) => updateSetting('themeMode', event.target.value)}>
              <option>Institutional Blue</option>
              <option>High Contrast</option>
              <option>Registry Neutral</option>
            </select>
          </Field>
          <Field label="Logo Lockup">
            <select className={inputClass} value={settings.logoLockup} onChange={(event) => updateSetting('logoLockup', event.target.value)}>
              <option>UDMS + UCC Crest</option>
              <option>UCC Crest Only</option>
              <option>UDMS Wordmark</option>
            </select>
          </Field>
        </div>
        <ToggleRow title="Public Header Branding" description="Use institutional identity on external intake and print views." checked={settings.publicHeader} onChange={(checked) => updateSetting('publicHeader', checked)} />
      </section>

      <section className="glass-panel p-6 xl:p-8">
        <SectionHeading icon={<Eye size={20} />} title="Preview" />
        <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white">
          <div className="p-5 bg-ucc-blue text-white flex items-center gap-4">
            <img src="/ucc-logo.png" alt="UCC Logo" className="w-12 h-12 bg-white rounded-xl p-1 object-contain" />
            <div>
              <p className="text-lg font-black tracking-tight">{settings.systemName}</p>
              <p className="text-xs text-white/60 font-bold uppercase tracking-widest">{settings.organizationName}</p>
            </div>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatusLine icon={<Globe size={15} />} label={settings.themeMode} active />
            <StatusLine icon={<FileText size={15} />} label={settings.logoLockup} active />
            <StatusLine icon={<Eye size={15} />} label="Public views" active={settings.publicHeader} />
          </div>
        </div>
      </section>
    </div>
  );
}

function BackupSettings({ settings, updateSetting }: SettingsPanelProps) {
  return (
    <div className="space-y-6 animate-slide-up">
      <section className="glass-panel p-6 xl:p-8">
        <SectionHeading icon={<Database size={20} />} title="Backup & Recovery" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <Field label="Backup Frequency">
            <select className={inputClass} value={settings.backupFrequency} onChange={(event) => updateSetting('backupFrequency', event.target.value)}>
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </Field>
          <Field label="Backup Time">
            <input type="time" className={inputClass} value={settings.backupTime} onChange={(event) => updateSetting('backupTime', event.target.value)} />
          </Field>
          <Field label="Backup Location">
            <input className={inputClass} value={settings.backupLocation} onChange={(event) => updateSetting('backupLocation', event.target.value)} />
          </Field>
          <Field label="Retention Period (days)">
            <input type="number" min="1" className={inputClass} value={settings.backupRetention} onChange={(event) => updateSetting('backupRetention', event.target.value)} />
          </Field>
        </div>
        <ToggleRow title="Auto Recovery" description="Restore from the latest healthy backup after critical failure." checked={settings.autoRecovery} onChange={(checked) => updateSetting('autoRecovery', checked)} />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ActionPanel icon={<Database size={20} />} title="Create Backup" tone="blue" />
        <ActionPanel icon={<Calendar size={20} />} title="Schedule Check" tone="green" />
        <ActionPanel icon={<XCircle size={20} />} title="Restore Point" tone="red" />
      </div>

      <section className="glass-panel overflow-hidden">
        <div className="p-6 xl:p-8 pb-4">
          <SectionHeading icon={<Clock size={20} />} title="Recent Backup Runs" />
        </div>
        <div className="divide-y divide-gray-100">
          {[
            ['2026-05-16 02:00', 'Completed', 'Full repository snapshot'],
            ['2026-05-15 02:00', 'Completed', 'Incremental records backup'],
            ['2026-05-14 02:00', 'Completed', 'Database and attachments'],
          ].map(([time, status, scope]) => (
            <div key={time} className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-white transition-colors">
              <div>
                <p className="text-sm font-black text-gray-900">{scope}</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{time}</p>
              </div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-widest border border-green-100">
                <CheckCircle2 size={13} /> {status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }: FieldProps) {
  return (
    <label className="block min-w-0">
      <span className={labelClass}>{label}</span>
      {children}
    </label>
  );
}

function SectionHeading({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
      <span className="w-10 h-10 rounded-xl bg-ucc-blue/5 text-ucc-blue flex items-center justify-center">
        {icon}
      </span>
      <h2 className="text-lg font-black text-gray-900 tracking-tight">{title}</h2>
    </div>
  );
}

function ToggleRow({ title, description, checked, onChange, disabled = false }: ToggleRowProps) {
  return (
    <label className={`flex items-center justify-between gap-4 p-4 rounded-2xl border transition-colors ${
      disabled
        ? 'bg-gray-50 border-gray-100 opacity-60'
        : 'bg-white/70 border-gray-100 hover:border-ucc-blue/20 cursor-pointer'
    }`}>
      <span className="min-w-0">
        <span className="block text-sm font-black text-gray-900 leading-tight">{title}</span>
        <span className="block text-xs text-gray-500 mt-1 leading-relaxed">{description}</span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        className="sr-only"
      />
      <span className={`relative w-12 h-7 rounded-full flex-shrink-0 transition-colors ${checked ? 'bg-ucc-blue' : 'bg-gray-300'}`}>
        <span className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`}></span>
      </span>
    </label>
  );
}

function SettingStat({ title, value, icon, colorClass }: SettingStatProps) {
  return (
    <div className="glass-card p-5 hover:scale-[1.01]">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${colorClass}`}>
          {icon}
        </div>
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{title}</p>
          <p className="text-xl font-black text-gray-900 tracking-tight">{value}</p>
        </div>
      </div>
    </div>
  );
}

function StatusLine({ icon, label, active }: { icon: ReactNode; label: string; active: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-2 min-w-0 text-sm font-bold text-gray-600">
        <span className="text-ucc-blue flex-shrink-0">{icon}</span>
        <span className="truncate">{label}</span>
      </span>
      <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${active ? 'bg-green-500' : 'bg-gray-300'}`}></span>
    </div>
  );
}

function ActionPanel({ icon, title, tone }: { icon: ReactNode; title: string; tone: 'blue' | 'green' | 'red' }) {
  const toneClass = tone === 'blue'
    ? 'text-ucc-blue bg-ucc-blue/5 border-ucc-blue/10'
    : tone === 'green'
      ? 'text-green-700 bg-green-50 border-green-100'
      : 'text-ucc-red bg-red-50 border-red-100';

  return (
    <button
      type="button"
      className="glass-card p-5 flex items-center justify-between gap-4 text-left hover:bg-white"
    >
      <span className="flex items-center gap-4 min-w-0">
        <span className={`w-12 h-12 rounded-2xl border flex items-center justify-center flex-shrink-0 ${toneClass}`}>
          {icon}
        </span>
        <span>
          <span className="block text-sm font-black text-gray-900">{title}</span>
          <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Super Admin Action</span>
        </span>
      </span>
      <GitBranch size={18} className="text-gray-300 flex-shrink-0" />
    </button>
  );
}
