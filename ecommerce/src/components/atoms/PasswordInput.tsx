"use client";
import React, { InputHTMLAttributes, useState } from "react";
import {cn} from "@/utils";
import Link from "next/link";
import { Eye } from "./icons/eye-icon";
import { EyeOff } from "./icons/eye-off-icon";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    inputClassName?: string;
    label: string;
    name: string;
    forgotPageLink?: string;
    shadow?: boolean;
    variant?: "normal" | "solid" | "outline";
    error: string | undefined;
    forgotPageRouteOnClick?: () => void;
}

const variantClasses = {
    normal:
        "bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-accent",
    solid:
        "bg-gray-100 border border-border-100 focus:bg-light focus:border-accent",
    outline: "border border-border-base focus:border-accent",
};

const PasswordInput = React.forwardRef<HTMLInputElement, Props>(
    (
        {
            className,
            inputClassName,
            label,
            name,
            error,
            children,
            variant = "normal",
            shadow = false,
            type = "text",
            forgotPageLink = "",
            forgotPageRouteOnClick,
            ...rest
        },
        ref
    ) => {
        // const { t } = useTranslation();
        const [show, setShow] = useState(false);

        return (
            <div className={className}>
                <div className="flex items-center justify-between mb-2">
                    <label htmlFor={name} className="block subtitle text-neutral-300">
                        {label}
                    </label>

                    {forgotPageLink && (
                        <Link
                            href={forgotPageLink}
                            className="text-xs text-accent transition-colors duration-200 focus:outline-none focus:text-accent-700 focus:font-semibold hover:text-accent-hover"
                        >
                            text-forgot-password
                        </Link>
                    )}
                    {forgotPageRouteOnClick && (
                        <button
                            onClick={forgotPageRouteOnClick}
                            type="button"
                            className="text-xs text-accent transition-colors duration-200 focus:outline-none focus:text-accent-700 focus:font-semibold hover:text-accent-hover"
                        >
                            forgot-password
                        </button>
                    )}
                </div>
                <div className="relative">
                    <input
                        id={name}
                        name={name}
                        type={show ? "text" : "password"}
                        ref={ref}
                        className={cn(
                            "block w-full subtitle p-4 mt-2 text-neutral-400 font-semibold bg-shades-0 border border-neutral-200 rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40",
                            shadow && "focus:shadow",
                            variantClasses[variant],
                            inputClassName
                        )}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        {...rest}
                    />
                    <label
                        htmlFor={name}
                        className="absolute end-4 top-5 -mt-2 text-body cursor-pointer"
                        onClick={() => setShow((prev) => !prev)}
                    >
                        {show ? (
                            <EyeOff className="w-6 h-6" />
                        ) : (
                            <Eye className="w-6 h-6" />
                        )}
                    </label>
                </div>
                {error && <p className="my-2 text-xs text-red-500">{error}</p>}
            </div>
        );
    }
);

PasswordInput.displayName = "PasswordInput";
export default PasswordInput;
