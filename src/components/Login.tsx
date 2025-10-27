import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Dumbbell } from 'lucide-react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) throw error;
      } else {
        if (!fullName.trim()) {
          throw new Error('Por favor ingresa tu nombre completo');
        }
        const { error } = await signUp(email, password, fullName);
        if (error) throw error;
      }
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-background to-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-background rounded-2xl shadow-2xl overflow-hidden">
          {/* Header con sistema de diseño */}
          <div className="bg-gradient-to-r from-primary to-primary-600 p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-background rounded-full mb-4 shadow-lg">
              <Dumbbell className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-h2 font-bold text-white">ERP Entrenadores</h1>
            <p className="text-body-small text-primary-50 mt-2">Gestiona tu negocio fitness</p>
          </div>

          <div className="p-8">
            {/* Tabs según sistema de diseño */}
            <div className="flex rounded-lg bg-surface-2 p-1 mb-6">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all duration-normal ${
                  isLogin
                    ? 'bg-background text-text-primary shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Iniciar Sesión
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all duration-normal ${
                  !isLogin
                    ? 'bg-background text-text-primary shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Registrarse
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label htmlFor="fullName" className="block text-body-small font-medium text-text-primary mb-2">
                    Nombre Completo
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="input-base input-lg"
                    placeholder="Juan Pérez"
                    required={!isLogin}
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-body-small font-medium text-text-primary mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-base input-lg"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-body-small font-medium text-text-primary mb-2">
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-base input-lg"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>

              {error && (
                <div className="bg-error-light border border-error text-error px-4 py-3 rounded-lg text-body-small">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary btn-lg w-full"
              >
                {loading ? 'Procesando...' : isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
