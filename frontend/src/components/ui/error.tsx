export default function Error({ text }: { text: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center min-h-[220px] border border-red-500 rounded-lg">
      <p className="text-red-500 text-lg">{text}</p>
    </div>
  );
}
