import AuthForm from '../components/AuthForm';

export default function SignIn() {
  return (
    <div className="background-container">
      <AuthForm isRegister={false} />
    </div>
  );
}
