import i18next from 'i18next';
import { toast } from 'sonner';
import {
  catchError,
  errorToastStyle
} from '../functions/catchError';
import { db } from '../assets/constants';
import { insertHelper } from './apiHelper';

export const addTestimonials = async (
  newTestimonials: any
) => {
  try {
    const { data, error } = await insertHelper(db.table.testimonials, newTestimonials)
      .select();

    if (error) {
      toast.error(i18next.t('MESSAGES.ERROR_FAILED_TO_ADD_TESTIMONIAL') as string, errorToastStyle);
      return
    }

    return data;
  } catch (err) {
    catchError('Error adding testimonials', err);
  }
};

export const addProducts = async (
  newProducts: any
) => {
  try {
    console.log(newProducts)
    if (!newProducts.hasOptions) {
      const { data, error } = await insertHelper(db.table.products, newProducts)
        .select();

      if (error) {
        toast.error(i18next.t('MESSAGES.ERROR_FAILED_TO_ADD_PRODUCT') as string, errorToastStyle);
        return
      }

      return data;
    } else {
      const { data: productData, error: productDataError } = await insertHelper(db.table.products,
        {
          name: newProducts.name,
          category: newProducts.category,
          description_short: newProducts.description_short,
          description_long: newProducts.description_long,
          description: newProducts.description,
          whyChosen: newProducts.whyChosen,
          image: newProducts.image,
          priceRange: newProducts.priceRange,
          originalPrice: newProducts.originalPrice,
          salePrice: newProducts.salePrice,
          stock: newProducts.stock,
          shopeeLink: newProducts.shopeeLink,
          targetMarket: newProducts.targetMarket,
          benefits: newProducts.benefits,
          hasOptions: newProducts.hasOptions,
        }
      ).select();

      if (productDataError) {
        toast.error(i18next.t('MESSAGES.ERROR_FAILED_TO_ADD_PRODUCT') as string, errorToastStyle);
        return
      }

      const productId = productData[0].id;
      const optionsToInsert = newProducts.options.map((opt: any) => ({
        product_id: productId,
        name: opt.name,
        description: opt.description,
        image: opt.image,
        originalPrice: opt.originalPrice,
        salePrice: opt.salePrice,
        shopeeLink: opt.shopeeLink,
      }));

      const { data, error } = await insertHelper(db.table.productOptions, optionsToInsert)
        .select();

      if (error) {
        toast.error(
          i18next.t('MESSAGES.ERROR_FAILED_TO_ADD_PRODUCT_OPTIONS') as string,
          errorToastStyle
        );
        return;
      }
      return data;
    }
  } catch (err) {
    catchError('Error adding products', err);
  }
};