"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "../styles/auth.module.css";

export default function LoginPage() {
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };

    const username = target.username.value;
    const password = target.password.value;

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (res?.error) {
      setError("Invalid username or password");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <Image
          src="/vercel.svg"
          alt="WH Manager Login Screen Picture"
          width={180}
          height={180}
          className="auth-img"
        />
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit">Log In</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
}
