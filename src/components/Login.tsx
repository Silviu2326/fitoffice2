import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Dumbbell, UserCheck } from 'lucide-react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const { signIn, signUp, signInDemo } = useAuth();

  // Datos de prueba
  const demoUsers = [
    {
      email: 'trainer@fitoffice.com',
      password: 'password123',
      fullName: 'María González',
      role: 'Entrenadora Principal'
    },
    {
      email: 'carlos@fitoffice.com',
      password: 'password123',
      fullName: 'Carlos Rodríguez',
      role: 'Entrenador de Fuerza'
    },
    {
      email: 'admin@fitoffice.com',
      password: 'admin123',
      fullName: 'Admin FitOffice',
      role: 'Administrador'
    }
  ];

  const fillDemoData = (userIndex = 0) => {
    const demoUser = demoUsers[userIndex];
    setEmail(demoUser.email);
    setPassword(demoUser.password);
    setFullName(demoUser.fullName);
    setIsDemoMode(true);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Modo demo - simular login exitoso
      if (isDemoMode) {
        const demoUser = demoUsers.find(user => user.email === email);
        if (demoUser) {
          const { error } = await signInDemo(email, password, demoUser.fullName, demoUser.role);
          if (error) throw error;
          
          // El contexto ya maneja el estado, solo mostramos mensaje de éxito
          console.log('🎭 Login demo exitoso, usuario debería estar autenticado');
          setError(`✅ Modo Demo: Bienvenido ${demoUser.fullName} (${demoUser.role})`);
          
          // Pequeño delay para que se vea el mensaje antes de redirigir
          setTimeout(() => {
            setError('');
          }, 2000);
          return;
        }
      }

      // Modo normal con Supabase
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

            {/* Botones de datos de prueba */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <UserCheck className="w-4 h-4 text-primary" />
                <span className="text-body-small font-medium text-text-primary">Datos de Prueba</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <button
                  type="button"
                  onClick={() => fillDemoData(0)}
                  className="flex items-center justify-between p-3 bg-primary-50 border border-primary-200 rounded-lg hover:bg-primary-100 transition-colors"
                >
                  <div className="text-left">
                    <div className="text-body-small font-medium text-primary">María González</div>
                    <div className="text-caption text-primary-600">Entrenadora Principal</div>
                  </div>
                  <div className="text-caption text-primary-500">trainer@fitoffice.com</div>
                </button>
                
                <button
                  type="button"
                  onClick={() => fillDemoData(1)}
                  className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <div className="text-left">
                    <div className="text-body-small font-medium text-blue-700">Carlos Rodríguez</div>
                    <div className="text-caption text-blue-600">Entrenador de Fuerza</div>
                  </div>
                  <div className="text-caption text-blue-500">carlos@fitoffice.com</div>
                </button>
                
                <button
                  type="button"
                  onClick={() => fillDemoData(2)}
                  className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <div className="text-left">
                    <div className="text-body-small font-medium text-green-700">Admin FitOffice</div>
                    <div className="text-caption text-green-600">Administrador</div>
                  </div>
                  <div className="text-caption text-green-500">admin@fitoffice.com</div>
                </button>
              </div>
              
              {isDemoMode && (
                <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="text-caption text-amber-700">
                    🎭 <strong>Modo Demo:</strong> Los datos se rellenaron automáticamente. 
                    El login será simulado sin conectar a Supabase.
                  </div>
                </div>
              )}
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
                <div className={`px-4 py-3 rounded-lg text-body-small ${
                  error.startsWith('✅') 
                    ? 'bg-success-light border border-success text-success' 
                    : 'bg-error-light border border-error text-error'
                }`}>
                  {error}
                </div>
              )}

              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary btn-lg w-full"
                >
                  {loading ? 'Procesando...' : isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                </button>
                
                {isDemoMode && (
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('');
                      setPassword('');
                      setFullName('');
                      setIsDemoMode(false);
                      setError('');
                    }}
                    className="btn-secondary btn-sm w-full"
                  >
                    Limpiar Campos y Salir del Modo Demo
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
