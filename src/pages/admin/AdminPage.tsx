import { useState } from "react";
import AdminLogin from "./AdminLogin";
import AdminShell from "./AdminShell";

export default function AdminPage() {
  const [authed, setAuthed] = useState(
    () => !!sessionStorage.getItem("rmh_admin_token")
  );

  function handleLogout() {
    sessionStorage.removeItem("rmh_admin_token");
    setAuthed(false);
  }

  if (!authed) {
    return <AdminLogin onSuccess={() => setAuthed(true)} />;
  }

  return <AdminShell onLogout={handleLogout} />;
}
