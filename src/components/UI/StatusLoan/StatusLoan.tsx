import { Emprestimo } from "@/@types/emprestimo";
import { classNames } from "@/app/utils/functions";

interface StatusLoanProps {
  status: Emprestimo["status"];
}

const StatusLoan: React.FC<StatusLoanProps> = ({ status }) => {
  return (
    <span
      className={classNames(
        status === "Em andamento"
          ? "bg-yellow-100 text-yellow-800"
          : "bg-green-100 text-green-700",
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium",
      )}
    >
      {status}
    </span>
  );
};

export default StatusLoan;
