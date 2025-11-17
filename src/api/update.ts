import {
  getHelper,
  insertHelper,
  updateHelper
} from './apiHelper';
import i18next from 'i18next';
import { toast } from 'sonner';
import {
  catchError,
  errorToastStyle,
  successToastStyle
} from '../functions/catchError';
import { db } from '../assets/constants';

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
    // Prepare payload for main product table
    const newDataToUpdate: any = {
      image: dataToUpdate.image,
      name: dataToUpdate.name,
      category: dataToUpdate.category,
      description_short: dataToUpdate.description_short,
      description_long: dataToUpdate.description_long,
      benefits: dataToUpdate.benefits,
      stock: dataToUpdate.stock,
      whyChosen: dataToUpdate.whyChosen,
      priceRange: dataToUpdate.priceRange,
      originalPrice: parseFloat(dataToUpdate.originalPrice).toFixed(2),
      salePrice: parseFloat(dataToUpdate.salePrice).toFixed(2),
      shopeeLink: dataToUpdate.shopeeLink,
      targetMarket: dataToUpdate.targetMarket,
      hasOptions: dataToUpdate.hasOptions
    };

    // Update main product
    const { error: updateErr } = await updateHelper(db.table.products, newDataToUpdate)
      .eq("id", id)
      .select();

    if (updateErr) {
      toast.error(
        i18next.t("MESSAGES.ERROR_FAILED_TO_UPDATE_PRODUCT") as string,
        errorToastStyle
      );
      return;
    }

    //--------------------------------------------------------------------
    //  HANDLE PRODUCT OPTIONS
    //--------------------------------------------------------------------
    if (dataToUpdate.hasOptions) {
      // Fetch existing product options
      const { data: existingOptions, error: getOptErr } = await getHelper(
        db.table.productOptions,
        db.query.all
      ).eq("product_id", id);

      if (getOptErr) {
        catchError("Error fetching product options", getOptErr);
        return;
      }

      const incomingOptions = dataToUpdate.options || [];

      //------------------------------------------------------------------
      // 1️⃣ UPDATE EXISTING OPTIONS
      //------------------------------------------------------------------
      if (existingOptions?.length > 0) {
        for (const existing of existingOptions as any) {
          const updated = incomingOptions.find((opt: any) => opt.id === existing.id);

          if (updated) {
            const { error: updateOptErr } = await updateHelper(
              db.table.productOptions,
              {
                name: updated.name,
                description: updated.description,
                image: updated.image,
                originalPrice: parseFloat(updated.originalPrice).toFixed(2),
                salePrice: parseFloat(updated.salePrice).toFixed(2),
                shopeeLink: updated.shopeeLink
              }
            )
              .eq("id", existing.id)
              .select();

            if (updateOptErr) {
              toast.error(
                i18next.t("MESSAGES.ERROR_FAILED_TO_UPDATE_PRODUCT_OPTIONS") as string,
                errorToastStyle
              );
              return;
            }
          }
        }
      }

      //------------------------------------------------------------------
      // 2️⃣ INSERT NEW OPTIONS (those without id)
      //------------------------------------------------------------------
      const newOptions = incomingOptions.filter((opt: any) => !opt.id);

      if (newOptions.length > 0) {
        const insertPayload = newOptions.map((opt: any) => ({
          product_id: id,
          name: opt.name,
          description: opt.description,
          image: opt.image,
          originalPrice: parseFloat(opt.originalPrice).toFixed(2),
          salePrice: parseFloat(opt.salePrice).toFixed(2),
          shopeeLink: opt.shopeeLink
        }));

        const { error: insertErr } = await insertHelper(
          db.table.productOptions,
          insertPayload
        ).select();

        if (insertErr) {
          toast.error(
            i18next.t("MESSAGES.ERROR_FAILED_TO_ADD_PRODUCT_OPTIONS") as string,
            errorToastStyle
          );
          return;
        }
      }
    }

    toast.success(
      i18next.t('MESSAGES.SUCCESS_PRODUCT_UPDATED') as string,
      successToastStyle
    );
    return 'SUCCESS';
  } catch (err) {
    catchError('Error updating products', err);
  }
}