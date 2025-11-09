import i18next from 'i18next';
import { toast } from 'sonner';
import {
  catchError,
  errorToastStyle
} from '../functions/catchError';
import { getHelper } from './apiHelper';
import { db } from '../assets/constants';
import { Testimonial } from '../utils/interface';

export const fetchTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const {data, error } = await getHelper(db.table.testimonials, db.query.all)
      .order('date', { ascending: false });

    if (error) {
      toast.error(i18next.t('MESSAGES.ERROR_FAILED_TO_LOAD_TESTIMONIALS') as string, errorToastStyle);
      return [];
    }

    return data as unknown as Testimonial[];
  } catch (err) {
    catchError('Error fetching testimonials', err);
    return [];
  }
};

export const fetchProducts = async (): Promise<any[]> => {
  try {
    // 1️⃣ Fetch all products
    const { data: products, error: productsError } = await getHelper(db.table.products, db.query.all);

    if (productsError) {
      toast.error(
        i18next.t('MESSAGES.ERROR_FAILED_TO_LOAD_PRODUCTS') as string,
        errorToastStyle
      );
      return [];
    }

    if (!products || products.length === 0) return [];

    // 2️⃣ Fetch all product options
    const { data: allOptions, error: optionsError } = await getHelper(db.table.productOptions, db.query.all);

    if (optionsError) {
      toast.error(
        i18next.t('MESSAGES.ERROR_FAILED_TO_LOAD_PRODUCT_OPTIONS') as string,
        errorToastStyle
      );
      // Still return products without options
      return products.map((p: any) => ({ ...p, options: [] }));
    }

    // 3️⃣ Merge options into corresponding products
    const productsWithOptions = products.map((product: any) => ({
      ...product,
      options: allOptions?.filter((opt: any) => opt.product_id === product.id) || []
    }));

    return productsWithOptions;
  } catch (err) {
    catchError('Error fetching products with options', err);
    return [];
  }
};