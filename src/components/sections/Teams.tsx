import {
  Card,
  CardContent
} from '../ui/card';
import {
  Avatar,
  AvatarImage,
  AvatarFallback
} from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Users } from 'lucide-react';
import { teamMembers } from '../../assets/constants';
import { useCustomHook } from '../../utils/customHooks';

export function Teams() {
  const { t } = useCustomHook();

  return (
    <section className="w-full py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Users className="w-6 h-6 text-primary" />
            <Badge variant="secondary">{t('TEAM.MEET_THE_TEAM')}</Badge>
          </div>
          <h2 className="text-3xl font-medium text-foreground mb-4">{t('TEAM.TITLE')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('TEAM.DESCRIPTION')}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/4 flex justify-center">
              <Card key={index} className="text-center p-6 w-full max-w-sm hover:shadow-lg transition-shadow">
                <CardContent className="p-0 space-y-4">
                  <Avatar className="w-20 h-20 mx-auto">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-foreground">{member.name}</h3>
                    <p className="text-sm text-primary font-medium">{t(member.role)}</p>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                      {t(member.assignmentInsight)}
                    </p>
                  </div>
                  <div className="space-y-2">
                    {member.keyStrengths.map((strength, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs mx-1">
                        {t(strength)}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}