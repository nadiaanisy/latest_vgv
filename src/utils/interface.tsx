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
  originalPrice: number
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
  id?: number
  options?: {
    id?: number
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
    shopeeLink?: string,
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
  id?: number
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

export interface OrderItem {
  order_id: string
  product_id: string
  product_name: string
  quantity: number
  unit_price: number
  percent_mark: number
  total_price: number
  profit_per_item: number
  cost_price: number
}

export interface Order {
  id: string
  total_price: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  payment_method: string
  shipping_address: string
  billing_address: string
  shipping_charge: number
  customer_name: string
  customer_email: string
  customer_phone: string
  order_date: string
  items: OrderItem[]
}

export interface OrderItem {
  product_id: string
  product_name: string
  quantity: number
  unit_price: number
  cost_price: number
  percent_mark: number
  profit_per_item: number
  total_price: number
}

export interface NewOrder {
  customer_name: string
  customer_email: string
  customer_phone: string
  shipping_address: string
  billing_address: string
  payment_method: string
  shipping_charge: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: OrderItem[]
}