
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '../ui/card';
import { 
  ArrowLeft, 
  MessageCircle, 
  Instagram,
  Mail,
  Send,
  Clock,
  Timer,
  Phone,
  ExternalLink,
  CheckCircle,
  MapPin,
  Calendar
} from 'lucide-react'
import {
  businessHours,
  contactMethods,
  whatsappNumber
} from '../../assets/constants';
import {
  handleClicks,
  handleWhatsAppOrder,
} from '../../functions/others';
import { toast } from 'sonner';
import { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useCustomHook } from '../../utils/customHooks';

interface ContactUsPageProps {
  onNavigate: (page: string) => void
}

export function ContactUsPage({
  onNavigate
}: ContactUsPageProps) {
  const { 
    t,
    isSubmitting,
    setIsSubmitting
   } = useCustomHook();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { name, email, message } = formData;

    // Construct the message
    const text = `Hi! I have an inquiries.\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
    const encodedText = encodeURIComponent(text)
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`

    // Open WhatsApp link in new tab
    window.open(whatsappUrl, '_blank')

    // Reset form and state
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' })
      setIsSubmitting(false)
      toast.success(t('SUBMIT_FORM_MESSAGE'));
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-ultra-light-green">
      {/* Header Section */}
      <section className="w-full py-12 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('home')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('BUTTONS.BACK_TO_HOME')}
            </Button>
          </div>
          
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-6">
              <Phone className="w-6 h-6 text-primary" />
              <Badge variant="secondary" className="text-sm">{t('GET_IN_TOUCH')}</Badge>
            </div>
            <h1 className="text-4xl lg:text-5xl font-medium text-foreground mb-6">
              {t('MENU_LIST.CONTACT_US')}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {t('HAVE_A_QUESTION_?')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="w-full py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-foreground mb-4">{t('CHOOSE_YOUR_PREFERRED_CONTACT')}</h2>
            <p className="text-muted-foreground">{t('WE_ARE_AVAILABLE_MULTIPLE_CHANNELS')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${method.bgColor} ${method.color}`}>
                    {method.icon}
                  </div>
                  <CardTitle className="text-xl">{t(method.title)}</CardTitle>
                  <p className="text-muted-foreground text-sm">{t(method.description)}</p>
                </CardHeader>

                <CardContent className="text-center space-y-4">
                  {/* <div className="font-medium text-foreground">
                    {method.contact}
                  </div> */}
                  
                  <div className="text-sm text-muted-foreground">
                    {t(method.responseTime)}
                  </div>

                  <Button className="w-full gap-2" onClick={method.action}>
                    <ExternalLink className="w-4 h-4" />
                    {t('CONTACT_VIA')} {t(method.title)}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="w-full py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Send className="w-5 h-5 text-primary" />
              <Badge variant="secondary">{t('CONTACT_FORM')}</Badge>
            </div>
            <h2 className="text-3xl font-medium text-foreground mb-4">{t("SEND_US_A_MESSAGE")}</h2>
            <p className="text-muted-foreground">{t('FILL_OUT_FORM_BELOW')}</p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">{t('GET_IN_TOUCH')}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('NAME')} *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t('NAME_PLACEHOLDER')}
                    required
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t('EMAIL')} *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t('EMAIL_PLACEHOLDER')}
                    required
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t('MESSAGE')} *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t('MESSAGE_PLACEHOLDER')}
                    required
                    className="w-full min-h-32 resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full gap-2" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t('SENDING')}...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {t('SEND_MESSAGE')}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Business Hours & Response Times */}
      <section className="w-full py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Business Hours */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  {t("BUSINESS_HOURS")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm mb-6">
                  {t("BUSINESS_HOURS_SUBTITLE")}
                </p>
                
                <div className="space-y-3">
                  {businessHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-border/50 last:border-b-0">
                      <span className="font-medium text-foreground">{t(schedule.day)}</span>
                      <span className="text-muted-foreground">{t(schedule.hours)}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">{t("TIME_ZONE")}</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    {t('MYT')}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Response Times */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                    <Timer className="w-5 h-5" />
                  </div>
                  {t("RESPONSE_TIMES")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm mb-6">
                  {t("RESPONSE_TIMES_SUBTITLE")}
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">{t("WHATSAPP_MESSAGES")}</div>
                      <div className="text-sm text-muted-foreground">{t("WHATSAPP_MESSAGES_SUBTITLE")}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">{t("TIKTOK")}</div>
                      <div className="text-sm text-muted-foreground">{t("TIKTOK_SUBTITLE")}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">{t("INSTAGRAM_DMS")}</div>
                      <div className="text-sm text-muted-foreground">{t("INSTAGRAM_DMS_SUBTITLE")}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">{t("EMAIL_CONTACT_FORM")}</div>
                      <div className="text-sm text-muted-foreground">{t("EMAIL_CONTACT_FORM_SUBTITLE")}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">{t("URGENT_SUPPORT_ISSUES")}</div>
                      <div className="text-sm text-muted-foreground">{t("URGENT_SUPPORT_ISSUES_SUBTITLE")}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">{t("WEEKEND_SUPPORT")}</span>
                  </div>
                  <p className="text-sm text-green-700">
                    {t("WEEKEND_SUPPORT_SUBTITLE")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="w-full py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Card className="p-8">
            <CardContent className="p-0 space-y-4">
              <div className="inline-flex items-center gap-2 mb-4">
                <MessageCircle className="w-5 h-5 text-primary" />
                <Badge variant="secondary">{t('QUICK_TIP')}</Badge>
              </div>
              
              <h3 className="text-xl font-medium text-foreground">{t('NEED_IMMEDIATE_HELP?')}</h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {t('NEED_IMMEDIATE_HELP?_SUBTITLE')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  onClick={() =>handleWhatsAppOrder('contactUs')}
                  className="gap-2 bg-green-600 hover:bg-green-700"
                >
                  <MessageCircle className="w-4 h-4" />
                  {t('BUTTONS.WHATSAPP_US_NOW')}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleClicks('email')}
                  className="gap-2"
                  style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}
                >
                  <Mail className="w-4 h-4" />
                  {t('BUTTONS.SEND_EMAIL')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}