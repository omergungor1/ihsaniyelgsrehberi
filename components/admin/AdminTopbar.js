export default function AdminTopbar({ email }) {
  return (
    <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-[#D6DFEC] bg-white px-6">
      <p className="text-[14px] font-semibold text-[#042352]">Yönetim Paneli</p>
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e8eef8] text-[13px] font-bold text-[#042352]">
          {email?.slice(0, 1).toUpperCase() || "A"}
        </span>
        <span className="text-[13px] font-medium text-[#465367]">{email}</span>
      </div>
    </header>
  );
}
