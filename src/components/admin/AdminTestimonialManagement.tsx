import {
  useState,
  useEffect
} from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../ui/card';
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Star,
  MessageSquare
} from 'lucide-react';
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
  Select,
  SelectContent,
SelectItem,
SelectTrigger,
SelectValue
} from '../ui/select';
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '../ui/avatar';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '../ui/alert-dialog';
import {
  ProductReview,
  Testimonial
} from '../../utils/interface';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { fetchTestimonials } from '../../api/get';
import { addTestimonials } from '../../api/insert';
import { updateTestimonials } from '../../api/update';
import { deleteTestimonials } from '../../api/delete';
import { useCustomHook } from '../../utils/customHooks';
import { defaultUserImage, malaysianStates } from '../../assets/constants';
import { errorToastStyle, successToastStyle } from '../../functions/catchError';
import { TestimonialSkeletonGrid } from './TestimonialSkeleton';

export function AdminTestimonialManagement() {
  const {
    t,
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
    setIsLoadingSkeleton
  } = useCustomHook();

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    location: '',
    avatar: ''
  })
  
  const [productReviews, setProductReviews] = useState<ProductReview[]>([
    { productName: '', comment: '', rating: '5' }
  ])

  useEffect(() => {
    const loadTestimonials = async () => {
      setIsLoadingSkeleton(true);
      const data = await fetchTestimonials();
      setTestimonials(data);
      setIsLoadingSkeleton(false);
    };

    loadTestimonials();
  }, []);
  
  const handleAddTestimonial = async () => {
    if (!formData.name) {
      toast.error(t('MESSAGES.ERROR_ENTER_CUSTOMER_NAME'), errorToastStyle)
      return
    }

    // Validate all product reviews
    const validReviews = productReviews.filter(review => review.productName.trim() && review.comment.trim())
    
    if (validReviews.length === 0) {
      toast.error(t('MESSAGES.ERROR_FILL_ALL_REQUIRED_FIELDS'), errorToastStyle)
      return
    }

    // Create a testimonial for each product
    const newTestimonials: Testimonial[] = validReviews.map((review, index) => ({
      id: Date.now() + index,
      name: formData.name,
      role: formData.role,
      company: formData.company,
      rating: parseInt(review.rating),
      comment: review.comment,
      product: review.productName,
      avatar: formData.avatar || defaultUserImage,
      date: new Date().toLocaleDateString('en-CA'),
      location: formData.location
    }))

    const data: any = await addTestimonials(newTestimonials);
    setTestimonials((prev: any) => [data[0], ...prev])
    toast.success(t('MESSAGES.SUCCESS_TESTIMONIAL_ADDED'), successToastStyle)
    resetForm()
    setIsAddDialogOpen(false)
  }

  const handleEditTestimonial = async () => {
    const validReview = productReviews[0]
    if (!editingTestimonial || !formData.name || !validReview.productName.trim() || !validReview.comment.trim()) {
      toast.error(t('MESSAGES.ERROR_FILL_ALL_REQUIRED_FIELDS'))
      return
    }

    const dataToUpdate = {
      name: formData.name,
      role: formData.role,
      company: formData.company,
      rating: parseInt(validReview.rating),
      comment: validReview.comment,
      avatar: formData.avatar,
      location: formData.location,
      product: validReview.productName
    };

    const idToUpdate = editingTestimonial.id;

    const data: any = await updateTestimonials(dataToUpdate, idToUpdate);
    setTestimonials((prev: any[]) => prev.map(t => t.id === editingTestimonial.id ? data[0] : t))
    toast.success(t('MESSAGES.SUCCESS_TESTIMONIAL_UPDATED'), successToastStyle)
    resetForm()
    setIsEditDialogOpen(false)
    setEditingTestimonial(null)
  }

  const handleDeleteTestimonial = async (id: number) => {
    await deleteTestimonials(id);
    setTestimonials((prev: any[]) => prev.filter((t: Testimonial) => t.id !== id))
    toast.success(t('MESSAGES.SUCCESS_TESTIMONIAL_DELETED'), successToastStyle)
    setDeleteTestimonialId(null)
  }

  const openEditDialog = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company,
      avatar: testimonial.avatar,
      location: testimonial.location
    })
    setProductReviews([{
      productName: testimonial.product || '',
      comment: testimonial.comment,
      rating: testimonial.rating.toString()
    }])
    setIsEditDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      company: '',
      avatar: '',
      location: ''
    })
    setProductReviews([{ productName: '', comment: '', rating: '5' }])
  }

  const addProductReview = () => {
    setProductReviews([...productReviews, { productName: '', comment: '', rating: '5' }])
  }

  const removeProductReview = (index: number) => {
    if (productReviews.length > 1) {
      setProductReviews(productReviews.filter((_, i) => i !== index))
    }
  }

  const updateProductReview = (index: number, field: keyof ProductReview, value: string) => {
    const updated = [...productReviews]
    updated[index] = { ...updated[index], [field]: value }
    setProductReviews(updated)
  }

  const filteredTestimonials = testimonials.filter((testimonial: Testimonial) =>
    testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    testimonial.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    testimonial.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
    testimonial.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    testimonial.product?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const isFormChanged = editingTestimonial && (
    formData.name !== editingTestimonial.name ||
    formData.role !== editingTestimonial.role ||
    formData.company !== editingTestimonial.company ||
    formData.avatar !== editingTestimonial.avatar ||
    formData.location !== editingTestimonial.location ||
    productReviews[0]?.productName !== editingTestimonial.product ||
    productReviews[0]?.comment !== editingTestimonial.comment ||
    productReviews[0]?.rating !== String(editingTestimonial.rating)
  )

  const isSaveDisabled =
    !formData.name ||
    !productReviews[0]?.comment.trim() ||
    !productReviews[0]?.rating;

  const averageRating = testimonials.length > 0
    ? (testimonials.reduce((sum: any, r: { rating: any; }) => sum + r.rating, 0) / testimonials.length).toFixed(1)
    : '0.0'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-foreground mb-2">{t('TESTIMONIAL_MANAGEMENT_TITLE')}</h2>
          <p className="text-muted-foreground">
            {t('TESTIMONIAL_MANAGEMENT_SUBTITLE')}
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              {t('BUTTONS.ADD_TESTIMONIAL')}
            </Button>
          </DialogTrigger>
          <DialogContent
            className="max-w-3xl max-h-[90vh] overflow-y-auto"
            aria-describedby={undefined}
            onPointerDownOutside={(e) => e.preventDefault()}
            onInteractOutside={(e) => e.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle>{t('TESTIMONI_FORM_TITLE_ADD')}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              {/* Customer Information */}
              <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
                <h3 className="font-medium text-sm text-foreground">{t('CUSTOMER_INFORMATION')}</h3>
                <div className="space-y-2">
                  <Label htmlFor="name">{t('CUSTOMER_NAME')} *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t('PLACEHOLDERS.CUSTOMER_NAME')}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">{t('ROLE_TITLE')}</Label>
                    <Input
                      id="role"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder={t('PLACEHOLDERS.ROLE_TITLE')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">{t('COMPANY_ORGANIZATION')}</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder={t('PLACEHOLDERS.COMPANY_ORGANIZATION')}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">{t('LOCATION')}</Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) => setFormData({ ...formData, location: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('PLACEHOLDERS.LOCATION')} />
                    </SelectTrigger>
                    <SelectContent>
                      {malaysianStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avatar">{t('AVATAR_URL')}</Label>
                  <Input
                    id="avatar"
                    value={formData.avatar}
                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Product Reviews */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm text-foreground">{t('PRODUCT_REVIEWS')}</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addProductReview}
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    {t('BUTTONS.ADD_PRODUCT')}
                  </Button>
                </div>

                {productReviews.map((review, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-lg bg-background relative">
                    {productReviews.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeProductReview(index)}
                        className="absolute top-2 right-2 h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                    
                    <div className="space-y-2">
                      <Label htmlFor={`product-${index}`}>{t('PRODUCT_NAME')} *</Label>
                      <Input
                        id={`product-${index}`}
                        value={review.productName}
                        onChange={(e) => updateProductReview(index, 'productName', e.target.value)}
                        placeholder={t('PLACEHOLDERS.PRODUCT_NAME')}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`rating-${index}`}>{t('RATING')} *</Label>
                      <Select
                        value={review.rating}
                        onValueChange={(value) => updateProductReview(index, 'rating', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t('PLACEHOLDERS.RATING')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">{t('RATING_LIST.5')}</SelectItem>
                          <SelectItem value="4">{t('RATING_LIST.4')}</SelectItem>
                          <SelectItem value="3">{t('RATING_LIST.3')}</SelectItem>
                          <SelectItem value="2">{t('RATING_LIST.2')}</SelectItem>
                          <SelectItem value="1">{t('RATING_LIST.1')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`comment-${index}`}>{t('REVIEW_COMMENT')} *</Label>
                      <Textarea
                        id={`comment-${index}`}
                        value={review.comment}
                        onChange={(e) => updateProductReview(index, 'comment', e.target.value)}
                        placeholder={t('PLACEHOLDERS.REVIEW_COMMENT')}
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                {t('BUTTONS.CANCEL')}
              </Button>
              <Button onClick={handleAddTestimonial} disabled={isSaveDisabled}>{t('BUTTONS.SAVE')}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2 border-2">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center py-4">
              <div className="flex items-center gap-2 bg-input-background border border-input rounded-md px-3 py-2 w-full">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  placeholder={t('PLACEHOLDERS.SEARCH_TESTIMONIALS')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="text-center">
                <MessageSquare className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-medium text-foreground">{testimonials.length}</p>
                <p className="text-xs text-muted-foreground">{t('REVIEWS')}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="text-center">
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-medium text-foreground">{averageRating}</p>
                <p className="text-xs text-muted-foreground">{t('AVG_RATING')}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Testimonials Grid */}
      {isLoadingSkeleton ? (
        <TestimonialSkeletonGrid count={4} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTestimonials.length === 0 ? (
            <Card className="md:col-span-2 border-2">
              <CardContent className="py-12 text-center text-muted-foreground">
                {t('NO_TESTIMONIALS_FOUND')}
              </CardContent>
            </Card>
          ) : (
            filteredTestimonials.map((testimonial: Testimonial) => (
              <Card key={testimonial.id} className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base text-foreground">{testimonial.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {testimonial.role}
                          {testimonial.company && ` • ${testimonial.company}`}
                          {testimonial.role && testimonial.company && testimonial.location && ` • ${testimonial.location}`}
                          {!testimonial.role && !testimonial.company && testimonial.location && ` ${testimonial.location}`}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {testimonial.product && (
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {testimonial.product}
                      </div>
                    )}
                    <p className="text-sm text-foreground leading-relaxed">
                      "{testimonial.comment}"
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <p className="text-xs text-muted-foreground">
                      {new Date(testimonial.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(testimonial)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteTestimonialId(testimonial.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent
          className="max-w-2xl max-h-[90vh] overflow-y-auto"
          aria-describedby={undefined}
          onPointerDownOutside={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>{t('TESTIMONIAL_FORM_TITLE_EDIT')}</DialogTitle>
            <DialogDescription>
              {t('TESTIMONIAL_FORM_SUBTITLE_EDIT')}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Customer Information */}
            <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
              <h3 className="font-medium text-sm text-foreground">{t('CUSTOMER_INFORMATION')}</h3>
              <div className="space-y-2">
                <Label htmlFor="edit-name">{t('CUSTOMER_NAME')} *</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t('PLACEHOLDERS.CUSTOMER_NAME')}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-role">{t('ROLE_TITLE')}</Label>
                  <Input
                    id="edit-role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder={t('PLACEHOLDERS.ROLE_TITLE')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-company">{t('COMPANY_ORGANIZATION')}</Label>
                  <Input
                    id="edit-company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder={t('PLACEHOLDERS.COMPANY_ORGANIZATION')}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-location">{t('LOCATION')} *</Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) => setFormData({ ...formData, location: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('PLACEHOLDERS.LOCATION')} />
                  </SelectTrigger>
                  <SelectContent>
                    {malaysianStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-avatar">{t('AVATAR_URL')}</Label>
                <Input
                  id="edit-avatar"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>

            {/* Product Review */}
            <div className="space-y-4 p-4 border rounded-lg bg-background">
              <h3 className="font-medium text-sm text-foreground">{t('PRODUCT_REVIEWS')}</h3>
              <div className="space-y-2">
                <Label htmlFor="edit-product">{t('PRODUCT_NAME')} *</Label>
                <Input
                  id="edit-product"
                  value={productReviews[0]?.productName || ''}
                  onChange={(e) => updateProductReview(0, 'productName', e.target.value)}
                  placeholder={t('PRODUCTS_PLACEHOLDER')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-rating">{t('RATING')} *</Label>
                <Select
                  value={productReviews[0]?.rating || '5'}
                  onValueChange={(value) => updateProductReview(0, 'rating', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('RATING_PLACEHOLDER')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">{t('RATING_LIST.5')}</SelectItem>
                    <SelectItem value="4">{t('RATING_LIST.4')}</SelectItem>
                    <SelectItem value="3">{t('RATING_LIST.3')}</SelectItem>
                    <SelectItem value="2">{t('RATING_LIST.2')}</SelectItem>
                    <SelectItem value="1">{t('RATING_LIST.1')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-comment">{t('REVIEW_COMMENT')} *</Label>
                <Textarea
                  id="edit-comment"
                  value={productReviews[0]?.comment || ''}
                  onChange={(e) => updateProductReview(0, 'comment', e.target.value)}
                  placeholder={t('REVIEW_COMMENT_PLACEHOLDER')}
                  rows={4}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              {t('BUTTONS.CANCEL')}
            </Button>
            <Button onClick={handleEditTestimonial} disabled={!isFormChanged}>
              {t('BUTTONS.UPDATE')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteTestimonialId} onOpenChange={() => setDeleteTestimonialId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('ARE_YOU_SURE_TESTIMONIAL_DELETION_TITLE')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('ARE_YOU_SURE_TESTIMONIAL_DELETION_DESCRIPTION')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('BUTTONS.CANCEL')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteTestimonialId && handleDeleteTestimonial(deleteTestimonialId)}
              className="bg-red-600 hover:bg-red-700"
            >
              {t('BUTTONS.DELETE')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
