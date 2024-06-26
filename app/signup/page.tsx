"use client";

import { TSignUpSchema, signUpSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useConvex } from "convex/react";
import { useEffect } from "react";
import { api } from "@/convex/_generated/api";

export default function signup() {
  const router = useRouter();

  const session = useSession();
  const convex= useConvex();
  const user: any = session?.data?.user;
  console.log(session);

  useEffect(() => {
    user&& checkTeam()
  }, [user]);

  const checkTeam = async () => {
    const result = await convex.query(api.teams.getTeam, {email: user?.email});
    console.log("User team detail: ", result);

    if(result.length){
      router.push('/dashboard');
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignUpSchema>({ resolver: zodResolver(signUpSchema) });

  const onSubmit = async (data: FieldValues) => {
    try {
      const { username, email, password } = data;

      // const response = await axios.post(
      //   import.meta.env.VITE_API_PATH + '/api/auth/email-password/signup',
      //   {
      //     name: username,
      //     email,
      //     password,
      //   }
      // );

      // setUser(response.data.accessToken);
      // localStorage.setItem('isLoggedIn', 'true');
      // toast.success(response.data.message);

      reset();
      // navigate('/');
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  if (session.status === "unauthenticated") {
    return (
      <div className="m-4 flex-grow cursor-default bg-white py-4">
        <div className="mb-4 flex justify-center">
          <div className="flex w-full items-center justify-center">
            <h2 className="w-3/4 text-center text-lg font-bold text-black sm:text-xl">
              Sign up to CanvasCraft
            </h2>
          </div>
        </div>
        <div className="m-2 mt-8 flex flex-col items-center justify-center gap-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full md:w-3/4 lg:w-2/5"
          >
            <div className="mb-2">
              <input
                {...register("username")}
                type="text"
                placeholder="Username"
                className="w-full rounded-lg bg-zinc-100 p-3 font-normal placeholder:text-sm placeholder:text-neutral-500"
              />
              {errors.username && (
                <p className="p-3 text-xs text-red-500">{`${errors.username.message}`}</p>
              )}
            </div>

            <div className="mb-2">
              <input
                {...register("email")}
                type="email"
                placeholder="Email"
                className="w-full rounded-lg bg-zinc-100 p-3 font-normal placeholder:text-sm placeholder:text-neutral-500"
              />
              {errors.email && (
                <p className="p-3 text-xs text-red-500">{`${errors.email.message}`}</p>
              )}
            </div>

            <div className="mb-2">
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="w-full rounded-lg bg-zinc-100 p-3 font-normal placeholder:text-sm placeholder:text-neutral-500"
              />
              {errors.password && (
                <p className="p-3 text-xs text-red-500">{`${errors.password.message}`}</p>
              )}
            </div>

            <div className="mb-4">
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirm Password"
                className="w-full rounded-lg bg-zinc-100 p-3 font-normal placeholder:text-sm placeholder:text-neutral-500"
              />
              {errors.confirmPassword && (
                <p className="p-3 text-xs text-red-500">{`${errors.confirmPassword.message}`}</p>
              )}
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="flex w-full items-center justify-center rounded-lg bg-neutral-800 p-3 text-base font-medium text-light disabled:bg-neutral-600 sm:text-lg sm:font-semibold text-white"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-2 flex w-5/6 flex-col items-center justify-center gap-4 text-center text-sm font-normal sm:text-base">
            <p>
              Already have an account?
              <Link
                href={"signin"}
                className="text-blue-600 hover:text-blue-500"
              >
                {" "}
                Log in now
              </Link>
            </p>

            <span>OR</span>
          </div>

          <button
            onClick={() => signIn("google")}
            className="flex w-full items-center justify-center space-x-2 rounded-lg border-2 border-b-4  border-gray-300 p-3 text-center hover:bg-gray-50 md:w-3/4 lg:w-2/5"
          >
            <Image
              src="/google-color-icon.svg"
              width={18}
              height={20}
              alt="Google"
            />
            <span className="text-sm sm:text-base">Continue with Google</span>
          </button>

          <button
            onClick={() => signIn("github")}
            className="flex w-full items-center justify-center space-x-2 rounded-lg border-2 border-b-4 border-gray-300 p-3 text-center hover:bg-gray-50 md:w-3/4 lg:w-2/5"
          >
            <Image src="/github-icon.svg" width={18} height={20} alt="Github" />
            <span className="text-sm sm:text-base">Continue with Github</span>
          </button>
        </div>
      </div>
    );
  }
}
