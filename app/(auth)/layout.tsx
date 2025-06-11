import { Space_Mono } from "next/font/google";

const spaceMono = Space_Mono({
    weight: ["400", "700"],
    subsets: ["latin"],
    display: "swap",
});

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`${spaceMono.className} min-h-screen bg-black`}>
            {children}
        </div>
    );
} 