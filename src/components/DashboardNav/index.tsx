import styles from './DashboardNav.module.scss';

export default function DashboardNav() {
  return (
    <ion-menu content-id="main" class={styles.menu} type="overlay">
      <ion-list>
        <ion-item-group class={styles.menuItems}>
          <ion-item-divider>
            <ion-label>Home</ion-label>
          </ion-item-divider>
        </ion-item-group>
      </ion-list>
    </ion-menu>
  );
}
