"use client";

interface AuthCardProps {
    children: React.ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({ children }) => {
    return (
        <div
            className="shadow-2xl rounded-[50px] w-full max-w-md relative"
            style={{
                minWidth: 320,
            }}
        >
            <div
                className="bg-white rounded-lg p-8 w-full h-full"
                style={{
                    clipPath:
                        "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)",
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default AuthCard;
