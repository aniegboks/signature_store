import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { productType } from './productType'
import { orderType } from './orderType'
import { salesType } from './salesType'
import { bannerType} from './bannerType'
import { faqType } from './faqType'
import { testimonialType } from './testimonialType'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, productType, orderType, salesType, bannerType, faqType, testimonialType],
}
