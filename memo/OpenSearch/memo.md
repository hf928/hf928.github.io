# OpenSearch

### Create a OpenSearch description document([OSDD]): OpenSearchDescription.xml

```
<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription
    xmlns="http://a9.com/-/spec/opensearch/1.1/"
    xmlns:moz="http://www.mozilla.org/2006/browser/search/"
>
    <ShortName>Name</ShortName>
    <Description>Description</Description>
    <InputEncoding>UTF-8</InputEncoding>
    <Contact>haofu.hsieh@gmail.com</Contact>
    <Url rel="results"
        type="text/html"
        method="get"
        template="https://myexample.com/search?query={searchTerms}&amp;cid=123"
    />
    <Language>zh-tw</Language>
</OpenSearchDescription>
```

### The link to the [OSDD] should be placed in the head of the html file.
```
<head>
    <link type="application/opensearchdescription+xml"
        rel="search"
        href="OpenSearchDescription.xml"/>
</head>
```

### Installs a search engine plugin into the browser with window.external.AddSearchProvider

```
if (window.external
    && window.external.AddSearchProvider) {

    window.external.AddSearchProvider(https://myexample.com/OpenSearchDescription.xml);

}
```

### References and Documents:

https://github.com/dewitt/opensearch/blob/master/opensearch-1-1-draft-6.md

https://developer.mozilla.org/en-US/docs/Web/API/Window/sidebar/Adding_search_engines_from_Web_pages

https://www.chromium.org/tab-to-search

https://www.askapache.com/seo/opensearch-description-document/

[OSDD]: https://github.com/dewitt/opensearch/blob/master/opensearch-1-1-draft-6.md