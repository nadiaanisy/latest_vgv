import i18next from 'i18next';
import { toast } from 'sonner';
import {
  catchError,
  errorToastStyle
} from '../functions/catchError';
import { db } from '../assets/constants';
import { updateHelper } from './apiHelper';
import { fetchProducts } from './get';

export const updateTestimonials = async (
  dataToUpdate: any,
  id: any
) => {
  try {
    const { data, error } = await updateHelper(db.table.testimonials, dataToUpdate)
      .eq('id', id)
      .select();

    if (error) {
      toast.error(i18next.t('MESSAGES.ERROR_FAILED_TO_UPDATE_TESTIMONIAL') as string, errorToastStyle);
      return
    }

    return data;
  } catch (err) {
    catchError('Error updating testimonials', err);
  }
};

export const updateProducts = async (
  dataToUpdate: any,
  id: any
) => {
  try {
    const { error } = await updateHelper(db.table.products, dataToUpdate)
      .eq('id', id)
      .select(); 

    if (error) {
      toast.error(i18next.t('MESSAGES.ERROR_FAILED_TO_UPDATE_PRODUCT') as string, errorToastStyle);
      return
    }

    const data = await fetchProducts();

    return data;
  } catch (err) {
    catchError('Error updating products', err);
  }
}