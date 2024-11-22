import { Nav } from "./Nav";

export function AppShell({ children }) {
  return (
    <div className="w-full min-h-screen relative">
      <Nav />
      {children}
    </div>
  );
}
