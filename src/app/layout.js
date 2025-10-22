import "./globals.css";
import Header from "@/customComponents/Header";
export const metadata = {
  title: "Agentic Todo Sim",
  description: "A smart todo application powered by AI agents.",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900">
        <Header />
        {children}
      </body>
    </html>
  );
}
