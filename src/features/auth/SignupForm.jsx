import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Mail, Lock, User, AlertCircle, EyeOff, Eye } from "lucide-react";
import { signup } from "../../action/Auth";
import { connect } from "react-redux";
const SignupForm = ({ signup, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roles: "",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.roles) {
      newErrors.role = "Please select your role";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and policy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const { firstName, lastName, email, roles, password } = formData;
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting...");
    if (validate()) {
      setIsSubmitting(true);
      console.log("validated...");

      await new Promise((resolve) => setTimeout(resolve, 1500));
      signup(firstName, lastName, email, roles, password);

      setIsSubmitting(false);
    }
  };
  if (isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 text-center">Get Started Now</h1>
      <p className="text-gray-600 mb-8 text-center">
        Create your account and start grading smarter
      </p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1  dark:bg-gray-900 dark:text-white"
            >
              First Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <User size={18} />
              </div>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Segni"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2 border ${errors.firstName ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200`}
              />
            </div>
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.firstName}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-1  dark:bg-gray-900 dark:text-white"
            >
              Last Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <User size={18} />
              </div>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Asrat"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2 border ${errors.lastName ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200`}
              />
            </div>
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1  dark:bg-gray-900 dark:text-white"
          >
            Email address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Mail size={18} />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="segni.ase@example.com"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
         <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1  dark:bg-gray-900 dark:text-white"
          >
            Password
          </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Lock size={18} />
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className={`w-full pl-10 pr-10 py-2 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <div className="relative justify-end flex">
            <Link to="/forgot-password" className="text-btn-primary text-sm text-right ms-auto">
        Forgot Password?
        </Link> 
</div>
        {/* Agree to Terms */}
        <div className="flex items-center">
          <input
            id="agreeToTerms"
            name="agreeToTerms"
            type="checkbox"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className={`h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded transition duration-200 ${errors.agreeToTerms ? "border-red-500" : ""}`}
          />
          <label
            htmlFor="agreeToTerms"
            className="ml-2 block text-sm text-gray-700  dark:bg-gray-900 dark:text-white"
          >
            I agree to the{" "}
            <a
              href="#"
              className="text-accent-teal-light hover:text-emerald-800"
            >
              terms
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-accent-teal-light hover:text-emerald-800"
            >
              policy
            </a>
          </label>
        </div>
        {errors.agreeToTerms && (
          <p className="text-sm text-red-600 flex items-center">
            <AlertCircle size={14} className="mr-1" />
            {errors.agreeToTerms}
          </p>
        )}
        <span className="text-start font-semibold p-1">Register As:</span>
        <div className="flex flex-col  gap-5  justify-center items-center  align-middle ">
          <div className="flex flex-row gap-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, roles: "EXAMINER" })}
              className={`p-3 w-32 h-14 rounded-xl font-bold transition-all duration-200 ${
                formData.roles === "EXAMINER"
                  ? "bg-btn-primary text-white"
                  : "bg-white text-black border border-btbg-btn-primary"
              }`}
            >
              Examiner
            </button>

            <button
              type="button"
              onClick={() => setFormData({ ...formData, roles: "EXAMINEE" })}
              className={`p-3 w-32 h-14 rounded-xl font-bold transition-all duration-200 ${
                formData.roles === "EXAMINEE"
                  ? "bg-btn-primary text-white"
                  : "bg-white text-black border border-bg-btn-primary"
              }`}
            >
              Examinee
            </button>
          </div>

          {errors.roles && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.roles}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-btn-primary hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-200 ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
        >
          {isSubmitting ? "Creating account..." : "Sign up"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-[#085c43] hover:text-emerald-800 transition duration-200"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(SignupForm);
