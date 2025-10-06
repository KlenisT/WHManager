// app/login/layout.tsx
import '../styles/login.module.css';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children} {/* full-screen login content */}
    </div>
  );
}
