import { CardWrapper } from "@/components/auth/card-wrapper";
import { LoginForm } from "@/components/auth/login/login-form";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Login",
  description: `Access your Panaversity account. Login to manage your courses, track your learning progress, and stay connected with the latest AI-powered learning opportunities.`,
};

const LoginPage = () => {
  return (
    <>
      <main>
        <div className="mb-20 mt-10 flex min-h-[85vh] flex-col items-center justify-center ">
          <CardWrapper headerLabel="Login">
            <div className="p-4 mobileM:p-2">
              <LoginForm />
            </div>
          </CardWrapper>
        </div>
      </main>
     
    </>
  );
};

export default LoginPage;
