"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const unauthorized = searchParams.get("error") === "unauthorized";

  return (
    <form
      className="glass grid w-full max-w-md gap-4 rounded-2xl p-6"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(async () => {
          const supabase = createClient();
          const { error: loginError } = await supabase.auth.signInWithPassword({
            email: String(formData.get("email")),
            password: String(formData.get("password"))
          });
          if (loginError) {
            setError(loginError.message);
            return;
          }
          router.replace(searchParams.get("next") || "/admin");
          router.refresh();
        });
      }}
    >
      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-100">
        <Lock className="h-5 w-5" />
      </div>
      <div>
        <h1 className="text-2xl font-black text-white">Admin login</h1>
        <p className="mt-1 text-sm text-slate-400">Use Supabase email and password auth.</p>
      </div>
      <div className="grid gap-2">
        <Label>Email</Label>
        <Input name="email" type="email" required />
      </div>
      <div className="grid gap-2">
        <Label>Password</Label>
        <Input name="password" type="password" required />
      </div>
      <Button disabled={pending}>{pending ? "Signing in..." : "Sign in"}</Button>
      {unauthorized && !error ? <p className="text-sm text-amber-200">Akun ini tidak terdaftar sebagai admin.</p> : null}
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
    </form>
  );
}
