import { FlagSettings } from "@vikrai/framework/feature-flags"

const ProductCategoryFeatureFlag: FlagSettings = {
  key: "product_categories",
  default_val: false,
  env_key: "vikrai_FF_PRODUCT_CATEGORIES",
  description: "[WIP] Enable the product categories feature",
}

export default ProductCategoryFeatureFlag

