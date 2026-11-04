export const metadata = {
  title: "Admin Login | Narinder Kumar",
  description: "Secure administrator authentication portal.",
};

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-white selection:text-black flex items-center justify-center">
      {children}
    </div>
  );
}
