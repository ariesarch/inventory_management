'use client'
import Alert from "@/components/atoms/Alert";
import Image from "next/image"; 
import { logo } from "@/components/atoms/icons";
import { useState } from "react";
import CustomInput from "@/components/atoms/CustomInput";
import PasswordInput from "@/components/atoms/PasswordInput";
import Link from "next/link";
import CustomButton from "@/components/atoms/CustomButton";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLoginMutation } from "@/hooks/mutations/auth/use-login.mutation";
import Cookies from "js-cookie";
import { useUI } from "@/contexts/ui.context";
import { useRouter } from "next/navigation";
import { useModalAction } from "@/contexts/modal.context";
import { useForm } from "react-hook-form";
type FormValues = {
    email: string;
    password: string;
};

const loginFormSchema = yup.object().shape({
    email: yup.string().email("error-email-format").required("Email is required"),
    password: yup.string().required("Password is required"),
});

const defaultValues = {
    email: "",
    password: "",
};
const LoginForm = () => {
    const [errorMsg, setErrorMsg] = useState("");
    const {authorize,isAuthorize} = useUI();
    const {openModal,closeModal} = useModalAction();
    const router = useRouter();
    const { mutate: login } = useLoginMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(loginFormSchema),
        defaultValues,
    });
    function onSubmit({ email, password }: FormValues) {
        login(
            {
                email,
                password,
            },
            {
                onSuccess: ({ message, token,user }) => {
                    if (token) {
                        Cookies.set("auth_token", token);
                        authorize();
                        router.push("/");
                        return closeModal();
                    } else {
                        setErrorMsg(message as string);
                    }
                },
                onError: (error: any) => {
                    console.log(error.message);
                },
            }
        );
    }
    return (
        <div className="relative flex flex-col items-center justify-center overflow-hidden min-h-screen md:min-h-0">
            <div className="w-full sm:w-2/4 ">
                {errorMsg && (
                    <Alert
                        variant="error"
                        message={errorMsg}
                        className="mb-6 w-full"
                        closeable={true}
                        onClose={() => setErrorMsg("")}
                    />
                )}
            </div>
            <div className="w-full p-6 sm:p-10 bg-white rounded-2xl shadow-md sm:max-w-[480px]">
                <div className="flex flex-col justify-center items-center gap-4">
                    <Image src={logo} alt="Ecommerce Logo" width={64} height={64} />
                    <h1 className="text-[20px] leading-[30px] sm:text-[28px] sm:leading-[40px] font-medium text-neutral-500">
                        Welcome
                    </h1>
                </div>
                <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <CustomInput
                            label="Enter your Email"
                            type="email"
                            variant="outline"
                            placeholder="abc@gmail.com"
                            {...register("email")}
                            error={errors.email?.message!}
                        />
                    </div>
                    <div className="mb-2">
                        <PasswordInput
                            label="Enter your Password"
                            variant="outline"
                            className="mb-5"
                            placeholder="helloo123*()(_" 
                            {...register("password")}
                            error={errors.password?.message!}/>
                    </div>
                    <Link href="/forget" className="caption text-neutral-300">
                        Forget Password?
                    </Link>
                    <div className="flex flex-col items-center mt-6">
                        <CustomButton
                            className="w-full py-3 px-4 rounded-[8px]"
                        >
                            Login
                        </CustomButton>
                        <p className="py-3 text-neutral-300 flex items-center gap-4">
                            <span className="h-[1px] w-24 sm:w-40 bg-neutral-100 border-0" />
                            <span className="text-neutral-200">or</span>
                            <span className="h-[1px] w-24 sm:w-40 bg-neutral-100 border-0" />
                        </p>
                    </div>
                </form>
                <p className="mt-4 text-sm text-center caption">
                    <span className=" text-neutral-300">
                        Don&apos;t have an account?{" "}
                    </span>
                    <span
                        className="font-medium text-neutral-400 hover:underline cursor-pointer">
                        Register
                    </span>
                </p>
            </div>
        </div>
    )
}
export default LoginForm;