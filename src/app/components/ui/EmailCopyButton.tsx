'use client';

import { useState } from 'react';
import { MdEmail } from 'react-icons/md';

interface EmailCopyButtonProps {
    email: string;
    className?: string;
}

export default function EmailCopyButton({ email, className = "" }: EmailCopyButtonProps) {
    const [showFeedback, setShowFeedback] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setShowFeedback(true);
        setTimeout(() => {
            setShowFeedback(false);
        }, 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className={`hover:text-blue-500 transition-colors relative group ${className}`}
            title={email}
        >
            <MdEmail />
            <span
                className={`absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded transition-opacity duration-300 pointer-events-none whitespace-nowrap ${showFeedback ? 'opacity-100' : 'opacity-0'
                    }`}
            >
                Copied!
            </span>
        </button>
    );
}
