import NextTopLoader from "nextjs-toploader";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NextTopLoader color="#A78B5A" height={2} showSpinner={false} />

      {children}
    </>
  );
}

//  <NextTopLoader
//           color="#9F8A64" // your brand color
//           initialPosition={0.08}
//           crawlSpeed={200}
//           height={3}
//           crawl={true}
//           easing="ease"
//           speed={200}
//           shadow="0 0 10px #9F8A64,0 0 5px #9F8A64"
//           showSpinner={false}
//         />
