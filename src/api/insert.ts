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
      toast.error('Failed to add testimonials', errorToastStyle);
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
      toast.error('Failed to add products', errorToastStyle);
      return
    }

    return data;
  } catch (err) {
    catchError('Error adding products', err);
  }
};