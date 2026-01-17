type Props = {
  title: string;
  status: "locked" | "active" | "completed";
  onClick: () => void;
};

export default function LevelNode({ title, status, onClick }: Props) {
  const base =
    "w-20 h-20 rounded-full flex items-center justify-center text-center text-sm cursor-pointer";

  const styles =
    status === "completed"
      ? "bg-green-500 text-white"
      : status === "active"
      ? "bg-black text-white"
      : "bg-gray-300 text-gray-500 cursor-not-allowed";

  return (
    <div onClick={status !== "locked" ? onClick : undefined}>
      <div className={`${base} ${styles}`}>{title}</div>
    </div>
  );
}
