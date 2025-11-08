export interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  avatar: string
  location: string
  date: string
  rating: number
  comment: string
  product?: string
}

export interface ProductReview {
  productName: string
  comment: string
  rating: string
}

export interface Product {
  id: string
  image: string
  name: {
    EN: string
    BM: string
  }
  category: string
  description_long: {
    EN: string
    BM: string
  }
  description_short: {
    EN: string
    BM: string
  }
  priceRange: string
  originalPrice: string
  whyChosen: {
    EN: string
    BM: string
  }
  targetMarket: {
    EN: string[]
    BM: string[]
  }
  benefits: {
    EN: string[]
    BM: string[]
  }
  hasOptions: boolean
  salePrice?: number
  shopeeLink?: string
  stock?: number
  options?: {
    name?: {
      EN: string
      BM: string
    }
    originalPrice?: string
    salePrice?: string
    description?: {
      EN: string
      BM: string
    }
    image?: string
    shopeeLink?: string
  }[]
}

export interface ProductFormData {
  name: {
    EN: string
    BM: string
  }
  category: string
  description_short: {
    EN: string
    BM: string
  }
  description_long: {
    EN: string
    BM: string
  }
  priceRange: string
  originalPrice: string
  whyChosen: {
    EN: string
    BM: string
  }
  targetMarket: {
    EN: string[]
    BM: string[]
  }
  benefits: {
    EN: string[]
    BM: string[]
  }
  hasOptions: boolean
  salePrice: string
  shopeeLink: string
  stock: string
  image: string
  options: {
    name: {
      EN: string
      BM: string
    }
    originalPrice: string
    salePrice: string
    description: {
      EN: string
      BM: string
    }
    image: string
    shopeeLink: string
  }[]
}