import {
  CheckCircle,
  Award,
  Calendar
} from 'lucide-react';
import { Badge } from '../ui/badge';
import { useCustomHook } from '../../utils/customHooks';
import MUSTLogo from '../../assets/images/others/mustlogo.png';
import { ImageWithFallback } from '../../functions/imageWithFallback';

export function TrustSignals() {
  const { t } = useCustomHook();

  return (
    <section className="w-full py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium text-foreground mb-4">{t('TRUST_SIGNALS.TITLE')}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="text-center space-y-4">
            {/* <div className="w-16 h-16 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
              <ImageWithFallback
                src={MUSTLogo}
                alt="MUST Logo"
                className="w-12 h-12 object-cover rounded"
              />
            </div> */}
            <div>
              <h3 className="font-medium text-foreground">{t('TRUST_SIGNALS.OPTION_1.TITLE')}</h3>
              <p className="text-sm text-muted-foreground">{t('TRUST_SIGNALS.OPTION_1.DESCRIPTION')}</p>
            </div>
          </div>

          <div className="text-center space-y-4">
            {/* <div className="w-16 h-16 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
              <Calendar className="w-8 h-8 text-primary" />
            </div> */}
            <div>
              <h3 className="font-medium text-foreground">{t('TRUST_SIGNALS.OPTION_2.TITLE')}</h3>
              <p className="text-sm text-muted-foreground">{t('TRUST_SIGNALS.OPTION_2.DESCRIPTION')}</p>
            </div>
          </div>

          <div className="text-center space-y-4">
            {/* <div className="w-16 h-16 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
              <Award className="w-8 h-8 text-primary" />
            </div> */}
            <div>
              <h3 className="font-medium text-foreground">{t('TRUST_SIGNALS.OPTION_3.TITLE')}</h3>
              <p className="text-sm text-muted-foreground">{t('TRUST_SIGNALS.OPTION_3.DESCRIPTION')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}