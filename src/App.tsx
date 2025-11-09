import './utils/i18';
import { useEffect } from 'react';
import { Toaster } from './components/ui/sooner';
import { useCustomHook } from './utils/customHooks';

import { Header } from './components/sections/Header';
import { HomePage } from './components/pages/HomePage';
import { AboutUsPage } from './components/pages/AboutUsPage';
import { ProductsPage } from './components/pages/ProductsPage';
import { ContactUsPage } from './components/pages/ContactUsPage';
import { SplashScreen } from './components/sections/SplashScreen';
import { TestimonialPage } from './components/pages/TestimonialPage';
import { BackgroundMusic } from './components/sections/BackgroundMusic';

/* ADMIN PAGES */
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

export default function App() {
  const {
    currentPage,
    currentLanguage,
    handleLanguageChange,
    isAdminRoute,
    isAdminAuthenticated,
    setIsAdminRoute,
    setIsAdminAuthenticated,
    handleNavigate,
    selectedProductId,
    showSplash,
    setShowSplash,
    splashCompleted,
    setSplashCompleted,
  } = useCustomHook();

   /* Check for admin route and authentication on mount */
  useEffect(() => {
    const path = window.location.hash || window.location.pathname
    const isAdmin = path.includes('admin')
    setIsAdminRoute(isAdmin)
    
    if (isAdmin) {
      const token = localStorage.getItem('veyra_admin_token')
      setIsAdminAuthenticated(token === 'authenticated')
      setShowSplash(false)
    }
  }, [setIsAdminRoute, setIsAdminAuthenticated, setShowSplash])

  /* Listen for hash changes to handle admin navigation */
  useEffect(() => {
    const handleHashChange = () => {
      const path = window.location.hash || window.location.pathname
      const isAdmin = path.includes('admin')
      setIsAdminRoute(isAdmin)
      
      if (isAdmin) {
        const token = localStorage.getItem('veyra_admin_token')
        setIsAdminAuthenticated(token === 'authenticated')
        setShowSplash(false)
      } else {
        setShowSplash(false)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [setIsAdminAuthenticated, setIsAdminRoute, setShowSplash])

  /* Keyboard shortcut to access admin (Ctrl/Cmd + Shift + A) */
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault()
        window.location.hash = 'admin'
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case 'about-us':
        return <AboutUsPage onNavigate={handleNavigate} />
      case 'products':
        return <ProductsPage
          onNavigate={handleNavigate}
          selectedProductId={selectedProductId} 
        />
      case 'testimonial':
        return <TestimonialPage onNavigate={handleNavigate} />
      case 'contact-us':
        return <ContactUsPage onNavigate={handleNavigate} />
      case 'home':
      default:
        return <HomePage onNavigate={handleNavigate} />
    }
  };

  const handleSplashComplete = () => {
    setShowSplash(false)
    setSplashCompleted(true)
  }

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true)
  }

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false)
    window.location.hash = ''
  }

  /* If admin route, show admin interface */
  if (isAdminRoute) {
    return (
      <div className="size-full min-h-screen bg-background">
        {isAdminAuthenticated ? (
          <AdminDashboard
            onLogout={handleAdminLogout}
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
          />
        ) : (
          <AdminLogin
            onLogin={handleAdminLogin}
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
          />
        )}
        <Toaster position="bottom-right" richColors />
      </div>
    )
  }

  /* Else, show main application interface */
  return (
    <div className="size-full min-h-screen watermark-background">
      {/* Splash Screen */}
      {showSplash && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}

      {/* Main App Content */}
      {!showSplash && (
        <>
          <Header 
            currentPage={currentPage} 
            onNavigate={handleNavigate}
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
          />
          {renderPage()}

        <Toaster position="top-right" richColors />
      </>
      )}

      {/* Background Music - Always available after splash */}
      {splashCompleted && (
        <BackgroundMusic youtubeId="htk6MRjmcnQ" autoPlay={true} initialVolume={0.5} />
      )}
    </div>
  )
}
