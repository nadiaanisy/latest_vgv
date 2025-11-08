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
      toast.error('Failed to load', errorToastStyle);
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
    const {data, error } = await getHelper(db.table.products, db.query.all);

    if (error) {
      toast.error('Failed to load products', errorToastStyle);
      return [];
    }

    return data;
  } catch (err) {
    catchError('Error fetching products', err);
    return [];
  }
};