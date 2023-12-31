import Head from "next/head";
import { useContext } from "react";

import { getStrapiMedia } from "@/lib/media";
import { GlobalContext } from "@/pages/_app";

const Seo = ({ seo }) => {
  const { default_seo, site_title } = useContext(GlobalContext);
  const seoWithDefaults = {
    ...default_seo,
    ...seo,
  };
  const fullSeo = {
    ...seoWithDefaults,
    metaTitle: `${site_title} | ${seoWithDefaults.meta_title}`,
    shareImage: getStrapiMedia(seoWithDefaults?.image) || null,
  };

  return (
    <Head>
      {fullSeo.metaTitle && (
        <>
          <title>{fullSeo.metaTitle}</title>
          <meta property="og:title" content={fullSeo.metaTitle} />
          <meta name="twitter:title" content={fullSeo.metaTitle} />
        </>
      )}
      {fullSeo.metaDescription && (
        <>
          <meta name="description" content={fullSeo.metaDescription} />
          <meta property="og:description" content={fullSeo.metaDescription} />
          <meta name="twitter:description" content={fullSeo.metaDescription} />
        </>
      )}
      {fullSeo.shareImage && (
        <>
          <meta property="og:image" content={fullSeo.shareImage} />
          <meta name="twitter:image" content={fullSeo.shareImage} />
          <meta name="image" content={fullSeo.shareImage} />
        </>
      )}
      {fullSeo.course && <meta property="og:type" content="course" />}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default Seo;
