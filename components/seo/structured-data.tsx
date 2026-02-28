import Script from 'next/script'

export function StructuredData() {
  const baseUrl = "https://www.paramountmerchantnavy.com"
  
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Paramount Merchant Navy",
    "url": baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/courses?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Paramount Merchant Navy",
    "url": baseUrl,
    "logo": `${baseUrl}/favicon.ico`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-96302-99049",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["en", "hi"]
    },
    "sameAs": [
      "https://youtube.com/@paramountmerchantnavy?si=Iy15i9xc1LhWCNOE",
      "https://t.me/Paramountimu",
      "https://whatsapp.com/channel/0029Va4uagf3QxS4ZymMrc2u",
      "https://www.instagram.com/paramountmerchantnavy?igsh=ajgwdXY1cHAxNWp5"
    ]
  }

  return (
    <>
      <Script
        id="structured-data-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="structured-data-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  )
}
