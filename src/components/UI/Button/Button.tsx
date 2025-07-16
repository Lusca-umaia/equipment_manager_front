import { classNames } from "@/app/utils/functions";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  type: "button" | "submit";
  handleClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  buttonStyle: "primary" | "secondary";
}

const styles = {
  primary: "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600",
  secondary: "bg-red-500 hover:bg-red-400 focus-visible:outline-red-500",
};

export default function Button(props: ButtonProps) {
  return (
    <button
      type={props.type}
      disabled={props.disabled}
      onClick={() => props.handleClick && props.handleClick()}
      className={classNames(
        styles[props.buttonStyle],
        "flex gap-2 cursor-pointer rounded-md px-3 disabled:opacity-80 duration-100 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
      )}
    >
      {props.children}
      {props.isLoading && (
        <svg className={`animate-spin text-white h-5 w-5 `} viewBox="0 0 24 24">
          <circle
            className="opacity-0"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
    </button>
  );
}
