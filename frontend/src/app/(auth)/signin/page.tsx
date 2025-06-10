import SigninForm from "@/components/auth/signin-form";
import Logo from "@/components/ui/logo";
import Link from "next/link";

const Page = () => {
  return (
    <div className="max-w-lg mx-auto mt-12 px-6">
      <Logo size={50} />
      <h1 className="text-2xl mt-10">Entre na sua conta</h1>
      <div className="mt-10 mb-14 flex flex-col gap-6">
        <SigninForm />
      </div>
      <div className="flex flex-col justify-center items-center gap-1 md:flex-row">
        <div className="text-gray-500">Ainda não tem uma conta?</div>
        <Link href="/signup" className="hover:underline">
          Cadastre-se
        </Link>
      </div>
    </div>
  );
};

export default Page;
