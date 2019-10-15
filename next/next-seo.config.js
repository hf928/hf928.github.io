// reference: https://github.com/garmeeh/next-seo#full-config-options

const siteName = '';

const defaultConfig = {
    title: siteName,
    description: 'description',
};

export default {
    titleTemplate: `${siteName} — %s`,
    ...defaultConfig,
    openGraph: {
        type: 'website',
        url: 'https://www.google.com.tw/',
        images: [],
        ...defaultConfig,
    }
};
