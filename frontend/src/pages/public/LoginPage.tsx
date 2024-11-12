import { LoginForm } from "../../components/Auth/LoginForm";

export function LoginPage() {
  return (
    <div className="flex max-h-22 w-full items-center justify-center px-4 pt-24">
      <LoginForm />
      <div className="pt-16"></div>
    </div>
  )
}

export default LoginPage;
