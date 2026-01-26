import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Footer } from "~/components/Footer";
import { LogoutIcon } from "~/components/Icons";
import Navbar from "~/components/Navbar";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  { title: "Authentication | ApplyWise.io" },
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
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex flex-col justify-center items-center px-4 md:px-10 lg:px-20 gap-10 md:gap-14">
      <Navbar />
      <div className="w-full flex flex-col gap-20 md:gap-24 xl:gap-20 items-center justify-center animate-in fade-in duration-1000">
        <section className="gradient-border shadow-md">
          <div className="max-w-2xl p-5 flex flex-col gap-8 rounded-2xl bg-white">
            {isLoading ? (
              <div className="flex flex-col justify-center items-center text-center gap-4">
                <h1 className="text-3xl!">Signing You In…</h1>
                <h2 className="text-lg!">
                  Please wait a moment while we securely connect to your Puter
                  account and prepare your workspace.
                </h2>
              </div>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <div className="flex flex-col justify-center items-center text-center gap-4">
                    <h1 className="text-3xl!">You’re Signed In</h1>
                    <h2 className="text-lg!">
                      Your account is connected and ready. You can now upload
                      your resume, run analyses, and view your reports anytime.
                    </h2>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center text-center gap-4">
                    <h1 className="text-3xl!">Sign In to Continue</h1>
                    <h2 className="text-lg!">
                      Log in using your Puter account to securely upload your
                      resume, run analyses, and access your reports anytime.
                    </h2>
                  </div>
                )}
              </>
            )}

            <div className="flex flex-col justify-center items-center">
              {isLoading ? (
                <button className="primary-button animate-pulse px-10!">
                  <p>Signing in...</p>
                </button>
              ) : (
                <>
                  {auth.isAuthenticated ? (
                    <button
                      className="primary-button px-10!"
                      onClick={auth.signOut}
                    >
                      <p className="flex flex-row gap-2 items-center">
                        {" "}
                        <span>
                          <LogoutIcon />
                        </span>
                        Log Out
                      </p>
                    </button>
                  ) : (
                    <button
                      className="primary-button px-10!"
                      onClick={auth.signIn}
                    >
                      <p>Log In</p>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
        <div className="w-screen -mx-4 md:-mx-10 lg:-mx-20">
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default auth;
