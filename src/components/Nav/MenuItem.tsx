import { ReactNode } from "react";

function MenuItem({
  onClick,
  className,
  children,
}: {
  onClick: () => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className} onClick={onClick}>
      <div className="sm:p-3 p-5 hover:bg-gray-50 cursor-pointer">
        {children}
      </div>
      <hr></hr>
    </div>
  );
}

export default MenuItem;
