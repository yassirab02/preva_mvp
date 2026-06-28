import 'next-auth';
import { UserRole } from '@/lib/types';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    role: UserRole;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    role: UserRole;
  }
}
