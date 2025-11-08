import { toast } from 'sonner';

export const errorToastStyle = {
  style: {
    background: '#fee2e2',
    color: '#b91c1c',
    border: '1px solid #fca5a5',
  }
};

export const successToastStyle = {
  style: {
    background: '#e2feefff',
    color: '#1cb968ff',
    border: '1px solid #a5fcc6ff',
  }
};

export const catchError = (
  customErrMessage: string,
  err: any
 ) => {
  const message = err instanceof Error ? err.message : String(err);
  toast.error(customErrMessage + message, errorToastStyle);
};