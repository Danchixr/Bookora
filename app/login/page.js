"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setMessage("");

    const cleanEmail = email.trim().toLowerCase();

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    const user = data.user;

    if (!user) {
      setMessage("Unable to access your account. Please try again.");
      setLoading(false);
      return;
    }

    /*
      Check whether this customer has completed
      mandatory Bookora profile setup.
    */
    const { data: profile, error: profileError } =
      await supabase
        .from("profiles")
        .select("profile_completed")
        .eq("id", user.id)
        .maybeSingle();

    if (profileError) {
      console.error(
        "LOGIN PROFILE CHECK ERROR:",
        profileError
      );

      setMessage(
        "Unable to finish signing you in. Please try again."
      );

      setLoading(false);
      return;
    }

    /*
      No profile row or unfinished profile:
      mandatory onboarding.
    */
    if (!profile?.profile_completed) {
      router.replace("/create-profile");
      router.refresh();
      return;
    }

    /*
      Completed customer profile:
      normal Bookora entry.
    */
    router.replace("/home");
    router.refresh();
  }

  return (
    <main>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </main>
  );
}