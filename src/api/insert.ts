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
    const { data, error } = await insertHelper(db.table.products, newProducts)
      .select();

    if (error) {
      toast.error(i18next.t('MESSAGES.ERROR_FAILED_TO_ADD_PRODUCT') as string, errorToastStyle);
      return
    }

    return data;
  } catch (err) {
    catchError('Error adding products', err);
  }
};