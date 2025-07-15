// src/app/layout.tsx
import "@/styles/globals.css";
import { Geist } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata = {
  title: "SAAE – Sistema de Administración de Acciones Estatutarias",
  description: "Gestión de acciones estatutarias para Región 10",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={geist.variable}>
      <body className="flex bg-gray-100 text-gray-900 min-h-screen font-sans">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
