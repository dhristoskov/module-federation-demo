import type { Schema, Attribute } from '@strapi/strapi';

export interface BannerBannerSlide extends Schema.Component {
  collectionName: 'components_banner_banner_slides';
  info: {
    displayName: 'BannerSlide';
    icon: 'bold';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    image: Attribute.Media & Attribute.Required;
    ctaTitle: Attribute.String;
    ctaSlug: Attribute.String;
  };
}

export interface BannerBanner extends Schema.Component {
  collectionName: 'components_banner_banners';
  info: {
    displayName: 'Banner';
  };
  attributes: {
    slide: Attribute.Component<'banner.banner-slide', true>;
  };
}

export interface SeoSeo extends Schema.Component {
  collectionName: 'components_seo_seos';
  info: {
    displayName: 'Seo';
    icon: 'apps';
  };
  attributes: {
    meta_title: Attribute.String & Attribute.Required;
    meta_description: Attribute.Text & Attribute.Required;
    meta_image: Attribute.Media;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'banner.banner-slide': BannerBannerSlide;
      'banner.banner': BannerBanner;
      'seo.seo': SeoSeo;
    }
  }
}
