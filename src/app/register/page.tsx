import { CardWrapper } from "@/components/auth/card-wrapper";
import { RegisterForm } from "@/components/auth/register/register-form";
export const dynamic = "force-dynamic";
const RegisterPage = () => {
  return (
    <>
      <main>
        <div className="flex min-h-screen flex-col items-center justify-center">
          <div className="mb-20 mt-10">
            <CardWrapper headerLabel="Create an account">
              <div className="p-4 mobileM:p-2">
                <RegisterForm />
              </div>{" "}
            </CardWrapper>
          </div>
        </div>
      </main>
     
    </>
  );
};

export default RegisterPage;
