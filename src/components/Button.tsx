interface ButtonProps {
    variant: "primary" | "secondary",
    size: "sm" | "md" | "lg",
    text: string,
    startIcon?: any,
    endIcon?: any,
    onClick? : () => void,
    type?: "submit" | "button",
    disabled?: boolean
}

const variantStyles = {
    "primary": "text-white bg-purple-600",
    "secondary": "text-purple-600 bg-purple-200"
}

const sizeStypes = {
    "sm": "",
    "md": "",
    "lg": "",
}

const defaultStyles = "py-2 px-4 rounded-md font-normal cursor-pointer"

export default function Button({
    variant,
    size,
    text,
    startIcon,
    endIcon,
    onClick,
    type,
    disabled
}: ButtonProps){
    return (
        <button className={ `${variantStyles[variant]} ${defaultStyles} ${sizeStypes[size]} disabled:opacity-[80%] ${ variant === "primary" ? "disabled:text-gray-200" : "disabled:text-gray-600"}` }
        disabled={disabled ? disabled : false} onClick={onClick} type={type}>
            <div className="flex justify-center items-center gap-2">
                {startIcon}
                {text}
                {endIcon}
            </div>
        </button>
    )
}