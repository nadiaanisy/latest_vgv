import {
  Card,
  CardContent
} from '../ui/card';
import { useCustomHook } from '../../utils/customHooks';

export function VisionMission() {
  const { t } = useCustomHook();

  return (
    <section className="w-full py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8">
            <CardContent className="p-0 space-y-4">
              <h2 className="text-2xl font-medium text-foreground">{t('VISION_TITLE')}</h2>
              <p className="text-muted-foreground">
                {t('VISION_DESCRIPTION')}
              </p>
            </CardContent>
          </Card>
          <Card className="p-8">
            <CardContent className="p-0 space-y-4">
              <h2 className="text-2xl font-medium text-foreground">{t('MISSION_TITLE')}</h2>
              <p className="text-muted-foreground">
                {t('MISSION_DESCRIPTION')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}