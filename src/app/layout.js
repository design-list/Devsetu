import "./globals.css";

export const metadata = {
  title: "Dev setu",
  description: "Dev setu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
