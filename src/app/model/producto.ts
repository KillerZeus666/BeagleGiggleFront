export interface Producto {
  url: string;
  name: string;
  sku: number;
  gtin12: number;
  breadcrumb: string;
  category_1: string;
  category_2: string;
  category_3: string;
  brand: string;
  Price: string;
  description: string;
  availability: string;
  images: any; 
  average_rating: number;
  reviews_count: number;
  ingredients: string;
  calory_content: string;
  nutrition_analysis: string;
  feeding_instructions: string;
  uniq_id: string;
  scraped_at: string;
  PriceCOP?: number;
  type: 'Dog' | 'Cat';

}
