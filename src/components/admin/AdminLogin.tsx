
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../ui/card';
import {
  Lock,
  User,
  Eye, 
  EyeOff,
  Globe,
  Check,
  ChevronDown
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { toast } from 'sonner';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button'
import { motion } from 'motion/react';
import { languages } from '../../assets/constants';
import { useCustomHook } from '../../utils/customHooks';

interface AdminLoginProps {
  onLogin: () => void
  currentLanguage: string
  onLanguageChange: (language: string) => void
}
export function AdminLogin({
  onLogin,
  currentLanguage,
  onLanguageChange
}: AdminLoginProps) {
  const {
    t,
    username,
    setUsername,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isLoading,
    setIsLoading,
    getCurrentLanguage
  } = useCustomHook()
  
  // Default admin credentials (in production, this should be handled securely with backend)
  const ADMIN_USERNAME = 'admin'
  const ADMIN_PASSWORD = 'veyra2025'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication delay
    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        localStorage.setItem('veyra_admin_token', 'authenticated')
        localStorage.setItem('veyra_admin_user', username)
        toast.success(t('MESSAGES.SUCCESS_LOGIN'), {
          description: t('PAGE.ADMIN_LOGIN.WELCOME_ADMIN_DASHBOARD_TITLE'),
        })
        onLogin()
      } else {
        toast.error(t('MESSAGES.ERROR_LOGIN_FAILED'), {
          description: t('MESSAGES.ERROR_LOGIN_FAILED_MESSAGE'),
        })
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4 relative">
      {/* Language Selector - Top Right */}
      <div className="absolute top-4 right-4 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 px-3 text-sm bg-white">
              <Globe className="w-4 h-4" />
              <span className="flex items-center gap-2">
                <span>{getCurrentLanguage().code}</span>
              </span>
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {languages.map((language) => (
              <DropdownMenuItem
                key={language.code}
                onClick={() => onLanguageChange(language.code)}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-medium">{language.name}</div>
                  </div>
                </div>
                {currentLanguage === language.code && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-2 shadow-xl">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">{t('ADMIN_LOGIN_TITLE')}</CardTitle>
              <CardDescription className="mt-2">
                {t('ADMIN_LOGIN_SUBTITLE')}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">
                  <User className="w-4 h-4 text-muted-foreground" />
                  {t('USERNAME')}
                  </Label>
                <div className="relative">
                  <Input
                    id="username"
                    type="text"
                    placeholder={t('PLACEHOLDERS.USERNAME')}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                  {t('PASSWORD')}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('PLACEHOLDERS.PASSWORD')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? t('BUTTONS.LOGIN_IN') : t('BUTTONS.LOGIN')}
              </Button>
            </form>

            {/* CAN REMOVE IF NOT USE SOON */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground text-center">
                Demo Credentials:<br />
                <span className="font-medium">Username: admin</span><br />
                <span className="font-medium">Password: veyra2025</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}