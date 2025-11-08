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