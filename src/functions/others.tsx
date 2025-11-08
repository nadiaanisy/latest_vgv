import { email, instagramHandle, titktokHandle, whatsappNumber } from "../assets/constants";

export function handleClicks(type: string) {
  if(type === 'instagram') {
    window.open(`https://instagram.com/${instagramHandle.replace('@', '')}`, '_blank');
  } else if (type === 'tiktok') {
    window.open(`https://tiktok.com/${titktokHandle.replace('@', '')}`, '_blank');
  } else if (type === 'fb'){
    window.open(`https://www.facebook.com/share/1AsNBwPqTN/?mibextid=wwXIfr`, '_blank');
  } else {
    window.open(`mailto:${email}`, '_blank');
  }
}

export function handleWhatsAppOrder(
  from: string,
  message?: string,
  productName?: string,
  price?: string
) {
  let msg = '';
  if(from === 'cart') {
    msg = message ?? "";
  } else if(from === 'home') {
    if (localStorage.getItem('i18nextLng') === 'BM') {
      msg = "Hai! Saya berminat untuk menempah produk anda. Bolehkah anda membantu saya?";
    } else {
      msg = "Hi! I'm interested in ordering your products. Can you help me?";
    }
  } else if(from === 'products') {
    if (localStorage.getItem('i18nextLng') === 'BM') {
      msg = `Hai! Saya berminat untuk memesan ${productName} (${price})

            Saya ingin tahu:
            - Ketersediaan semasa dan garis masa penghantaran
            - Pilihan saiz dan panduan pemasangan
            - Kaedah pembayaran diterima
            - Sebarang promosi semasa

            Tidak sabar-sabar untuk mendengar daripada anda!`;
    } else {
      msg = `Hi! I'm interested in ordering the ${productName} (${price})

            I'd like to know:
            - Current availability and delivery timeline
            - Size options and fitting guidance  
            - Payment methods accepted
            - Any current promotions

            Looking forward to hearing from you!`;
    }
  } else {
    if (localStorage.getItem('i18nextLng') === 'BM') {
      msg = "Hai! Saya berminat untuk mengetahui lebih lanjut tentang produk anda.";
    } else {
      msg = "Hi! I'm interested in learning more about your products.";
    }
  }
  const encodedMessage = encodeURIComponent(msg);
  window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
}