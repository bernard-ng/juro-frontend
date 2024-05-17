import { motion } from "framer-motion"
import { cn } from "@lib/utils"

const CheckIcon = ({className=""}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="size-4"
        >
            <motion.path
                initial={{ pathLength: 0, scale:1.25 }}
                animate={{ pathLength: 1, scale:1 }}
                exit={{ pathLength: 0 }}
                d="M3 12L10 19L21 6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn("-translate-y-px", className)}
            />
        </svg>
    )
}

export default CheckIcon
