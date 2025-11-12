import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Check } from "lucide-react"

export function AuthForm({ isSignUp, onToggle }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
    agreeTerms: false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [emailValid, setEmailValid] = useState(false)

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    setEmailValid(regex.test(email))
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === "checkbox" ? checked : value

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }))

    if (name === "email") {
      validateEmail(value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div
      className="w-full max-w-md"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      key={isSignUp ? "signup" : "signin"}
    >
      <motion.h1 className="text-3xl font-bold mb-2 text-foreground" variants={itemVariants}>
        {isSignUp ? "Create Account" : "Welcome Back"}
      </motion.h1>

      <motion.p className="text-muted-foreground mb-8" variants={itemVariants}>
        {isSignUp ? "Join us and start your journey" : "Sign in to your account to continue"}
      </motion.p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {isSignUp && (
          <motion.div variants={itemVariants}>
            <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </motion.div>
        )}

        <motion.div variants={itemVariants}>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email Address
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            {emailValid && formData.email && (
              <motion.div className="absolute right-3 top-3 text-accent" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                <Check size={20} />
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </motion.div>

        {isSignUp && (
          <motion.div variants={itemVariants}>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle password visibility"
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </motion.div>
        )}

        {!isSignUp && (
          <motion.div className="flex items-center justify-between" variants={itemVariants}>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 rounded border-border bg-input cursor-pointer"
              />
              <span className="text-sm text-foreground">Remember me</span>
            </label>
            <a href="#" className="text-sm text-primary hover:text-primary/80 transition-colors">
              Forgot password?
            </a>
          </motion.div>
        )}

        {isSignUp && (
          <motion.div className="flex items-center gap-2" variants={itemVariants}>
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="w-4 h-4 rounded border-border bg-input cursor-pointer"
            />
            <label htmlFor="agreeTerms" className="text-sm text-foreground">
              I agree to the{" "}
              <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                Terms of Service
              </a>
            </label>
          </motion.div>
        )}

        <motion.button
          type="submit"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg"
        >
          {isSignUp ? "Create Account" : "Sign In"}
        </motion.button>

        <motion.div className="text-center pt-2" variants={itemVariants}>
          <p className="text-foreground text-sm">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={onToggle}
              className="text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </motion.div>
      </form>
    </motion.div>
  )
}
