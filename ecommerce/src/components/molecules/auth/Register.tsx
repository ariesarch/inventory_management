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
import { useRegisterMutation } from "@/hooks/mutations/auth/use-register.mutation";
import ErrorMessage from "@/components/atoms/ErrorMessage";
type FormValues = {
    name: string
    email: string
    password: string
    confirm_password: string
}

const RegisterFormSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('error-email-format').required('Email is required'),
    password: yup.string().min(8).required('Password is required'),
    confirm_password: yup.string().required('Confirm password is required'),
})

const defaultValues = {
    name: '',
    email: '',
    password: '',
    confirm_password: '',
}

const RegisterForm = () => {
    const { mutate: registerForm } = useRegisterMutation()
    const [errorMsg, setErrorMsg] = useState('')
    const [errorPass, setErrorPass] = useState('')
    const [strongPassword, setStrongPassword] = useState(false)
    const { authorize, isAuthorize } = useUI()
    const router = useRouter()
    const { openModal, closeModal } = useModalAction()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(RegisterFormSchema),
        defaultValues,
    })

    function handleLogin() {
        return openModal('LOGIN_VIEW')
    }

    function onSubmit({ name, email, password, confirm_password }: FormValues) {
        if (password !== confirm_password) {
            return setErrorPass(
                'The password confirmation field must match password.'
            )
        }

        registerForm(
            {
                name,
                email,
                password,
                password_confirmation: confirm_password,
            },
            {
                onSuccess: ({ message, token }) => {
                    if (token) {
                        Cookies.set('auth_token', token)
                        authorize()
                        router.push('/')
                        return closeModal()
                    } else {
                        setErrorMsg(message as string)
                    }
                },
                onError: (error: any) => {
                    setErrorMsg(error.message as string)
                },
            }
        )
    }
    return (
        <div className="relative flex flex-col items-center justify-center overflow-hidden min-h-screen md:min-h-0">
            <div className="w-full">
                {errorMsg && (
                    <Alert
                        variant="error"
                        message={errorMsg}
                        className="mb-6 w-full"
                        closeable={true}
                        onClose={() => setErrorMsg('')}
                    />
                )}
            </div>
            <div className="w-full p-6 sm:p-10 bg-white rounded-2xl shadow-md sm:max-w-[480px]">
                <div className="flex flex-col justify-center items-center gap-4">
                    <Image src={logo} alt="Artscape Logo" width={64} height={64} />
                    <h1 className="text-[20px] leading-[30px] sm:text-[28px] sm:leading-[40px] font-medium text-neutral-500">
                        Welcome to Artscape
                    </h1>
                </div>
                <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-2">
                        <CustomInput
                            label="Enter your Name"
                            {...register('name')}
                            error={errors.name?.message!}
                            variant="outline"
                            className="mb-3"
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="mb-2">
                        <CustomInput
                            label="Enter your Email"
                            {...register('email')}
                            type="email"
                            variant="outline"
                            className="mb-3"
                            error={errors.email?.message!}
                            placeholder="abc@gmail.com"
                        />
                    </div>
                    <div className="mb-2">
                        <PasswordInput
                            label="Enter your Password"
                            {...register('password')}
                            error={errors.password?.message!}
                            variant="outline"
                            className="mb-3"
                            placeholder="helloo123*()(_"
                        />
                    </div>
                    <div className="mb-2 relative">
                        <PasswordInput
                            label="Confirm your Password"
                            {...register('confirm_password')}
                            error={errors.confirm_password?.message!}
                            variant="outline"
                            className="mb-3"
                            placeholder="helloo123*()(_"
                        />
                    </div>
                    {strongPassword && (
                        <span className="flex items-center gap-1 caption text-success-300 font-medium">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="Shield">
                                    <path
                                        id="Vector"
                                        d="M13.087 2.43338C13.0095 2.37072 12.919 2.32623 12.8221 2.30315C12.7252 2.28008 12.6244 2.27902 12.527 2.30004C11.8146 2.44934 11.0792 2.45124 10.3661 2.30563C9.65295 2.16002 8.97716 1.86999 8.38033 1.45338C8.26873 1.37596 8.13615 1.33447 8.00033 1.33447C7.86451 1.33447 7.73193 1.37596 7.62033 1.45338C7.0235 1.86999 6.34771 2.16002 5.63457 2.30563C4.92143 2.45124 4.18604 2.44934 3.47366 2.30004C3.37629 2.27902 3.27544 2.28008 3.17853 2.30315C3.08162 2.32623 2.99111 2.37072 2.91366 2.43338C2.83632 2.49612 2.77401 2.5754 2.73132 2.66539C2.68864 2.75537 2.66666 2.85378 2.667 2.95338V7.92004C2.6664 8.87587 2.89418 9.81802 3.33135 10.668C3.76853 11.518 4.40245 12.2513 5.18033 12.8067L7.61366 14.54C7.72657 14.6204 7.86173 14.6636 8.00033 14.6636C8.13893 14.6636 8.27409 14.6204 8.387 14.54L10.8203 12.8067C11.5982 12.2513 12.2321 11.518 12.6693 10.668C13.1065 9.81802 13.3343 8.87587 13.3337 7.92004V2.95338C13.334 2.85378 13.312 2.75537 13.2693 2.66539C13.2266 2.5754 13.1643 2.49612 13.087 2.43338ZM12.0003 7.92004C12.0008 8.66321 11.8239 9.39576 11.4841 10.0567C11.1443 10.7177 10.6516 11.2879 10.047 11.72L8.00033 13.18L5.95366 11.72C5.34902 11.2879 4.85632 10.7177 4.51656 10.0567C4.17681 9.39576 3.99982 8.66321 4.00033 7.92004V3.72004C5.39795 3.83966 6.79769 3.51539 8.00033 2.79338C9.20297 3.51539 10.6027 3.83966 12.0003 3.72004V7.92004ZM9.027 6.39338L7.23366 8.19338L6.64033 7.59338C6.51479 7.46784 6.34453 7.39731 6.167 7.39731C5.98946 7.39731 5.8192 7.46784 5.69366 7.59338C5.56813 7.71891 5.4976 7.88918 5.4976 8.06671C5.4976 8.24424 5.56813 8.41451 5.69366 8.54004L6.76033 9.60671C6.82231 9.6692 6.89604 9.71879 6.97728 9.75264C7.05852 9.78648 7.14566 9.80391 7.23366 9.80391C7.32167 9.80391 7.40881 9.78648 7.49005 9.75264C7.57129 9.71879 7.64502 9.6692 7.707 9.60671L10.0003 7.33338C10.1259 7.20784 10.1964 7.03758 10.1964 6.86004C10.1964 6.68251 10.1259 6.51225 10.0003 6.38671C9.87479 6.26117 9.70453 6.19065 9.527 6.19065C9.34946 6.19065 9.1792 6.26117 9.05366 6.38671L9.027 6.39338Z"
                                        fill="#55C375"
                                    />
                                </g>
                            </svg>
                            <span>Strong Password</span>
                        </span>
                    )}
                    {errorPass && (
                        <p className="my-2 text-xs text-red-500">{errorPass}</p>
                    )}
                    <div className="flex flex-col items-center mt-6">
                        <CustomButton
                            className="w-full py-3 px-4 rounded-[8px]"
                            type="submit"
                        >
                            Register
                        </CustomButton>
                        <p className="py-3 text-neutral-300 flex items-center gap-4">
                            <span className="h-[1px] w-24 sm:w-40 bg-neutral-100 border-0" />
                            <span className="text-neutral-200">or</span>
                            <span className="h-[1px] w-24 sm:w-40 bg-neutral-100 border-0" />
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm
