# Feature: Authentication

## Overview
This feature allows users to sign up, log in, and manage their session state across the application. It uses Supabase Auth as the backend provider.

## Technical Implementation

### Frontend
- **Provider:** `AuthProvider` (in `lib/auth-context.tsx`) wraps the application in `app/providers.tsx`.
- **State:** Exposes `user`, `session`, `loading`, and `signOut` via `useAuth` hook.
- **Components:**
  - `UserMenu.tsx`: Displays user avatar/login button in the global header.
  - `app/login/page.tsx`: Login form (Email/Password & Google).
  - `app/register/page.tsx`: Registration form.

### Backend (Supabase)
- **Service:** Supabase Auth (GoTrue).
- **Providers:** Email/Password enabled. Google OAuth configured (requires ENV vars).
- **Database:** `profiles` table stores user information linked to `auth.users` (requires a trigger in DB to sync on creation - *To be verified/added if not present*).

## Usage
- **Login:** Users can log in using email/password or Google.
- **Register:** New users can sign up. They are redirected to home or asked to verify email.
- **Session:** Session persists across reloads.
- **Logout:** Users can sign out via the User Menu.

## Future Improvements
- Implement "Forgot Password" flow.
- Add "Edit Profile" page.
- Verify and implement `handle_new_user` trigger for `profiles` table automation.
