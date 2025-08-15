import type { Metadata } from "next";
import  { Toaster } from "@/components/ui/sonner"
import "./draggable.css";



export const metadata: Metadata = {
  title: "Draggable photo gallery",
  description: "An animation by thecodemaster",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` min-h-screen`}>
   
        {children}
        <Toaster position="top-right" 
          toastOptions={{
            style: {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(50px)",
                border: "none",
                color: "black"
            },
          }}
        />
      </body>
    </html>
  );
}
