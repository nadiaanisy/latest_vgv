import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetTrigger
} from '../ui/sheet';
import {
  Menu,
  Check,
  Globe,
  ChevronDown
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import {
  languages,
  navigationItems
} from '../../assets/constants';
import { Button } from '../ui/button';
import { useCustomHook } from '../../utils/customHooks';
import vlogo from '../../assets/images/others/vlogo.png';
import { ImageWithFallback } from '../../functions/imageWithFallback';

interface HeaderProps {
  currentPage: string
  onNavigate: (page: string) => void
  currentLanguage: string
  onLanguageChange: (language: string) => void
}

export function Header({
  currentPage,
  onNavigate,
  currentLanguage,
  onLanguageChange
}: HeaderProps) {
  const {
    t,
    mobileMenuOpen,
    setMobileMenuOpen,
    getCurrentLanguage
  } = useCustomHook();

  const handleNavigateAndClose = (page: string) => {
    onNavigate(page)
    setMobileMenuOpen(false)
  }

  return (
    <header className="w-full px-4 sm:px-6 py-4 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side - Logo and Mobile Menu */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button - Only visible on mobile */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="lg:hidden p-2">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 sm:w-96">
              <SheetHeader className="pb-6">
                <SheetTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                    <ImageWithFallback 
                      src={vlogo}
                      alt="Veyra Global Ventures Logo"
                      className="w-full h-full object-cover rounded-sm"
                    />
                  </div>
                  {t('COMPANY_NAME')}
                </SheetTitle>
              </SheetHeader>
              
              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <Button
                    key={item.key}
                    variant={currentPage === item.key ? 'default' : 'ghost'}
                    onClick={() => handleNavigateAndClose(item.key)}
                    className="w-full justify-start"
                  >
                    {t(item.label)}
                  </Button>
                ))}
              </nav>

              {/* Mobile Language Selector */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="text-sm font-bold text-muted-foreground mb-3 m-[10px]">{t('CHOICE_OF_LANGUAGE')}</div>
                <div className="space-y-2">
                  {languages.map((language) => (
                    <Button
                      key={language.code}
                      variant={currentLanguage.toUpperCase() === language.code ? 'default' : 'ghost'}
                      onClick={() => onLanguageChange(language.code)}
                      className="w-full justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span>{language.name}</span>
                      </div>
                      {currentLanguage.toUpperCase() === language.code && (
                        <Check className="w-4 h-4" />
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <div className="flex items-center gap-3 hover:cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center p-1 overflow-hidden">
              <ImageWithFallback 
                src={vlogo}
                alt="Veyra Global Ventures Logo"
                className="w-full h-full object-cover rounded-sm"
              />
            </div>
            <h1 className="text-lg sm:text-xl font-medium text-foreground">{t('COMPANY_NAME')}</h1>
          </div>
        </div>

        {/* Right side - Desktop Navigation and Language Selector */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Desktop Navigation */}
          <nav className="flex items-center gap-3">
            {navigationItems.map((item) => (
              <Button
                key={item.key}
                variant={currentPage === item.key ? 'default' : 'ghost'}
                onClick={() => onNavigate(item.key)}
                className="px-3 text-sm"
              >
                {t(item.label)}
              </Button>
            ))}
          </nav>

          {/* Desktop Language Selector */}
          <div className="border-l border-border pl-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-3 text-sm">
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
        </div>
      </div>
    </header>
  )
}