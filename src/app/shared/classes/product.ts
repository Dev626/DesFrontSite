export interface Product {
  id?: number;
  sku?: number;
	name?: string;
	slug?: string;
	price?: number;
	sale_price?: number;
	review?: number;
	ratings?: number;
	until?: string;
	stock?: number;
	top?: boolean;
	featured?: boolean;
	new?: boolean;
  short_desc?: string;
  description?: string;
  addtional_info?: string;
  shipp_returns?: string;
	category?: Array<{
		name?: string;
		slug?: string;
	}>;
	pictures?: Array<{
		width?: number;
		height?: number;
    url: string;
	}>;
	sm_pictures?: Array<{
		width?: number;
		height?: number;
    url?: string;
	}>
	variants?: Array<{
		color?: string;
		color_name?: string;
		price?: number;
		size?: Array<{
			name?: string;
		}>
	}>
}
