import ErrorPage from 'next/error';
import { getPageData, fetchAPI, getGlobalData } from 'utils/api';
import Sections from '@/components/sections';
import Seo from '@/components/elements/seo';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';

// The file is called [[...slug]].js because we're using Next's
// optional catch all routes feature. See the related docs:
// https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes

const DynamicPage = ({ sections, metadata, preview, global }) => {
  const router = useRouter();

  // Check if the required data was provided
  if (!router.isFallback && !sections?.length) {
    return <ErrorPage statusCode={404} />;
  }

  // Loading screen (only possible in preview mode)
  if (router.isFallback) {
    return <div className="container">Loading...</div>;
  }

  // Merge default site SEO settings with page specific SEO settings
  if (metadata.shareImage?.data == null) {
    delete metadata.shareImage;
  }
  const metadataWithDefaults = {
    ...global.attributes.metadata,
    ...metadata,
  };

  return (
    <Layout global={global}>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadataWithDefaults} />
      {/* Display content sections */}
      <Sections sections={sections} preview={preview} />
    </Layout>
  );
};

export async function getStaticPaths(context) {
  // Get all pages from Strapi
  // Commented code remnant of localization
  // const pages = await context.locales.reduce(
  //   async (currentPagesPromise, locale) => {
  //     const currentPages = await currentPagesPromise;
  //     const localePages = await fetchAPI('/pages', {
  //       locale,
  //       fields: ['slug', 'locale'],
  //     });
  //     return [...currentPages, ...localePages.data];
  //   },
  //   Promise.resolve([])
  // );

  const pages = await fetchAPI('/pages', { fields: ['slug'] });

  const paths = pages.data.map((page) => {
    const { slug } = page.attributes;
    // Decompose the slug that was saved in Strapi
    const slugArray = !slug ? false : slug.split('/');

    return {
      params: { slug: slugArray },
    };
  });

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const { params, preview = null } = context;

  const globalData = await getGlobalData();
  // Fetch pages. Include drafts if preview mode is on
  const pageData = await getPageData({
    slug: (!params.slug ? [''] : params.slug).join('/'),
    preview,
  });

  if (pageData == null) {
    // Giving the page no props will trigger a 404 page
    return { props: {} };
  }

  // We have the required page data, pass it to the page component
  const { contentSections, metadata } = pageData.attributes;

  return {
    props: {
      preview,
      sections: contentSections,
      metadata,
      global: globalData.data,
    },
  };
}

export default DynamicPage;
