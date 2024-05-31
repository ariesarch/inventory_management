import React, { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils'; // Assuming you have a utility for classNames
import { cva, VariantProps } from 'class-variance-authority';

export interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    inputClassName?: string;
    label?: string;
    name?: string;
    error?: string;
    shadow?: boolean;
    variant?: 'normal' | 'solid' | 'outline' | 'line';
    dimension?: 'small' | 'medium' | 'big';
}


const inputStyles = cva(
    'block w-full subtitle p-4 mt-2 text-neutral-400 font-semibold bg-shades-0 border border-neutral-200 rounded-md focus:outline-none focus:ring focus:ring-opacity-40',
    {
        variants: {
            variant: {
                normal: 'bg-gray-100 border-border-base focus:shadow focus:bg-light focus:border-accent',
                solid: 'bg-gray-100 border-border-100 focus:bg-light focus:border-accent',
                outline: 'border-border-base focus:border-accent',
                line: 'ps-0 border-b border-border-base rounded-none focus:border-accent',
            },
            dimension: {
                small: 'text-sm h-10',
                medium: 'h-12',
                big: 'h-14',
            },
            shadow: {
                true: 'focus:shadow',
                false: '',
            },
            disabled: {
                true: 'bg-gray-100 cursor-not-allowed',
                false: '',
            },
        },
        defaultVariants: {
            variant: 'normal',
            dimension: 'medium',
            shadow: false,
            disabled: false,
        },
    }
);
type Props = CustomInputProps & VariantProps<typeof inputStyles>;

const CustomInput = forwardRef<HTMLInputElement, Props>(
    ({ className, label, name, error, shadow, disabled, variant, dimension, inputClassName, ...rest }, ref) => {
        return (
            <div className={className}>
                {label && (
                    <label htmlFor={name} className="block subtitle text-neutral-300">
                        {label}
                    </label>
                )}
                <input
                    id={name}
                    name={name}
                    ref={ref}
                    className={cn(
                        inputStyles({ variant, dimension, shadow, disabled }),
                        inputClassName
                    )}
                    disabled={disabled}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    aria-invalid={error ? 'true' : 'false'}
                    {...rest}
                />
                {error && <p className="my-2 text-xs text-red-500">{error}</p>}
            </div>
        );
    }
);

CustomInput.displayName = 'Input';

export default CustomInput;
