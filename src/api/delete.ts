import i18next from 'i18next';
import { toast } from 'sonner';
import {
  catchError,
  errorToastStyle,
} from '../functions/catchError';
import { db } from '../assets/constants';
import { deleteHelper } from './apiHelper';

export const deleteTestimonials = async (
  id: number
) => {
  try {
    const { error } = await deleteHelper(db.table.testimonials, id);

    if (error) {
      toast.error(i18next.t('MESSAGES.ERROR_FAILED_TO_DELETE_TESTIMONIAL') as string, errorToastStyle)
      return
    }

    return 'Success';
  } catch (err) {
      catchError('Error deleting testimonials', err);
  }
};

export const deleteProduct = async (
  id: any
) => {
  try {
    const { error } = await deleteHelper(db.table.products, id);

    if (error) {
      toast.error(i18next.t('MESSAGES.ERROR_FAILED_TO_DELETE_PRODUCT') as string, errorToastStyle)
      return
    }

    return 'Success';
  } catch (err) {
      catchError('Error deleting products', err);
  }
};