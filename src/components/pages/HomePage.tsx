import {
  useState,
  useEffect
} from 'react';
import { Info } from 'lucide-react';
import { Button } from '../ui/button';
import { Main } from '../sections/Main';
import { Teams } from '../sections/Teams';
import { TrustSignals } from '../sections/TrustSignals';
import { VisionMission } from '../sections/VisionMission';
import { WelcomeOverlay } from '../sections/WelcomeOverlay';
import { useCustomHook } from '../../utils/customHooks';

interface HomePageProps {
  onNavigate: (page: string, productId?: string) => void
  products: any[]
}
export function HomePage({
  onNavigate,
  products
}: HomePageProps) {
  const { t } = useCustomHook();
  const [showWelcomeOverlay, setShowWelcomeOverlay] = useState(false);

  useEffect(() => {
    // Check if user has seen the welcome overlay before
    const hasSeenWelcome = localStorage.getItem('veyra-welcome-seen')
    
    if (!hasSeenWelcome) {
      // Show overlay after a brief delay
      const timer = setTimeout(() => {
        setShowWelcomeOverlay(true)
      }, 1000)
      
      return () => clearTimeout(timer)
    }

    // Add keyboard shortcut to replay welcome (Ctrl/Cmd + W)
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'w' && e.shiftKey) {
        e.preventDefault()
        setShowWelcomeOverlay(true)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, []);

  const handleCloseWelcome = () => {
    setShowWelcomeOverlay(false)
    // Mark as seen so it doesn't show again
    localStorage.setItem('veyra-welcome-seen', 'true')
  }

  const handleReplayWelcome = () => {
    setShowWelcomeOverlay(true)
  }

  return (
    <main className="bg-ultra-light-green">
      <Main
        onNavigate={onNavigate}
        products={products}
      />
      <VisionMission />
      <Teams />
      <TrustSignals />
      
      {/* Replay Welcome Button - Hidden until user has seen it once */}
      {localStorage.getItem('veyra-welcome-seen') && (
        <Button
          onClick={handleReplayWelcome}
          variant="outline"
          size="sm"
          className="fixed bottom-6 right-6 z-40 bg-white/90 backdrop-blur-sm shadow-lg border-primary/20 hover:bg-white"
          title="Replay welcome animation (Ctrl+Shift+W)"
        >
          <Info className="w-4 h-4 mr-2" />
          {t('WELCOME_TOUR_TITLE')}
        </Button>
      )}
      
      <WelcomeOverlay 
        isVisible={showWelcomeOverlay}
        onClose={handleCloseWelcome}
      />
    </main>
  )
}