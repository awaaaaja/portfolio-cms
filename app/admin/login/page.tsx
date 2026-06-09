import { Suspense } from "react";
import { LoginForm } from "@/app/admin/login/login-form";

export const metadata = { title: "Admin Login" };

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
