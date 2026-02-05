import { ReactNode } from 'react';

export default function BentoGrid({ children }: { children: ReactNode }) {
    return (
        <div className="
      grid grid-cols-1 gap-4 p-4 
      md:grid-cols-4 md:grid-rows-[auto_auto_auto] md:gap-6 md:p-8
      max-w-[1600px] mx-auto
    ">
            {children}
        </div>
    );
}
