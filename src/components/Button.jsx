const Button = ({ icon, label, bg, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`text-${text} ${bg} p-1  px-3 rounded-md flex gap-2 mx-auto h-10 md:w-fit w-58  md:justify-start justify-center   items-center  hover:bg-btn-primary hover:text-white `}
    >
      {icon} {label}
    </button>
  );
};

export default Button;
