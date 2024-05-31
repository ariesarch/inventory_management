import ProductScreen from "@/components/orgamisms/product/ProductScreen";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-1">
    <div className="max-width px-4 md:px-8 md:mt-10 md:mb-4">
        <ProductScreen/>
      </div>
    </main>
  );
}
