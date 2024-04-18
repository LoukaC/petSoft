import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/backgound-pattern";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <BackgroundPattern />
      <AppHeader />
      {children}
      <AppFooter />
    </>
  );
}
