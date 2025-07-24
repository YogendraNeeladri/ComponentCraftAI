'use client';

import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Blocks, LogOut, Plus, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const sessions = [
  { id: 1, name: 'E-commerce Card' },
  { id: 2, name: 'Dashboard Widget' },
  { id: 3, name: 'Login Form' },
];

interface SessionSidebarProps {
  onNewSession: () => void;
}

export default function SessionSidebar({ onNewSession }: SessionSidebarProps) {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-primary" asChild>
            <Link href="/">
              <Blocks className="w-6 h-6" />
            </Link>
          </Button>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">ComponentCraft AI</h2>
            <p className="text-xs text-muted-foreground">Your AI component factory</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <Button className="w-full" onClick={onNewSession}>
            <Plus className="mr-2" />
            New Session
          </Button>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Recent Sessions</SidebarGroupLabel>
          <SidebarMenu>
            {sessions.map((session, index) => (
              <SidebarMenuItem key={session.id}>
                <SidebarMenuButton tooltip={session.name} isActive={index === 0}>
                  <MessageSquare />
                  <span>{session.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarSeparator />

      <SidebarFooter>
        {user ? (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
              <AvatarFallback>{user.displayName?.charAt(0).toUpperCase() ?? 'U'}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{user.displayName}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleSignOut}>
              <LogOut />
            </Button>
          </div>
        ) : (
          <Button asChild>
            <Link href="/login">Log In</Link>
          </Button>
        )}
      </SidebarFooter>
    </>
  );
}
