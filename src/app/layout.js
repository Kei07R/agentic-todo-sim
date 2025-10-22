import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/customComponents/Header";
export const metadata = {
  title: "Agentic Todo Sim",
  description: "A smart todo application powered by AI agents.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
