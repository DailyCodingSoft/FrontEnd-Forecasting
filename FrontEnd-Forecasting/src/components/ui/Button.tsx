// components/ui/Button.tsx
type ButtonProps = {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "danger" | "success";
};

const styles = {
  primary: "bg-blue-500 hover:bg-blue-600",
  danger: "bg-red-500 hover:bg-red-600",
  success: "bg-green-500 hover:bg-green-600",
};

const Button = ({ label, onClick, variant = "primary" }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-full text-white ${styles[variant]}`}
    >
      {label}
    </button>
  );
};

export default Button;