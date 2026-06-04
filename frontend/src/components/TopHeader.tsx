import { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  Bell,
  CheckCheck,
  CheckCircle2,
  Clock,
  FileText,
  Mail,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Settings as SettingsIcon,
  Shield,
  User,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotifications, type AppNotification } from '../context/NotificationContext';

const getNotificationToneClass = (tone: AppNotification['tone']) => {
  switch (tone) {
    case 'urgent':
      return 'bg-red-50 text-ucc-red border-ucc-red/10';
    case 'warning':
      return 'bg-amber-50 text-amber-700 border-amber-100';
    case 'success':
      return 'bg-green-50 text-green-700 border-green-100';
    default:
      return 'bg-ucc-blue/5 text-ucc-blue border-ucc-blue/10';
  }
};

const getNotificationIcon = (notification: AppNotification) => {
  switch (notification.category) {
    case 'correspondence':
      return <Mail size={16} />;
    case 'document':
      return <FileText size={16} />;
    case 'security':
      return <AlertCircle size={16} />;
    case 'workflow':
      return <Clock size={16} />;
    default:
      return <Shield size={16} />;
  }
};

interface TopHeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export default function TopHeader({ isSidebarOpen, onToggleSidebar }: TopHeaderProps) {
  const { user } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isNotificationsOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!notificationsRef.current?.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isNotificationsOpen]);

  const userInitials = user?.name?.split(' ').map((name) => name[0]).join('');

  return (
    <header className="bg-white/70 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.05)] sticky top-0 z-[80] lg:z-40 border-b border-white/40 px-4 py-3 md:px-6 xl:px-8 2xl:px-10">
      <div className="flex items-center justify-between gap-4 max-w-[1880px] mx-auto">
        <div className="flex items-center gap-3 xl:gap-4 flex-1 min-w-0 max-w-[48rem]">
          <button
            type="button"
            aria-controls="primary-sidebar"
            aria-expanded={isSidebarOpen}
            aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            title={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            onClick={onToggleSidebar}
            className={`h-11 w-11 xl:h-12 xl:w-12 rounded-2xl border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
              isSidebarOpen
                ? 'bg-ucc-blue text-white border-ucc-blue shadow-lg shadow-ucc-blue/20 hover:bg-ucc-blue-dark'
                : 'bg-white/95 text-gray-600 border-gray-200 shadow-sm hover:text-ucc-blue hover:border-ucc-blue/20 hover:bg-ucc-blue/5'
            }`}
          >
            {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
          </button>
          <div className="relative group flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-ucc-blue transition-colors">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search records, letters, departments, or users..."
              className="w-full bg-gray-50/80 border border-gray-200/50 rounded-2xl py-2.5 xl:py-3 pl-11 pr-5 focus:bg-white focus:border-ucc-blue/30 focus:ring-4 focus:ring-ucc-blue/5 transition-all outline-none text-sm xl:text-[15px] shadow-inner"
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-[10px] font-bold text-gray-400 bg-white border border-gray-200 rounded-lg">
                Ctrl K
              </kbd>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 xl:gap-3 ml-2 md:ml-4 xl:ml-8">
          <div className="flex items-center gap-1 xl:gap-2 mr-1 xl:mr-4">
            <div className="hidden md:block h-8 w-[1px] bg-gray-200 mx-2"></div>
            <div className="relative" ref={notificationsRef}>
              <button
                type="button"
                onClick={() => setIsNotificationsOpen((current) => !current)}
                aria-label="Open notifications"
                aria-expanded={isNotificationsOpen}
                className={`p-2.5 rounded-xl transition-all relative ${
                  isNotificationsOpen
                    ? 'text-ucc-blue bg-ucc-blue/10'
                    : 'text-gray-500 hover:text-ucc-blue hover:bg-ucc-blue/5'
                }`}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-ucc-red text-white text-[10px] font-black rounded-full border-2 border-white flex items-center justify-center shadow-lg shadow-ucc-red/20">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute top-full right-0 mt-3 w-[min(22rem,calc(100vw-2rem))] bg-white shadow-2xl border border-gray-100 rounded-2xl overflow-hidden z-50 animate-slide-in-right">
                  <div className="p-4 border-b border-gray-100 bg-gray-50/80 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-black text-gray-900 tracking-tight">Notifications</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                        {unreadCount} unread item{unreadCount === 1 ? '' : 's'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={markAllAsRead}
                      disabled={unreadCount === 0}
                      className="p-2 rounded-xl text-gray-400 hover:text-ucc-blue hover:bg-white disabled:opacity-40 disabled:hover:text-gray-400 disabled:hover:bg-transparent transition-all"
                      title="Mark all as read"
                    >
                      <CheckCheck size={18} />
                    </button>
                  </div>

                  <div className="max-h-[22rem] overflow-y-auto custom-scrollbar divide-y divide-gray-100">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <Link
                          key={notification.id}
                          to={notification.route}
                          onClick={() => {
                            markAsRead(notification.id);
                            setIsNotificationsOpen(false);
                          }}
                          className={`flex gap-3 p-4 hover:bg-gray-50 transition-colors ${
                            notification.read ? 'bg-white' : 'bg-ucc-blue/[0.03]'
                          }`}
                        >
                          <span className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${getNotificationToneClass(notification.tone)}`}>
                            {getNotificationIcon(notification)}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-start justify-between gap-3">
                              <span className="text-sm font-bold text-gray-900 leading-snug">
                                {notification.title}
                              </span>
                              {!notification.read && (
                                <span className="w-2 h-2 rounded-full bg-ucc-blue mt-1.5 flex-shrink-0"></span>
                              )}
                            </span>
                            <span className="block text-xs text-gray-500 mt-1 leading-relaxed">
                              {notification.body}
                            </span>
                            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">
                              {notification.createdAt}
                            </span>
                          </span>
                        </Link>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <CheckCircle2 size={34} className="mx-auto text-green-500 mb-3" />
                        <p className="text-sm font-bold text-gray-900">All clear</p>
                        <p className="text-xs text-gray-500 mt-1">No notifications for this account.</p>
                      </div>
                    )}
                  </div>

                  <div className="p-3 bg-gray-50/80 border-t border-gray-100">
                    <Link
                      to="/settings"
                      onClick={() => setIsNotificationsOpen(false)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-ucc-blue hover:border-ucc-blue/20 transition-all"
                    >
                      <SettingsIcon size={14} /> Notification Settings
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link
              to="/settings"
              className="p-2.5 text-gray-500 hover:text-ucc-blue hover:bg-ucc-blue/5 rounded-xl transition-all"
            >
              <User size={20} />
            </Link>
          </div>

          <div className="flex items-center gap-3 xl:gap-4 pl-3 xl:pl-6 border-l border-gray-100">
            <div className="hidden text-right xl:block">
              <p className="text-sm xl:text-[15px] font-black text-gray-900 leading-tight tracking-tight">
                {user?.name}
              </p>
              <div className="flex items-center justify-end gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ucc-blue animate-pulse-soft"></span>
                <p className="text-[10px] font-bold text-ucc-blue/60 uppercase tracking-widest">
                  {user?.role}
                </p>
              </div>
            </div>
            <Link to="/settings" className="relative">
              <div className="w-11 h-11 xl:w-12 xl:h-12 rounded-2xl bg-gradient-to-tr from-ucc-blue to-ucc-blue/80 flex items-center justify-center text-white shadow-lg shadow-ucc-blue/20 ring-2 ring-white overflow-hidden group cursor-pointer hover:scale-105 transition-transform">
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="text-sm font-bold">
                  {userInitials}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
