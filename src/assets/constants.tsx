// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Baby,
  Waves,
  Heart,
  DollarSign,
  Instagram,
  Mail,
  Megaphone,
  MessageCircle,
  Phone,
  TrendingUp,
  Users,
  Music2,
  Facebook,
  Scroll,
  HandHelping,
  BadgePercent,
  Handshake,
  Blocks,
  CalendarSync,
  Spotlight,
  Target,
  TrendingDown,
  Cog,
  Globe,
  Lightbulb
} from 'lucide-react'
import { handleClicks, handleWhatsAppOrder } from '../functions/others';

export const email = "veyraglobalventuressdnbhd@gmail.com";
export const fb = "https://www.facebook.com/share/1AsNBwPqTN/?mibextid=wwXIfr";
export const whatsappNumber = "+60133461673";
export const instagramHandle = "veyraglobalventures";
export const titktokHandle = "veyraglobalventures";
export const ERROR_IMG_SRC = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';
export const defaultUserImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGZpbGw9IiNlNWU3ZWIiLz48cGF0aCBkPSJNNTAgNTBjOC4yODQgMCAxNS02LjcxNiAxNS0xNXMtNi43MTYtMTUtMTUtMTUtMTUgNi43MTYtMTUgMTUgNi43MTYgMTUgMTUgMTV6bTAgNWMtMTAgMC0zMCA1LTMwIDE1djEwaDYwVjcwYzAtMTAtMjAtMTUtMzAtMTV6IiBmaWxsPSIjOWNhM2FmIi8+PC9zdmc+';

export const db = {
  table: {
    testimonials: 'testimonials',
    products: 'products'
  },
  query: {
    all: '*'
  }
};

export const languages = [
  { code: 'EN', name: 'English'},
  { code: 'BM', name: 'Bahasa Malaysia'}
];

export const malaysianStates = [
  'Johor', 'Kedah', 'Kelantan', 'Kuala Lumpur', 'Labuan', 'Melaka', 
  'Negeri Sembilan', 'Pahang', 'Penang', 'Perak', 'Perlis', 'Putrajaya',
  'Sabah', 'Sarawak', 'Selangor', 'Terengganu'
];

export const navigationItems = [
  { key: 'home', label: 'MENU_LIST.HOME' },
  { key: 'about-us', label: 'MENU_LIST.ABOUT_US' },
  { key: 'products', label: 'MENU_LIST.PRODUCTS' },
  { key: 'testimonial', label: 'MENU_LIST.TESTIMONIAL' },
  { key: 'contact-us', label: 'MENU_LIST.CONTACT_US' }
];

export const whatWorked = [
  {
    icon: <Scroll className="w-5 h-5" />,
    title: "WHAT_WORKED_SECTION.TITLE_ONE",
    description: "WHAT_WORKED_SECTION.DESCRIPTION_ONE",
    metrics: "WHAT_WORKED_SECTION.METRICS_ONE"
  },
  {
    icon: <HandHelping className="w-5 h-5" />,
    title: "WHAT_WORKED_SECTION.TITLE_TWO",
    description: "WHAT_WORKED_SECTION.DESCRIPTION_TWO",
    metrics: "WHAT_WORKED_SECTION.METRICS_TWO"
  },
  {
    icon: <BadgePercent className="w-5 h-5" />,
    title: "WHAT_WORKED_SECTION.TITLE_THREE",
    description: "WHAT_WORKED_SECTION.DESCRIPTION_THREE",
    metrics: "WHAT_WORKED_SECTION.METRICS_THREE"
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "WHAT_WORKED_SECTION.TITLE_FOUR",
    description: "WHAT_WORKED_SECTION.DESCRIPTION_FOUR",
    metrics: "WHAT_WORKED_SECTION.METRICS_FOUR"
  },
  {
    icon: <Handshake className="w-5 h-5" />,
    title: "WHAT_WORKED_SECTION.TITLE_FIVE",
    description: "WHAT_WORKED_SECTION.DESCRIPTION_FIVE",
    metrics: "WHAT_WORKED_SECTION.METRICS_FIVE"
  },
];

export const whatDidntWork = [
  {
    icon: <Blocks className="w-5 h-5" />,
    title: "WHAT_DIDNT_WORKED_SECTION.TITLE_ONE",
    description: "WHAT_DIDNT_WORKED_SECTION.DESCRIPTION_ONE",
    impact: "WHAT_DIDNT_WORKED_SECTION.IMPACT_ONE",
    lesson: "WHAT_DIDNT_WORKED_SECTION.LESSON_ONE"
  },
  {
    icon: <CalendarSync className="w-5 h-5" />,
    title: "WHAT_DIDNT_WORKED_SECTION.TITLE_TWO",
    description: "WHAT_DIDNT_WORKED_SECTION.DESCRIPTION_TWO",
    impact: "WHAT_DIDNT_WORKED_SECTION.IMPACT_TWO",
    lesson: "WHAT_DIDNT_WORKED_SECTION.LESSON_TWO"
  },
  {
    icon: <Spotlight className="w-5 h-5" />,
    title: "WHAT_DIDNT_WORKED_SECTION.TITLE_THREE",
    description: "WHAT_DIDNT_WORKED_SECTION.DESCRIPTION_THREE",
    impact: "WHAT_DIDNT_WORKED_SECTION.IMPACT_THREE",
    lesson: "WHAT_DIDNT_WORKED_SECTION.LESSON_THREE"
  }
];

export const successFactors = [
  {
    main: 'SUCCESS_FACTORS_SECTION.MAIN_POINT_1',
    factor: 'SUCCESS_FACTORS_SECTION.POINT_1',
  },
  {
    main: 'SUCCESS_FACTORS_SECTION.MAIN_POINT_2',
    factor: 'SUCCESS_FACTORS_SECTION.POINT_2',
  },
  {
    main: 'SUCCESS_FACTORS_SECTION.MAIN_POINT_3',
    factor: 'SUCCESS_FACTORS_SECTION.POINT_3',
  },
  {
    main: 'SUCCESS_FACTORS_SECTION.MAIN_POINT_4',
    factor: 'SUCCESS_FACTORS_SECTION.POINT_4',
  }
];

export const areasImprovement = [
  "AREAS_OF_IMPROVEMENT_SECTION.POINT_1",
  "AREAS_OF_IMPROVEMENT_SECTION.POINT_2",
  "AREAS_OF_IMPROVEMENT_SECTION.POINT_3"
];

export const businessHours = [
  { day: "MONDAY_FRIDAY", hours: "9-6" },
  { day: "SATURDAY", hours: "10-4" },
  { day: "SUNDAY", hours: "CLOSED" }
];

export const contactMethods = [
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "WhatsApp",
    description: "QUICK_RESPONSE",
    contact: whatsappNumber,
    action: () => handleWhatsAppOrder('contactUs'),
    color: "text-green-600",
    bgColor: "bg-green-50",
    responseTime: "USUALLY_IN_AN_HOUR"
  },
  {
    icon: <Music2 className="w-6 h-6" />,
    title: "TikTok",
    description: "CONNECT_WITH_US_ON_SM",
    contact: titktokHandle,
    action: () => handleClicks('tiktok'),
    color: "text-white",
    bgColor: "bg-black",
    responseTime: "USUALLY_IN_4_HOUR"
  },
  {
    icon: <Instagram className="w-6 h-6" />,
    title: "Instagram DM",
    description: "CONNECT_WITH_US_ON_SM",
    contact: instagramHandle,
    action: () => handleClicks('instagram'),
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    responseTime: "USUALLY_IN_4_HOUR"
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "EMAIL",
    description: "FOR_DETAILED_INQUIRIES",
    contact: email,
    action: () => handleClicks('email'),
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    responseTime: "USUALLY_IN_24_HOURS"
  },
  {
    icon: <Facebook className="w-6 h-6" />,
    title: "Facebook",
    description: "FOR_DETAILED_INQUIRIES",
    contact: 'VEYRAGLOBALVENTURES',
    action: () => handleClicks('fb'),
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    responseTime: "USUALLY_IN_24_HOURS"
  }
];

export const businessSections = [
  {
    border: "border-l-4 border-l-primary",
    title: "BUSINESS_MODEL_SECTION.VALUE_PROPOSITION",
    icon: <Lightbulb className="w-6 h-6" />,
    content: "BUSINESS_MODEL_SECTION.VALUE_PROPOSITION_DESCRIPTION",
    highlights: [
      "BUSINESS_MODEL_SECTION.VALUE_PROPOSITION_INDEX.ONE",
      "BUSINESS_MODEL_SECTION.VALUE_PROPOSITION_INDEX.TWO",
      "BUSINESS_MODEL_SECTION.VALUE_PROPOSITION_INDEX.THREE",
      "BUSINESS_MODEL_SECTION.VALUE_PROPOSITION_INDEX.FOUR"
    ],
  },
  {
    border: "border-l-4 border-l-blue-500",
    title: "BUSINESS_MODEL_SECTION.CUSTOMER_SEGMENTS", 
    icon: <Users className="w-6 h-6" />,
    content: "BUSINESS_MODEL_SECTION.CUSTOMER_SEGMENTS_DESCRIPTION",
    highlights: [
      "BUSINESS_MODEL_SECTION.CUSTOMER_SEGMENTS_INDEX.ONE",
      "BUSINESS_MODEL_SECTION.CUSTOMER_SEGMENTS_INDEX.TWO",
      "BUSINESS_MODEL_SECTION.CUSTOMER_SEGMENTS_INDEX.THREE",
      "BUSINESS_MODEL_SECTION.CUSTOMER_SEGMENTS_INDEX.FOUR"
    ],
  },
  {
    border: "border-l-4 border-l-green-500",
    title: "BUSINESS_MODEL_SECTION.CHANNELS",
    icon: <Globe className="w-6 h-6" />,
    content: "BUSINESS_MODEL_SECTION.CHANNELS_DESCRIPTION",
    highlights: [
      "BUSINESS_MODEL_SECTION.CHANNELS_INDEX.ONE",
      "BUSINESS_MODEL_SECTION.CHANNELS_INDEX.TWO",
      "BUSINESS_MODEL_SECTION.CHANNELS_INDEX.THREE",
      "BUSINESS_MODEL_SECTION.CHANNELS_INDEX.FOUR"
    ],
  },
  {
    border: "border-l-4 border-l-pink-500",
    title: "BUSINESS_MODEL_SECTION.CUSTOMER_RELATIONSHIPS",
    icon: <Heart className="w-6 h-6" />,
    content: "BUSINESS_MODEL_SECTION.CUSTOMER_RELATIONSHIPS_DESCRIPTION",
    highlights: [
      "BUSINESS_MODEL_SECTION.CUSTOMER_RELATIONSHIPS_INDEX.ONE",
      "BUSINESS_MODEL_SECTION.CUSTOMER_RELATIONSHIPS_INDEX.TWO",
      "BUSINESS_MODEL_SECTION.CUSTOMER_RELATIONSHIPS_INDEX.THREE",
      "BUSINESS_MODEL_SECTION.CUSTOMER_RELATIONSHIPS_INDEX.FOUR"
    ],
  },
  {
    border: "border-l-4 border-l-yellow-500",
    title: "BUSINESS_MODEL_SECTION.REVENUE_STREAMS",
    icon: <DollarSign className="w-6 h-6" />,
    content: "BUSINESS_MODEL_SECTION.REVENUE_STREAMS_DESCRIPTION",
    highlights: [
      "BUSINESS_MODEL_SECTION.REVENUE_STREAMS_INDEX.ONE",
      "BUSINESS_MODEL_SECTION.REVENUE_STREAMS_INDEX.TWO",
      "BUSINESS_MODEL_SECTION.REVENUE_STREAMS_INDEX.THREE",
      "BUSINESS_MODEL_SECTION.REVENUE_STREAMS_INDEX.FOUR"
    ],
  },
  {
    border: "border-l-4 border-l-purple-500",
    title: "BUSINESS_MODEL_SECTION.KEY_RESOURCES",
    icon: <Cog className="w-6 h-6" />,
    content: "BUSINESS_MODEL_SECTION.KEY_RESOURCES_DESCRIPTION",
    highlights: [
      "BUSINESS_MODEL_SECTION.KEY_RESOURCES_INDEX.ONE",
      "BUSINESS_MODEL_SECTION.KEY_RESOURCES_INDEX.TWO",
      "BUSINESS_MODEL_SECTION.KEY_RESOURCES_INDEX.THREE",
      "BUSINESS_MODEL_SECTION.KEY_RESOURCES_INDEX.FOUR"
    ],
  },
  {
    border: "border-l-4 border-l-indigo-500",
    title: "BUSINESS_MODEL_SECTION.KEY_ACTIVITIES",
    icon: <Cog className="w-6 h-6" />,
    content: "BUSINESS_MODEL_SECTION.KEY_ACTIVITIES_DESCRIPTION",
    highlights: [
      "BUSINESS_MODEL_SECTION.KEY_ACTIVITIES_INDEX.ONE",
      "BUSINESS_MODEL_SECTION.KEY_ACTIVITIES_INDEX.TWO",
      "BUSINESS_MODEL_SECTION.KEY_ACTIVITIES_INDEX.THREE",
      "BUSINESS_MODEL_SECTION.KEY_ACTIVITIES_INDEX.FOUR"
    ],
  },
  {
    border: "border-l-4 border-l-tael-500",
    title: "BUSINESS_MODEL_SECTION.KEY_PARTNERSHIPS",
    icon: <Handshake className="w-6 h-6" />,
    content: "BUSINESS_MODEL_SECTION.KEY_PARTNERSHIPS_DESCRIPTION",
    highlights: [
      "BUSINESS_MODEL_SECTION.KEY_PARTNERSHIPS_INDEX.ONE",
      "BUSINESS_MODEL_SECTION.KEY_PARTNERSHIPS_INDEX.TWO",
      "BUSINESS_MODEL_SECTION.KEY_PARTNERSHIPS_INDEX.THREE",
      "BUSINESS_MODEL_SECTION.KEY_PARTNERSHIPS_INDEX.FOUR"
    ],
  },
  {
    border: "border-l-4 border-l-red-500",
    title: "BUSINESS_MODEL_SECTION.COST_STRUCTURE",
    icon: <TrendingDown className="w-6 h-6" />,
    content: "BUSINESS_MODEL_SECTION.COST_STRUCTURE_DESCRIPTION",
    highlights: [
      "BUSINESS_MODEL_SECTION.COST_STRUCTURE_INDEX.ONE",
      "BUSINESS_MODEL_SECTION.COST_STRUCTURE_INDEX.TWO",
      "BUSINESS_MODEL_SECTION.COST_STRUCTURE_INDEX.THREE",
      "BUSINESS_MODEL_SECTION.COST_STRUCTURE_INDEX.FOUR"
    ],
  },
];