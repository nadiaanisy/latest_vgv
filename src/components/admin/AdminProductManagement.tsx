import {
  useEffect,
  useMemo,
  useState
} from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '../ui/tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '../ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table';
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Package,
  X,
 Upload,
  Image as ImageIcon
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '../ui/alert-dialog'
import { toast } from 'sonner';
import {
  Product,
  ProductFormData
} from '../../utils/interface';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  errorToastStyle,
  successToastStyle
} from '../../functions/catchError';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';
import { fetchProducts } from '../../api/get';
import { addProducts } from '../../api/insert';
import { updateProducts } from '../../api/update';
import { useCustomHook } from '../../utils/customHooks';
import { deleteProduct } from '../../api/delete';
import { ProductSkeletonGrid } from './ProductSkeletonGrid';

const initialFormData: ProductFormData = {
  id: undefined,
  name: { EN: '', BM: '' },
  category: '',
  description_short: { EN: '', BM: '' },
  description_long: { EN: '', BM: '' },
  priceRange: '',
  originalPrice: '',
  whyChosen: { EN: '', BM: '' },
  targetMarket: { EN: [''], BM: [''] },
  benefits: { EN: [''], BM: [''] },
  hasOptions: false,
  salePrice: '',
  shopeeLink: '',
  stock: '',
  image: '',
  options: []
};

export function AdminProductManagement() {
  const {
    getCurrentLanguage,
    t,
    isLoadingSkeleton,
    products,
    searchQuery,
    isAddDialogOpen,
    isEditDialogOpen,
    deleteProductId,
    editingProduct,
    setIsLoadingSkeleton,
    setProducts,
    setSearchQuery,
    setIsAddDialogOpen,
    setIsEditDialogOpen,
    setDeleteProductId,
    setEditingProduct
  } = useCustomHook();

  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [activeTab, setActiveTab] = useState('basic');
  const [loading, setLoading] = useState({
    add: false,
    edit: false,
    delete: false,
  });

  /* LOAD PRODUCTS */
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoadingSkeleton(true);
      const data = await fetchProducts();
      setProducts(data);
      setIsLoadingSkeleton(false);
    };
    
    loadProducts();
  }, []);

  const handleAddProduct = async () => {
    setLoading(prev => ({ ...prev, add: true }));

    /* CHECKING */
    if (!formData.name.EN ||
        !formData.name.BM ||
        !formData.category ||
        !formData.priceRange ||
        !formData.originalPrice ||
        !formData.salePrice ||
        !formData.stock ||
        !formData.description_short.EN ||
        !formData.description_short.BM ||
        !formData.description_long.EN ||
        !formData.description_long.BM ||
        !formData.whyChosen.EN ||
        !formData.whyChosen.BM ||
        !formData.targetMarket?.EN?.some(item => item.trim() !== '') ||
        !formData.targetMarket?.BM?.some(item => item.trim() !== '') ||
        !formData.benefits?.EN?.some(item => item.trim() !== '') ||
        !formData.benefits?.BM?.some(item => item.trim() !== '')
    ) {
      toast.error(t('MESSAGES.ERROR_FILL_ALL_REQUIRED_FIELDS'), errorToastStyle)
      setLoading(prev => ({ ...prev, add: false }));
      return;
    }

    if (!formData.priceRange.trim().startsWith('RM')) {
      toast.error(t('MESSAGES.ERROR_PRIC_RANGE_MUST_START_WITH_RM'), errorToastStyle)
      setLoading(prev => ({ ...prev, add: false }));
      return;
    }

    const newProduct: Product = {
      name: formData.name,
      category: formData.category,
      description_short: formData.description_short,
      description_long: formData.description_long,
      priceRange: formData.priceRange,
      originalPrice: parseFloat(formData.originalPrice),
      whyChosen: formData.whyChosen,
      targetMarket: {
        EN: formData.targetMarket.EN.filter(t => t.trim() !== ''),
        BM: formData.targetMarket.BM.filter(t => t.trim() !== '')
      },
      benefits: {
        EN: formData.benefits.EN.filter(b => b.trim() !== ''),
        BM: formData.benefits.BM.filter(b => b.trim() !== '')
      },
      hasOptions: formData.hasOptions,
      salePrice: formData.salePrice ? parseFloat(formData.salePrice) : 0,
      shopeeLink: formData.shopeeLink || undefined,
      stock: formData.stock ? parseInt(formData.stock) : undefined,
      image: formData.image || '',
      options: formData.hasOptions ? formData.options : undefined
    }

    await addProducts(newProduct);
    const data = await fetchProducts();
    setProducts(data);
    setIsAddDialogOpen(false);
    resetForm();
    setActiveTab('basic');
    toast.success(t('MESSAGES.SUCCESS_PRODUCT_ADDED'), successToastStyle)
    setLoading(prev => ({ ...prev, add: false }));
  }

  const handleEditProduct = async (formData: ProductFormData) => {
    setLoading(prev => ({ ...prev, edit: true }));

    if (!editingProduct ||
        !formData.name.EN ||
        !formData.name.BM ||
        !formData.category ||
        !formData.priceRange ||
        !formData.originalPrice ||
        !formData.salePrice ||
        !formData.stock ||
        !formData.description_short.EN ||
        !formData.description_short.BM ||
        !formData.description_long.EN ||
        !formData.description_long.BM ||
        !formData.whyChosen.EN ||
        !formData.whyChosen.BM ||
        !formData.targetMarket?.EN?.some(item => item.trim() !== '') ||
        !formData.targetMarket?.BM?.some(item => item.trim() !== '') ||
        !formData.benefits?.EN?.some(item => item.trim() !== '') ||
        !formData.benefits?.BM?.some(item => item.trim() !== '')
    ) {
      toast.error(t('MESSAGES.ERROR_FILL_ALL_REQUIRED_FIELDS'), errorToastStyle)
      setLoading(prev => ({ ...prev, add: false }));
      return;
    }

    const updatedProducts: Product = {
      name: formData.name,
      category: formData.category,
      description_short: formData.description_short,
      description_long: formData.description_long,
      priceRange: formData.priceRange,
      originalPrice: parseFloat(formData.originalPrice),
      whyChosen: formData.whyChosen,
      targetMarket: {
        EN: formData.targetMarket.EN.filter(t => t.trim() !== ''),
        BM: formData.targetMarket.BM.filter(t => t.trim() !== '')
      },
      benefits: {
        EN: formData.benefits.EN.filter(b => b.trim() !== ''),
        BM: formData.benefits.BM.filter(b => b.trim() !== '')
      },
      hasOptions: formData.hasOptions,
      salePrice: formData.salePrice ? parseFloat(formData.salePrice) : 0,
      shopeeLink: formData.shopeeLink || undefined,
      stock: formData.stock ? parseInt(formData.stock) : undefined,
      image: formData.image || '',
      options: formData.hasOptions ? formData.options : undefined
    }

    await updateProducts(updatedProducts, formData.id);

    const data = await fetchProducts();
    setProducts(data);
  
    resetForm()
    setIsEditDialogOpen(false);
    setEditingProduct(null);
    setActiveTab('basic');
    setLoading(prev => ({ ...prev, edit: false }));
  }

  const handleDeleteProduct = async (id: any) => {
    setLoading(prev => ({ ...prev, delete: true }));
    await deleteProduct(id);
    const data = await fetchProducts();
    setProducts(data);
    toast.success(t('MESSAGES.SUCCESS_PRODUCT_DELETED'), successToastStyle)
    setDeleteProductId(null)
    setLoading(prev => ({ ...prev, delete: false }));
  }

  const openEditDialog = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      category: product.category,
      description_short: product.description_short,
      description_long: product.description_long,
      priceRange: product.priceRange,
      originalPrice: product.originalPrice?.toString() || '',
      whyChosen: product.whyChosen,
      targetMarket: {
        EN: Array.isArray(product.targetMarket) 
          ? (product.targetMarket.length > 0 ? product.targetMarket : [''])
          : (product.targetMarket.EN?.length > 0 ? product.targetMarket.EN : ['']),
        BM: Array.isArray(product.targetMarket)
          ? (product.targetMarket.length > 0 ? product.targetMarket : [''])
          : (product.targetMarket.BM?.length > 0 ? product.targetMarket.BM : [''])
      },
      benefits: {
        EN: Array.isArray(product.benefits) 
          ? (product.benefits.length > 0 ? product.benefits : [''])
          : (product.benefits.EN?.length > 0 ? product.benefits.EN : ['']),
        BM: Array.isArray(product.benefits)
          ? (product.benefits.length > 0 ? product.benefits : [''])
          : (product.benefits.BM?.length > 0 ? product.benefits.BM : [''])
      },
      hasOptions: product.hasOptions,
      salePrice: product.salePrice?.toString() || '',
      shopeeLink: product.shopeeLink || '',
      stock: product.stock?.toString() || '',
      image: product.image,
      id: product.id,
      options: product.options?.map(option => ({
        id: option.id,
        name: option.name || { EN: '', BM: '' },
        originalPrice: option.originalPrice?.toString() || '',
        salePrice: option.salePrice?.toString() || '',
        description: option.description || { EN: '', BM: '' },
        image: option.image || '',
        shopeeLink: option.shopeeLink || ''
      })) || []
    })
    setIsEditDialogOpen(true)
  }

  const resetForm = () => {
    setFormData(initialFormData)
  }

  const addTargetMarket = () => {
    setFormData({ ...formData, targetMarket: { EN: [...formData.targetMarket.EN, ''], BM: [...formData.targetMarket.BM, ''] } })
  }

  const removeTargetMarket = (index: number) => {
    setFormData({
      ...formData,
      targetMarket: {
        EN: formData.targetMarket.EN.filter((_, i) => i !== index),
        BM: formData.targetMarket.BM.filter((_, i) => i !== index)
      }
    })
  }

  const updateTargetMarket = (index: number, value: string, language: 'EN' | 'BM') => {
    const updated = [...formData.targetMarket[language]]
    updated[index] = value
    setFormData({ ...formData, targetMarket: { ...formData.targetMarket, [language]: updated } })
  }

  const addBenefit = () => {
    setFormData({ ...formData, benefits: { EN: [...formData.benefits.EN, ''], BM: [...formData.benefits.BM, ''] } })
  }

  const removeBenefit = (index: number) => {
    setFormData({
      ...formData,
      benefits: {
        EN: formData.benefits.EN.filter((_, i) => i !== index),
        BM: formData.benefits.BM.filter((_, i) => i !== index)
      }
    })
  }

  const updateBenefit = (index: number, value: string, language: 'EN' | 'BM') => {
    const updated = [...formData.benefits[language]]
    updated[index] = value
    setFormData({ ...formData, benefits: { ...formData.benefits, [language]: updated } })
  }

  const addOption = () => {
    setFormData({
      ...formData,
      options: [
        ...formData.options,
        {
          name: { EN: '', BM: '' },
          originalPrice: '',
          salePrice: '',
          description: { EN: '', BM: '' },
          image: '',
          shopeeLink: ''
        }
      ]
    })
  }

  const removeOption = (index: number) => {
    setFormData({
      ...formData,
      options: formData.options.filter((_, i) => i !== index)
    })
  }

  const updateOption = (index: number, field: keyof ProductFormData['options'][0], value: string, language?: 'EN' | 'BM') => {
    const updated = [...formData.options]
    if (language && (field === 'name' || field === 'description')) {
      const currentField = updated[index][field] as { EN: string; BM: string }
      updated[index] = { ...updated[index], [field]: { ...currentField, [language]: value } }
    } else {
      (updated[index] as any)[field] = value
    }
    setFormData({ ...formData, options: updated })
  }

  // Image upload handlers
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image size should be less than 5MB')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleOptionImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image size should be less than 5MB')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        updateOption(index, 'image', reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const filteredProducts = products.filter((product: any) => {
    const query = searchQuery ? searchQuery.toLowerCase() : '';

    // Handle case where name or category might be missing
    const nameEN = product.name?.EN?.toLowerCase() || '';
    const nameBM = product.name?.BM?.toLowerCase() || '';
    const category = product.category?.toLowerCase() || '';

    return (
      nameEN.includes(query) ||
      nameBM.includes(query) ||
      category.includes(query)
    );
  });

  const tabsStructure = useMemo(() => (
    <TabsList className="grid w-full grid-cols-4">
      <TabsTrigger value="basic">{t('TAB_BASIC_INFO')}</TabsTrigger>
      <TabsTrigger value="details">{t('TAB_DETAILS')}</TabsTrigger>
      <TabsTrigger value="features">{t('TAB_FEATURES')}</TabsTrigger>
      <TabsTrigger value="options">{t('TAB_OPTIONS')}</TabsTrigger>
    </TabsList>
  ), []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-foreground mb-2">{t('PRODUCT_MANAGEMENT_TITLE')}</h2>
          <p className="text-muted-foreground">
            {t('PRODUCT_MANAGEMENT_SUBTITLE')}
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              {t('BUTTONS.ADD_PRODUCT')}
            </Button>
          </DialogTrigger>
          <DialogContent
            className="max-w-2xl max-h-[90vh] overflow-y-auto"
            aria-describedby={undefined}
            onPointerDownOutside={(e) => e.preventDefault()}
            onInteractOutside={(e) => e.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle>{t('ADD_NEW_PRODUCT_TITLE')}</DialogTitle>
              <DialogDescription>{t('ADD_NEW_PRODUCT_SUBTITLE')}</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                {tabsStructure}

                <TabsContent value="basic" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('PRODUCT_NAME')} * (Bilingual)</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">English</div>
                        <Input
                          value={formData.name.EN}
                          onChange={(e) => setFormData({ ...formData, name: { ...formData.name, EN: e.target.value } })}
                          placeholder="e.g., Wetty Mini Wet Wipes"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Bahasa Malaysia</div>
                        <Input
                          value={formData.name.BM}
                          onChange={(e) => setFormData({ ...formData, name: { ...formData.name, BM: e.target.value } })}
                          placeholder="cth., Tisu Basah Wetty Mini"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">{t('CATEGORY')} *</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g., Wetty Mini Wipes"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('PRODUCT_IMAGE')}</Label>
                    <div className="grid gap-3">
                      {formData.image && (
                        <div className="relative w-full h-48 rounded-lg border-2 border-dashed border-border overflow-hidden">
                          <img
                            src={formData.image}
                            alt="Product preview"
                            className="w-full h-full object-cover"
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            className="absolute top-2 right-2"
                            onClick={() => setFormData({ ...formData, image: '' })}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="cursor-pointer"
                            id="imageUpload"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}
                          onClick={() => document.getElementById('imageUpload')?.click()}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          {t('BUTTONS.UPLOAD')}
                        </Button>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t('OPTION_IMAGE_URL')}
                      </div>
                      <Input
                        id="image"
                        value={formData.image.startsWith('data:') ? '' : formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="priceRange">{t('PRICE_RANGE')} *</Label>
                      <Input
                        id="priceRange"
                        value={formData.priceRange}
                        onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                        placeholder="RM3.90 - RM4.90"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="originalPrice">{t('ORIGINAL_PRICE')} *</Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        step="0.01"
                        value={formData.originalPrice}
                        onChange={(e) => {
                          let value = e.target.value;
                          if (value.includes('.')) {
                            const [intPart, decPart] = value.split('.');
                            if (decPart.length > 2) {
                              value = `${intPart}.${decPart.slice(0, 2)}`;
                            }
                          }
                          setFormData({ ...formData, originalPrice: value })
                        }}
                        placeholder="0.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salePrice">{t('SALE_PRICE')} *</Label>
                      <Input
                        id="salePrice"
                        type="number"
                        step="0.01"
                        value={formData.salePrice}
                        onChange={(e) => {
                          let value = e.target.value;
                          if (value.includes('.')) {
                            const [intPart, decPart] = value.split('.');
                            if (decPart.length > 2) {
                              value = `${intPart}.${decPart.slice(0, 2)}`;
                            }
                          }
                          setFormData({ ...formData, salePrice: value })
                        }}
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="stock">{t('STOCK')} *</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        placeholder="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shopeeLink">Shopee Link</Label>
                      <Input
                        id="shopeeLink"
                        value={formData.shopeeLink}
                        onChange={(e) => setFormData({ ...formData, shopeeLink: e.target.value })}
                        placeholder="https://shopee.com.my/..."
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="details" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="description_short">{t('PRODUCT_DESCRIPTION_SHORT')} *</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">English</div>
                        <Textarea
                          value={formData.description_short.EN}
                          onChange={(e) => setFormData({ ...formData, description_short: { ...formData.description_short, EN: e.target.value } })}
                          placeholder="Brief product description"
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Bahasa Malaysia</div>
                        <Textarea
                          value={formData.description_short.BM}
                          onChange={(e) => setFormData({ ...formData, description_short: { ...formData.description_short, BM: e.target.value } })}
                          placeholder="Penerangan ringkas produk"
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description_long">{t('PRODUCT_DESCRIPTION_LONG')} *</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">English</div>
                        <Textarea
                          value={formData.description_long.EN}
                          onChange={(e) => setFormData({ ...formData, description_long: { ...formData.description_long, EN: e.target.value } })}
                          placeholder="Detailed product description"
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Bahasa Malaysia</div>
                        <Textarea
                          value={formData.description_long.BM}
                          onChange={(e) => setFormData({ ...formData, description_long: { ...formData.description_long, BM: e.target.value } })}
                          placeholder="Penerangan terperinci produk"
                          rows={4}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whyChosen">{t('WHY_CHOOSEN')} *</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">English</div>
                        <Textarea
                          value={formData.whyChosen.EN}
                          onChange={(e) => setFormData({ ...formData, whyChosen: { ...formData.whyChosen, EN: e.target.value } })}
                          placeholder="Why customers should choose this product"
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Bahasa Malaysia</div>
                        <Textarea
                          value={formData.whyChosen.BM}
                          onChange={(e) => setFormData({ ...formData, whyChosen: { ...formData.whyChosen, BM: e.target.value } })}
                          placeholder="Mengapa pelanggan harus memilih produk ini"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="features" className="space-y-4 mt-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>{t('TARGET_MARKET')} *</Label>
                      <Button style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }} type="button" size="sm" variant="outline" onClick={addTargetMarket}>
                        <Plus className="w-4 h-4 mr-1" />
                        {t('BUTTONS.ADD')}
                      </Button>
                    </div>
                    {formData.targetMarket.EN.map((target, index) => (
                      <Card key={index} className="border-2 p-4">
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <div className="text-sm text-muted-foreground">English</div>
                              <Input
                                value={formData.targetMarket.EN[index]}
                                onChange={(e) => updateTargetMarket(index, e.target.value, 'EN')}
                                placeholder={`Target market ${index + 1}`}
                              />
                            </div>
                            <div className="space-y-2">
                              <div className="text-sm text-muted-foreground">Bahasa Malaysia</div>
                              <Input
                                value={formData.targetMarket.BM[index]}
                                onChange={(e) => updateTargetMarket(index, e.target.value, 'BM')}
                                placeholder={`Sasaran pasaran ${index + 1}`}
                              />
                            </div>
                          </div>
                          {formData.targetMarket.EN.length > 1 && (
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => removeTargetMarket(index)}
                              className="w-full bg-red-500 text-white"
                            >
                              <X className="w-4 h-4 mr-1" />
                              {t('BUTTONS.REMOVE')}
                            </Button>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>{t('BENEFITS')} *</Label>
                      <Button style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }} type="button" size="sm" variant="outline" onClick={addBenefit}>
                        <Plus className="w-4 h-4 mr-1" />
                        {t('BUTTONS.ADD')}
                      </Button>
                    </div>
                    {formData.benefits.EN.map((benefit, index) => (
                      <Card key={index} className="border-2 p-4">
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <div className="text-sm text-muted-foreground">English</div>
                              <Input
                                value={formData.benefits.EN[index]}
                                onChange={(e) => updateBenefit(index, e.target.value, 'EN')}
                                placeholder={`Benefit ${index + 1}`}
                              />
                            </div>
                            <div className="space-y-2">
                              <div className="text-sm text-muted-foreground">Bahasa Malaysia</div>
                              <Input
                                value={formData.benefits.BM[index]}
                                onChange={(e) => updateBenefit(index, e.target.value, 'BM')}
                                placeholder={`Manfaat ${index + 1}`}
                              />
                            </div>
                          </div>
                          {formData.benefits.EN.length > 1 && (
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => removeBenefit(index)}
                              className="w-full bg-red-500 text-white"
                            >
                              <X className="w-4 h-4 mr-1" />
                              {t('BUTTONS.REMOVE')}
                            </Button>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="options" className="space-y-4 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Label htmlFor="hasOptions">{t('PRODUCT_HAS_OPTIONS')}</Label>
                      <Switch
                        id="hasOptions"
                        checked={formData.hasOptions}
                        onCheckedChange={(checked) => setFormData({ ...formData, hasOptions: checked })}
                        className={`relative inline-flex h-[1.15rem] w-8 items-center rounded-full transition-colors duration-200
                          ${formData.hasOptions ? 'bg-primary' : 'bg-gray-300'}
                        `}
                      />
                    </div>
                    {formData.hasOptions && (
                      <Button type="button" size="sm" variant="outline" onClick={addOption}>
                        <Plus className="w-4 h-4 mr-1" />
                        {t('BUTTONS.ADD')}
                      </Button>
                    )}
                  </div>

                  {formData.hasOptions && formData.options.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                      {t('NO_OPTIONS_ADDED')}
                    </div>
                  )}

                  {formData.hasOptions && formData.options.map((option, index) => (
                    <Card key={index} className="border-2">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{t('TAB_OPTIONS')} {index + 1}</CardTitle>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => removeOption(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-3">
                          <Label>{t('OPTION_NAME')} (Bilingual)</Label>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <div className="text-sm text-muted-foreground">English</div>
                              <Input
                                value={option.name?.EN}
                                onChange={(e) => updateOption(index, 'name', e.target.value, 'EN')}
                                placeholder="e.g., Fragrance Fresh Apple"
                              />
                            </div>
                            <div className="space-y-2">
                              <div className="text-sm text-muted-foreground">Bahasa Malaysia</div>
                              <Input
                                value={option.name?.BM}
                                onChange={(e) => updateOption(index, 'name', e.target.value, 'BM')}
                                placeholder="cth., Wangi Epal Segar"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label>{t('ORIGINAL_PRICE')}</Label>
                            <Input
                              type="number"
                              step="0.01"
                              value={option.originalPrice}
                              onChange={(e) =>{
                                let value = e.target.value;
                                if (value.includes('.')) {
                                  const [intPart, decPart] = value.split('.');
                                  if (decPart.length > 2) {
                                    value = `${intPart}.${decPart.slice(0, 2)}`;
                                  }
                                }
                                updateOption(index, 'originalPrice', value)
                              }}
                              placeholder="0.00"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>{t('SALE_PRICE')}</Label>
                            <Input
                              type="number"
                              step="0.01"
                              value={option.salePrice}
                              onChange={(e) => {
                                let value = e.target.value;
                                if (value.includes('.')) {
                                  const [intPart, decPart] = value.split('.');
                                  if (decPart.length > 2) {
                                    value = `${intPart}.${decPart.slice(0, 2)}`;
                                  }
                                }
                                updateOption(index, 'salePrice', value)
                              }}
                              placeholder="0.00"
                            />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label>Description (Bilingual)</Label>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <div className="text-sm text-muted-foreground">English</div>
                              <Textarea
                                value={option.description?.EN}
                                onChange={(e) => updateOption(index, 'description', e.target.value, 'EN')}
                                placeholder="Option description"
                                rows={2}
                              />
                            </div>
                            <div className="space-y-2">
                              <div className="text-sm text-muted-foreground">Bahasa Malaysia</div>
                              <Textarea
                                value={option.description?.BM}
                                onChange={(e) => updateOption(index, 'description', e.target.value, 'BM')}
                                placeholder="Penerangan pilihan"
                                rows={2}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Option Image</Label>
                          <div className="grid gap-3">
                            {option.image && (
                              <div className="relative w-full h-32 rounded-lg border-2 border-dashed border-border overflow-hidden">
                                <img
                                  src={option.image}
                                  alt="Option preview"
                                  className="w-full h-full object-cover"
                                />
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="destructive"
                                  className="absolute top-2 right-2"
                                  onClick={() => updateOption(index, 'image', '')}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            )}
                            <div className="flex gap-2">
                              <div className="flex-1">
                                <Input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleOptionImageUpload(index, e)}
                                  className="cursor-pointer"
                                  id={`optionImageUpload-${index}`}
                                />
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => document.getElementById(`optionImageUpload-${index}`)?.click()}
                              >
                                <Upload className="w-4 h-4 mr-2" />
                                {t('BUTTONS.UPLOAD')}
                              </Button>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Or enter image URL:
                            </div>
                            <Input
                              value={option.image.startsWith('data:') ? '' : option.image}
                              onChange={(e) => updateOption(index, 'image', e.target.value)}
                              placeholder="https://..."
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Shopee Link</Label>
                          <Input
                            value={option.shopeeLink}
                            onChange={(e) => updateOption(index, 'shopeeLink', e.target.value)}
                            placeholder="https://shopee.com.my/..."
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}
                disabled={loading.add}
                onClick={() => { setIsAddDialogOpen(false); resetForm(); setActiveTab('basic'); }}
              >
                {t('BUTTONS.CANCEL')}
              </Button>
              <Button
                onClick={handleAddProduct}
                disabled={loading.add}
              >
                {t('BUTTONS.ADD_PRODUCT')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-3 border-2">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center py-4">
              <div className="flex items-center gap-2 bg-input-background border border-input rounded-md px-3 py-2 w-full">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  placeholder={t('PLACEHOLDERS.SEARCH_PRODUCTS')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-2">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-2xl font-medium text-foreground">{products.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Table */}
      {isLoadingSkeleton ? (
        <ProductSkeletonGrid />
      ) : (
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-foreground">{t('PRODUCT_LIST_TITLE')}</CardTitle>
            <CardDescription>{t('PRODUCT_LIST_SUBTITLE')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('PRODUCT')}</TableHead>
                    <TableHead>{t('CATEGORY')}</TableHead>
                    <TableHead>{t('PRICE_RANGE')}</TableHead>
                    <TableHead>{t('STOCK')}</TableHead>
                    <TableHead>{t('OPTIONS')}</TableHead>
                    <TableHead className="text-right">{t('ACTIONS')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        {t('NO_PRODUCTS_FOUND')}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {product.image && (
                              <img
                                src={product.image}
                                alt={getCurrentLanguage().code === 'EN' ? product.name.EN : product.name.BM}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                            )}
                            <div>
                              <p className="font-medium text-foreground">{getCurrentLanguage().code === 'EN' ? product.name.EN : product.name.BM}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {product.category}
                          </span>
                        </TableCell>
                        <TableCell className="font-medium text-foreground">
                          {product.priceRange}
                        </TableCell>
                        <TableCell>
                          <span className={`${(product.stock || 0) < 20 ? 'text-red-600' : 'text-foreground'}`}>
                            {product.stock || 'N/A'}
                          </span>
                        </TableCell>
                        <TableCell>
                          {product.hasOptions ? (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                              {product.options?.length || 0} {t('OPTION')}
                            </span>
                          ) : (
                            <span className="text-xs text-muted-foreground">{t('NO_OPTIONS')}</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-left gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditDialog(product)}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setDeleteProductId(product.id?.toString() || null)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      >
        <DialogContent aria-describedby={undefined}
          onPointerDownOutside={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
          className="max-w-3xl max-h-[90vh] overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle>{t('EDIT_PRODUCT_TITLE')}</DialogTitle>
            <DialogDescription>{t('EDIT_PRODUCT_SUBTITLE')}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="py-4">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                {tabsStructure}

                <TabsContent value="basic" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('PRODUCT_NAME')} * (Bilingual)</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">English</div>
                        <Input
                          value={formData.name.EN}
                          onChange={(e) => setFormData({ ...formData, name: { ...formData.name, EN: e.target.value } })}
                          placeholder="e.g., Wetty Mini Wet Wipes"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Bahasa Malaysia</div>
                        <Input
                          value={formData.name.BM}
                          onChange={(e) => setFormData({ ...formData, name: { ...formData.name, BM: e.target.value } })}
                          placeholder="cth., Tisu Basah Wetty Mini"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">{t('CATEGORY')} *</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g., Wetty Mini Wipes"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('PRODUCT_IMAGE')}</Label>
                    <div className="grid gap-3">
                      {formData.image && (
                        <div className="relative w-full h-48 rounded-lg border-2 border-dashed border-border overflow-hidden">
                          <img
                            src={formData.image}
                            alt="Product preview"
                            className="w-full h-full object-cover"
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            className="absolute top-2 right-2"
                            onClick={() => setFormData({ ...formData, image: '' })}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="cursor-pointer"
                            id="imageUpload"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}
                          onClick={() => document.getElementById('imageUpload')?.click()}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          {t('BUTTONS.UPLOAD')}
                        </Button>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t('OPTION_IMAGE_URL')}
                      </div>
                      <Input
                        id="image"
                        value={formData.image.startsWith('data:') ? '' : formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="priceRange">{t('PRICE_RANGE')} *</Label>
                      <Input
                        id="priceRange"
                        value={formData.priceRange}
                        onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                        placeholder="RM3.90 - RM4.90"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="originalPrice">{t('ORIGINAL_PRICE')} *</Label>
                      <Input
                        id="originalPrice"
                        value={formData.originalPrice}
                        onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                        placeholder="RM6.90"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salePrice">{t('SALE_PRICE')} *</Label>
                      <Input
                        id="salePrice"
                        type="number"
                        step="0.01"
                        value={formData.salePrice}
                        onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="stock">{t('STOCK')} *</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        placeholder="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shopeeLink">Shopee Link</Label>
                      <Input
                        id="shopeeLink"
                        value={formData.shopeeLink}
                        onChange={(e) => setFormData({ ...formData, shopeeLink: e.target.value })}
                        placeholder="https://shopee.com.my/..."
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="details" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="description_short">{t('PRODUCT_DESCRIPTION_SHORT')} *</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">English</div>
                        <Textarea
                          value={formData.description_short.EN}
                          onChange={(e) => setFormData({ ...formData, description_short: { ...formData.description_short, EN: e.target.value } })}
                          placeholder="Brief product description"
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Bahasa Malaysia</div>
                        <Textarea
                          value={formData.description_short.BM}
                          onChange={(e) => setFormData({ ...formData, description_short: { ...formData.description_short, BM: e.target.value } })}
                          placeholder="Penerangan ringkas produk"
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description_long">{t('PRODUCT_DESCRIPTION_LONG')} *</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">English</div>
                        <Textarea
                          value={formData.description_long.EN}
                          onChange={(e) => setFormData({ ...formData, description_long: { ...formData.description_long, EN: e.target.value } })}
                          placeholder="Detailed product description"
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Bahasa Malaysia</div>
                        <Textarea
                          value={formData.description_long.BM}
                          onChange={(e) => setFormData({ ...formData, description_long: { ...formData.description_long, BM: e.target.value } })}
                          placeholder="Penerangan terperinci produk"
                          rows={4}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whyChosen">{t('WHY_CHOOSEN')} *</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">English</div>
                        <Textarea
                          value={formData.whyChosen.EN}
                          onChange={(e) => setFormData({ ...formData, whyChosen: { ...formData.whyChosen, EN: e.target.value } })}
                          placeholder="Why customers should choose this product"
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Bahasa Malaysia</div>
                        <Textarea
                          value={formData.whyChosen.BM}
                          onChange={(e) => setFormData({ ...formData, whyChosen: { ...formData.whyChosen, BM: e.target.value } })}
                          placeholder="Mengapa pelanggan harus memilih produk ini"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="features" className="space-y-4 mt-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>{t('TARGET_MARKET')}</Label>
                      <Button
                        style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={addTargetMarket}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        {t('BUTTONS.ADD')}
                      </Button>
                    </div>
                    {formData.targetMarket.EN.map((target, index) => (
                      <Card key={index} className="border-2 p-4">
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <div className="text-sm text-muted-foreground">English</div>
                              <Input
                                value={formData.targetMarket.EN[index]}
                                onChange={(e) => updateTargetMarket(index, e.target.value, 'EN')}
                                placeholder={`Target market ${index + 1}`}
                              />
                            </div>
                            <div className="space-y-2">
                              <div className="text-sm text-muted-foreground">Bahasa Malaysia</div>
                              <Input
                                value={formData.targetMarket.BM[index]}
                                onChange={(e) => updateTargetMarket(index, e.target.value, 'BM')}
                                placeholder={`Sasaran pasaran ${index + 1}`}
                              />
                            </div>
                          </div>
                          {formData.targetMarket.EN.length > 1 && (
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => removeTargetMarket(index)}
                              className="w-full bg-red-500 text-white"
                            >
                              <X className="w-4 h-4 mr-1" />
                              {t('BUTTONS.REMOVE')}
                            </Button>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>{t('BENEFITS')}</Label>
                      <Button style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }} type="button" size="sm" variant="outline" onClick={addBenefit}>
                        <Plus className="w-4 h-4 mr-1" />
                        {t('BUTTONS.ADD')}
                      </Button>
                    </div>
                    {formData.benefits.EN.map((benefit, index) => (
                      <Card key={index} className="border-2 p-4">
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <div className="text-sm text-muted-foreground">English</div>
                              <Input
                                value={formData.benefits.EN[index]}
                                onChange={(e) => updateBenefit(index, e.target.value, 'EN')}
                                placeholder={`Benefit ${index + 1}`}
                              />
                            </div>
                            <div className="space-y-2">
                              <div className="text-sm text-muted-foreground">Bahasa Malaysia</div>
                              <Input
                                value={formData.benefits.BM[index]}
                                onChange={(e) => updateBenefit(index, e.target.value, 'BM')}
                                placeholder={`Manfaat ${index + 1}`}
                              />
                            </div>
                          </div>
                          {formData.benefits.EN.length > 1 && (
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => removeBenefit(index)}
                              className="w-full bg-red-500 text-white"
                            >
                              <X className="w-4 h-4 mr-1" />
                              {t('BUTTONS.REMOVE')}
                            </Button>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="options" className="space-y-4 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Label htmlFor="hasOptions">{t('PRODUCT_HAS_OPTIONS')}</Label>
                      <Switch
                        id="hasOptions"
                        checked={!!formData.hasOptions}
                        onCheckedChange={(checked) => setFormData({ ...formData, hasOptions: checked })}
                        className={`relative inline-flex h-[1.15rem] w-8 items-center rounded-full transition-colors duration-200
                          ${formData.hasOptions ? 'bg-primary' : 'bg-gray-300'}
                        `}
                      />
                    </div>
                    {formData.hasOptions && (
                      <Button
                        style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={addOption}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        {t('BUTTONS.ADD')}
                      </Button>
                    )}
                  </div>

                  {formData.hasOptions && formData.options.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                      {t('NO_OPTIONS_ADDED')}
                    </div>
                  )}

                  {formData.hasOptions && formData.options.map((option, index) => (
                    <Card key={index} className="border-2">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">Option {index + 1}</CardTitle>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => removeOption(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-3">
                          <Label>{t('OPTION_NAME')} (Bilingual)</Label>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <div className="text-sm text-muted-foreground">English</div>
                              <Input
                                value={option.name?.EN}
                                onChange={(e) => updateOption(index, 'name', e.target.value, 'EN')}
                                placeholder="e.g., Fragrance Fresh Apple"
                              />
                            </div>
                            <div className="space-y-2">
                              <div className="text-sm text-muted-foreground">Bahasa Malaysia</div>
                              <Input
                                value={option.name?.BM}
                                onChange={(e) => updateOption(index, 'name', e.target.value, 'BM')}
                                placeholder="cth., Wangi Epal Segar"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label>{t('ORIGINAL_PRICE')}</Label>
                            <Input
                              value={option.originalPrice}
                              onChange={(e) => updateOption(index, 'originalPrice', e.target.value)}
                              placeholder="RM6.90"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>{t('SALE_PRICE')}</Label>
                            <Input
                              value={option.salePrice}
                              onChange={(e) => updateOption(index, 'salePrice', e.target.value)}
                              placeholder="RM3.90"
                            />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label>{t('DESCRIPTION')} (Bilingual)</Label>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <div className="text-sm text-muted-foreground">English</div>
                              <Textarea
                                value={option.description?.EN}
                                onChange={(e) => updateOption(index, 'description', e.target.value, 'EN')}
                                placeholder="Option description"
                                rows={2}
                              />
                            </div>
                            <div className="space-y-2">
                              <div className="text-sm text-muted-foreground">Bahasa Malaysia</div>
                              <Textarea
                                value={option.description?.BM}
                                onChange={(e) => updateOption(index, 'description', e.target.value, 'BM')}
                                placeholder="Penerangan pilihan"
                                rows={2}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>{t('OPTION_IMAGE')}</Label>
                          <div className="grid gap-3">
                            {option.image && (
                              <div className="relative w-full h-32 rounded-lg border-2 border-dashed border-border overflow-hidden">
                                <img
                                  src={option.image}
                                  alt="Option preview"
                                  className="w-full h-full object-cover"
                                />
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="destructive"
                                  className="absolute top-2 right-2"
                                  onClick={() => updateOption(index, 'image', '')}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            )}
                            <div className="flex gap-2">
                              <div className="flex-1">
                                <Input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleOptionImageUpload(index, e)}
                                  className="cursor-pointer"
                                  id={`optionImageUpload-${index}`}
                                />
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => document.getElementById(`optionImageUpload-${index}`)?.click()}
                              >
                                <Upload className="w-4 h-4 mr-2" />
                                {t('BUTTONS.UPLOAD')}
                              </Button>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {t('OPTION_IMAGE_URL')}
                            </div>
                            <Input
                              value={option.image.startsWith('data:') ? '' : option.image}
                              onChange={(e) => updateOption(index, 'image', e.target.value)}
                              placeholder="https://..."
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>{t('SHOPEE_LINK')}</Label>
                          <Input
                            value={option.shopeeLink}
                            onChange={(e) => updateOption(index, 'shopeeLink', e.target.value)}
                            placeholder="https://shopee.com.my/..."
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}
              disabled={loading.edit}
              onClick={() => { setIsEditDialogOpen(false); resetForm(); setActiveTab('basic')}}
            >
              {t('BUTTONS.CANCEL')}
            </Button>
            <Button
              onClick={() => handleEditProduct(formData)}
              disabled={loading.edit}
            >
              {t('BUTTONS.UPDATE')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteProductId}
        onOpenChange={
          (open) => {
            if (!loading.delete && !open) {
              setDeleteProductId(null);
            }
          }
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('ARE_YOU_SURE_PRODUCT_DELETION_TITLE')}</AlertDialogTitle>
            <AlertDialogDescription>{t('ARE_YOU_SURE_PRODUCT_DELETION_DESCRIPTION')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={loading.delete}
              style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}
            >
              {t('BUTTONS.CANCEL')}
            </AlertDialogCancel>
            <Button
              disabled={loading.delete}
              onClick={() => {
                if (deleteProductId) {
                  handleDeleteProduct(deleteProductId);
                }
              }}
              className={loading.delete ? "bg-red-600 opacity-50 cursor-not-allowed text-white px-4 py-2 rounded-md" : "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"}
            >
              {loading.delete ? t('BUTTONS.DELETING') : t('BUTTONS.DELETE')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}