import {
  Product,
  Testimonial
} from './interface';
import i18n from 'i18next';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { languages } from '../assets/constants';

export const useCustomHook= () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState('home');
  const [currentLanguage, setCurrentLanguage] = useState(() => i18n.language.toLowerCase());
  const [showSplash, setShowSplash] = useState(true);
  const [splashCompleted, setSplashCompleted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  
  /* ADMIN RELATED */
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('analytics');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteTestimonialId, setDeleteTestimonialId] = useState<number | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

   /*Handle pages navigation*/
  const handleNavigate = (page: string, productId?: string) => {
    setCurrentPage(page)

    // Clear selectedProductId when navigating to other pages or directly to products
    if (page !== 'products' || !productId) {
      setSelectedProductId(null)
    }
    
    if (productId) {
      setSelectedProductId(productId)
    }
  }

  /* Handle Language Change and Translation */
  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language)
  };

  /* Get Current Language */
  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === localStorage.getItem('i18nextLng')) || languages[0];
  };

  return {
    t,
    currentPage,
    setCurrentPage,
    currentLanguage,
    setCurrentLanguage,
    handleLanguageChange,
    getCurrentLanguage,
    showSplash,
    setShowSplash,
    splashCompleted,
    setSplashCompleted,
    mobileMenuOpen,
    setMobileMenuOpen,
    handleNavigate,
    selectedProductId,
    setSelectedProductId,

    


    isAdminRoute,
    setIsAdminRoute,
    isAdminAuthenticated,
    setIsAdminAuthenticated,
    username,
    setUsername,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isLoading,
    setIsLoading,
    activeTab,
    setActiveTab,
    testimonials,
    setTestimonials,
    searchQuery,
    setSearchQuery,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    deleteTestimonialId,
    setDeleteTestimonialId,
    editingTestimonial,
    setEditingTestimonial,
    isLoadingSkeleton,
    setIsLoadingSkeleton,
    products,
    setProducts,
    deleteProductId,
    setDeleteProductId,
    editingProduct,
    setEditingProduct
  }
}