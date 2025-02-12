import { ReactNode } from "react"

export const Button = ({ onClick, children, className }: { onClick: () => void, children: ReactNode, className?: string }) => {
    return (
        <button onClick={onClick} className={`px-8 py-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded transition duration-300 ${className}`}>
            {children}
        </button>
    )
}
