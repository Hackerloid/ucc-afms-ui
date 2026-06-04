/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth, type UserRole } from './AuthContext';

export type NotificationCategory = 'correspondence' | 'document' | 'security' | 'system' | 'workflow';
export type NotificationTone = 'info' | 'success' | 'warning' | 'urgent';

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  category: NotificationCategory;
  tone: NotificationTone;
  createdAt: string;
  route: string;
  read: boolean;
}

type NotificationSeed = Omit<AppNotification, 'read'> & {
  audience: UserRole[] | 'all';
};

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const notificationSeeds: NotificationSeed[] = [
  {
    id: 'system-maintenance-window',
    title: 'Maintenance window approved',
    body: 'System backup and cache optimization are queued for 02:00 GMT.',
    category: 'system',
    tone: 'warning',
    createdAt: '10 min ago',
    route: '/settings',
    audience: ['Super Admin'],
  },
  {
    id: 'security-review-required',
    title: 'Security policy review due',
    body: 'Password expiry and 2FA settings need confirmation this week.',
    category: 'security',
    tone: 'urgent',
    createdAt: '25 min ago',
    route: '/settings',
    audience: ['Super Admin'],
  },
  {
    id: 'workflow-vc-approval',
    title: 'Workflow awaiting final approval',
    body: 'Network Infrastructure Upgrade Proposal is at the final review step.',
    category: 'workflow',
    tone: 'info',
    createdAt: '1 hr ago',
    route: '/workflows',
    audience: ['Super Admin', 'Department Head'],
  },
  {
    id: 'letter-academic-affairs',
    title: 'New letter from Academic Affairs',
    body: 'Updated curriculum guidelines were received by the registry desk.',
    category: 'correspondence',
    tone: 'info',
    createdAt: '2 hrs ago',
    route: '/correspondence',
    audience: 'all',
  },
  {
    id: 'document-uploaded',
    title: 'Document registration completed',
    body: 'Q1 Financial Report was indexed with OCR and repository tags.',
    category: 'document',
    tone: 'success',
    createdAt: 'Today',
    route: '/documents',
    audience: ['Super Admin', 'Department Head', 'Records Clerk'],
  },
];

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const getStorageKey = (email: string) => `dms_notifications_read_${email}`;

const loadReadIds = (email: string) => {
  const savedReadIds = localStorage.getItem(getStorageKey(email));
  if (!savedReadIds) return [];

  try {
    const parsedReadIds = JSON.parse(savedReadIds);
    return Array.isArray(parsedReadIds) ? parsedReadIds : [];
  } catch {
    return [];
  }
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [readIdsByUser, setReadIdsByUser] = useState<Record<string, string[]>>({});
  const currentEmail = user?.email;

  const readIds = useMemo(
    () => (currentEmail ? readIdsByUser[currentEmail] ?? loadReadIds(currentEmail) : []),
    [currentEmail, readIdsByUser],
  );

  useEffect(() => {
    if (!currentEmail) return;
    localStorage.setItem(getStorageKey(currentEmail), JSON.stringify(readIds));
  }, [currentEmail, readIds]);

  const notifications = useMemo<AppNotification[]>(() => {
    if (!user) return [];

    return notificationSeeds
      .filter((notification) => (
        notification.audience === 'all' || notification.audience.includes(user.role)
      ))
      .map((notification) => ({
        id: notification.id,
        title: notification.title,
        body: notification.body,
        category: notification.category,
        tone: notification.tone,
        createdAt: notification.createdAt,
        route: notification.route,
        read: readIds.includes(notification.id),
      }));
  }, [readIds, user]);

  const unreadCount = notifications.filter((notification) => !notification.read).length;

  const markAsRead = useCallback((id: string) => {
    if (!currentEmail) return;

    setReadIdsByUser((currentReadIdsByUser) => {
      const currentReadIds = currentReadIdsByUser[currentEmail] ?? loadReadIds(currentEmail);
      if (currentReadIds.includes(id)) return currentReadIdsByUser;

      return {
        ...currentReadIdsByUser,
        [currentEmail]: [...currentReadIds, id],
      };
    });
  }, [currentEmail]);

  const markAllAsRead = useCallback(() => {
    if (!currentEmail) return;

    setReadIdsByUser((currentReadIdsByUser) => {
      const currentReadIds = currentReadIdsByUser[currentEmail] ?? loadReadIds(currentEmail);
      const nextReadIds = new Set(currentReadIds);
      notifications.forEach((notification) => nextReadIds.add(notification.id));

      return {
        ...currentReadIdsByUser,
        [currentEmail]: Array.from(nextReadIds),
      };
    });
  }, [currentEmail, notifications]);

  const contextValue = useMemo(
    () => ({ notifications, unreadCount, markAsRead, markAllAsRead }),
    [markAllAsRead, markAsRead, notifications, unreadCount],
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
