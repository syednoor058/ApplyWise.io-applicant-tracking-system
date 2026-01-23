import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  { title: "Login - ApplyWise.io" },
  {
    name: "description",
    content: "Authenticate to access ApplyWise.io – Your Smart Resume Checker!",
  },
];

const auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1];
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(next);
    }
  }, [auth.isAuthenticated, next]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex justify-center items-center p-4 md:p-10 xl:p-20">
      <div className="gradient-border shadow-lg">
        <section className="p-5 flex flex-col gap-8 rounded-2xl bg-white">
          <div className="flex flex-col justify-center items-center text-center">
            <h1>Welcome</h1>
            <h2>Login to your account to continue your journey</h2>
          </div>
          <div className="flex flex-col justify-center items-center">
            {isLoading ? (
              <button className="auth-button animate-pulse">
                <p>Signing in...</p>
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <button className="auth-button" onClick={auth.signOut}>
                    <p>Log Out</p>
                  </button>
                ) : (
                  <button className="auth-button" onClick={auth.signIn}>
                    <p>Log In</p>
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default auth;
