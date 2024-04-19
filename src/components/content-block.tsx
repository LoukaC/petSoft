type contentblockProps = {
  children: React.ReactNode;
};

export default function ContentBlock({ children }: contentblockProps) {
  return <div className="bg-[#F7F8FA] rounded-md shadow-md overflow-hidden w-full h-full">{children}</div>;
}
