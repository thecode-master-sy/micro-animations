import type { Metadata } from "next";

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
      <body className={`  min-h-screen`}>
   
        {children}
      </body>
    </html>
  );
}
