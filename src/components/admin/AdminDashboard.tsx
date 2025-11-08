import {
  Card,
  CardContent
} from '../ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '../ui/tabs';
import {
  Check,
  ChevronDown,
  Globe,
  LogOut,
  Package,
  MessageSquare,
  BarChart3
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@radix-ui/react-dropdown-menu';
import { languages } from '../../assets/constants';
import { useCustomHook } from '../../utils/customHooks';
import vlogo from '../../assets/images/others/vlogo.png';
import { ImageWithFallback } from '../../functions/imageWithFallback';
// import { AdminAnalytics } from './AdminAnalytics';
import { AdminProductManagement } from './AdminProductManagement';
import { AdminTestimonialManagement } from './AdminTestimonialManagement';

interface AdminDashboardProps {
  onLogout: () => void
  currentLanguage: string
  onLanguageChange: (language: string) => void
}
export function AdminDashboard({
  onLogout,
  currentLanguage,
  onLanguageChange
}: AdminDashboardProps) {
  const {
    t,
    activeTab,
    setActiveTab,
    getCurrentLanguage
  } = useCustomHook();

  const adminUser = localStorage.getItem('veyra_admin_user') || 'Admin';

  const handleLogout = () => {
    localStorage.removeItem('veyra_admin_token')
    localStorage.removeItem('veyra_admin_user')
    toast.success(t('MESSAGES.SUCCESS_LOGOUT'))
    onLogout()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                  <ImageWithFallback 
                      src={vlogo}
                      alt="Veyra Global Ventures Logo"
                      className="w-full h-full object-cover rounded-sm"
                    />
                </div>
                <div>
                  <h1 className="text-xl font-medium text-foreground">{t('ADMIN_VEYRA_PORTAL_TITLE')}</h1>
                  <p className="text-xs text-muted-foreground">{t('ADMIN_VEYRA_PORTAL_SUBTITLE')}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-foreground">{adminUser}</p>
                <p className="text-xs text-muted-foreground">{t('ADMINISTRATOR')}</p>
              </div>
              
              {/* Language Selector */}
              <div className="border-l border-border pl-2 sm:pl-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 px-2 sm:px-3 text-sm">
                      <Globe className="w-4 h-4" />
                      <span className="hidden sm:flex items-center gap-2">
                        <span>{getCurrentLanguage().code}</span>
                      </span>
                      <ChevronDown className="w-3 h-3 hidden sm:block" />
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

              <Button
                variant="outline"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">{t('BUTTONS.LOGOUT')}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navigation Tabs */}
          <Card className="border-2 shadow-sm">
            <CardContent className="p-2">
              <TabsList className="grid w-full grid-cols-3 lg:flex lg:justify-start gap-2 bg-transparent">
                <TabsTrigger
                  value="analytics"
                  className="gap-2 data-[state=active]:bg-primary data-[state=active]:!text-white"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('ANALYTICS')} PENDING</span>
                  <span className="sm:hidden">{t('STATS')}</span>
                </TabsTrigger>
                <TabsTrigger
                  value="products"
                  className="gap-2 data-[state=active]:bg-primary data-[state=active]:!text-white"
                >
                  <Package className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('PRODUCTS')}</span>
                  <span className="sm:hidden">{t('ITEMS_CAPITAL')}</span>
                </TabsTrigger>
                <TabsTrigger
                  value="testimonials"
                  className="gap-2 data-[state=active]:bg-primary data-[state=active]:!text-white"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('TESTIMONIALS')}</span>
                  <span className="sm:hidden">{t('REVIEW')}</span>
                </TabsTrigger>
              </TabsList>
            </CardContent>
          </Card>

          {/* Tab Content */}
          {/* <TabsContent value="analytics" className="space-y-6">
            <AdminAnalytics />
          </TabsContent> */}

          <TabsContent value="products" className="space-y-6">
            <AdminProductManagement />
          </TabsContent>

          <TabsContent value="testimonials" className="space-y-6">
            <AdminTestimonialManagement />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>© 2025 Veyra Global Ventures. All rights reserved.</p>
            <p className="hidden sm:block">Admin Management Portal v1.0</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

