import { Brand, Category, Subcategory } from "./prodcuts.model"

export interface WishlistResponse {
    status: string
    message: string
    data: string[]
  }
  

  export interface GetWishListResponse {
    status: string
    count: number
    data: WishListProducts[]
  }
  
  export interface WishListProducts {
    sold: number
    images: string[]
    subcategory: Subcategory[]
    ratingsQuantity: number
    _id: string
    title: string
    slug: string
    description: string
    quantity: number
    price: number
    imageCover: string
    category: Category
    brand: Brand
    ratingsAverage: number
    createdAt: string
    updatedAt: string
    __v: number
    id: string
  }