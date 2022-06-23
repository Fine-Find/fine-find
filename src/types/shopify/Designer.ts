export type DesignerPage = {
  title: string;
  handle: string;
  template_suffix: string;
  metafields?: [
    {
      namespace: 'designer';
      key: 'data';
      value_type: 'json_string';
      value: string;
    }
  ];
};

export type DesignerMetafields = {
  hero_image_link?: string;
  profile_image_link: string;
  book_time_link?: string;
  instagram_link: string;
  website_link: string;
  company_name: string;
  bio_text_1?: string;
  bio_text_2: string;
  num_posts?: number;
  posts?: { [key in string]: DesignerPosts } | Record<string, never>;
};

export type DesignerPosts = {
  pic_link: string;
  post_href: string;
};

export type DesignerProduct = {
  title: string;
  body_html?: string;
  vendor: string;
  handle?: string;
  product_type: string;
  tags?: [string];
  variants?: [any]
};
