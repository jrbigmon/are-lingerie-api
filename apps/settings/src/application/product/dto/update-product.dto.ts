import { CreateProductInput } from '../../../domain/product/service/create-product.service';
import { CreateProductOutput } from './create-product.dto';

export interface UpdateProductInput extends CreateProductInput {}
export interface UpdateProductOutput extends CreateProductOutput {}
