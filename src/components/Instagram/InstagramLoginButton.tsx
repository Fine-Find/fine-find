import { signIn } from 'next-auth/client';

export default function InstagramLoginButton() {
  return (
    <ion-button
      color="instagram"
      onClick={() => signIn('instagram')}
    >
      <ion-text>Connect your Instagram Account</ion-text>
      <ion-icon slot="end" name="logo-instagram"></ion-icon>
    </ion-button>
  );
}
