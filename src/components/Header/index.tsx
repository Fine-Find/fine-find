import { useRouter } from 'next/router';

import { useAuth } from '../../hooks/useAuth';
import styles from './Header.module.scss';

export interface HeaderProps {
  title?: string;
}

export default function Header({ title = 'The FineFind' }: HeaderProps) {
  const router = useRouter();
  const auth = useAuth();

  const button =
    auth && !auth.user ? (
      <button slot="end" onClick={() => router.push('/login')}>
        Sign In
      </button>
    ) : (
      <button slot="end" onClick={() => router.push('/login')}>
        Sign Out
      </button>
    );

  return (
    <ion-header>
      <ion-toolbar class={styles.container}>
        <ion-menu-toggle slot="start" class={styles.menuToggle}>
          <ion-icon name="menu"></ion-icon>
        </ion-menu-toggle>
        <ion-title>{title}</ion-title>
        <span slot="end">{button}</span>
      </ion-toolbar>
    </ion-header>
  );
}
