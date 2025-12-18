import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { INPUT_TOKENS } from "@/lib/design-tokens";

// Error icon SVG component
const ErrorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M8.9945 1.4095L14.5854 7.0095C15.1382 7.5555 15.1382 8.4375 14.5854 8.9905L8.9945 14.5905C8.44871 15.1365 7.56004 15.1365 7.01424 14.5905L1.40935 8.9905C0.863551 8.4445 0.863551 7.5555 1.40935 7.0095L7.01424 1.4095C7.56004 0.8635 8.44871 0.8635 8.9945 1.4095ZM7.99989 8.5765C7.61329 8.5765 7.29989 8.29299 7.29989 7.94327V5.06806C7.29989 4.71834 7.61329 4.43483 7.99989 4.43483C8.38649 4.43483 8.69989 4.71834 8.69989 5.06806V7.94327C8.69989 8.29299 8.38648 8.5765 7.99989 8.5765ZM8.00023 11.5643C8.51569 11.5643 8.93356 11.1464 8.93356 10.6309C8.93356 10.1155 8.51569 9.69759 8.00023 9.69759C7.48476 9.69759 7.06689 10.1155 7.06689 10.6309C7.06689 11.1464 7.48476 11.5643 8.00023 11.5643Z" 
      fill="currentColor"
    />
  </svg>
);

const textInputVariants = cva(
  "flex h-12 px-4 items-center gap-3 w-full rounded-xl border font-nunito text-base leading-7 transition-all duration-200 focus-visible:outline-none",
  {
    variants: {
      state: {
        default: "border-[#A1ACBA] bg-white text-[#1F272E] hover:border-[#4A535C] focus:border-[#2F70EF] focus:border-[3px]",
        error: "border-[#A5132A] bg-[#FFF8F7] text-[#1F272E]",
        disabled: "border-[rgba(31,39,46,0.12)] bg-white text-[rgba(31,39,46,0.40)] cursor-not-allowed",
        readonly: "border-[#A1ACBA] bg-[#F8FAFD] text-[#1F272E] cursor-default",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
);

const labelVariants = cva(
  "text-sm font-semibold leading-5 tracking-[0.25px] font-nunito",
  {
    variants: {
      state: {
        default: "text-[#4A535C]",
        error: "text-[#4A535C]",
        disabled: "text-[rgba(31,39,46,0.40)]",
        readonly: "text-[#4A535C]",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
);

const hintVariants = cva(
  "text-xs font-semibold leading-[14px] tracking-[0.4px] font-nunito",
  {
    variants: {
      state: {
        default: "text-[#6D7885]",
        error: "text-[#A5132A]",
        disabled: "text-[rgba(31,39,46,0.40)]",
        readonly: "text-[#6D7885]",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
);

export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  hint?: string;
  error?: string;
  state?: "default" | "error" | "disabled" | "readonly";
  optional?: boolean;
  containerClassName?: string;
  required?: boolean;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({
    className,
    label,
    hint,
    error,
    state = "default",
    optional = false,
    containerClassName,
    disabled,
    readOnly,
    required,
    ...props
  }, ref) => {
    // Determine the effective state
    const effectiveState = disabled ? "disabled" : readOnly ? "readonly" : error ? "error" : state;
    
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(Boolean(props.value || props.defaultValue));

    React.useEffect(() => {
      setHasValue(Boolean(props.value || props.defaultValue));
    }, [props.value, props.defaultValue]);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0);
      props.onChange?.(e);
    };

    return (
      <div className={cn("flex w-full min-w-[120px] max-w-[600px] flex-col", containerClassName)}>
        {/* Label */}
        {label && (
          <div className="flex h-6 pb-2 justify-between items-center w-full">
            <label className={cn(labelVariants({ state: effectiveState }))}>
              {label}
              {required && <span className="text-[#A5132A] ml-1">*</span>}
              {optional && <span className="text-[#6D7885] ml-1">(optional)</span>}
            </label>
          </div>
        )}

        {/* Input Container */}
        <div className="relative">
          <input
            ref={ref}
            className={cn(
              textInputVariants({ state: effectiveState }),
              // Focus state styling
              isFocused && effectiveState === "default" && "border-[#2F70EF] border-[3px]",
              // Placeholder styling
              "placeholder:text-[#6D7885] placeholder:font-normal",
              className
            )}
            disabled={disabled || effectiveState === "disabled"}
            readOnly={readOnly || effectiveState === "readonly"}
            required={required}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            style={{
              fontFamily: INPUT_TOKENS.FONT_FAMILY,
            }}
            {...props}
          />
          
          {/* Focus cursor indicator */}
          {isFocused && !readOnly && !disabled && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[1px] h-5 bg-[#1F272E] animate-pulse" />
          )}
        </div>

        {/* Hint/Error Message */}
        {(hint || error) && (
          <div className="flex pt-1 items-start gap-1 w-full">
            {error && effectiveState === "error" && (
              <div className="text-[#A5132A] mt-0.5">
                <ErrorIcon />
              </div>
            )}
            <div className={cn(hintVariants({ state: effectiveState }))}>
              {error || hint}
            </div>
          </div>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export { TextInput, textInputVariants };
