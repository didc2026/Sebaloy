export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sebaloy",
    url: "https://www.sebaloybd.com",
    logo: "https://www.sebaloybd.com/logo/sebaloy-logo.png",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}