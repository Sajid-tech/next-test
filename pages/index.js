// import Banner from "@/components/Banner";
// import Collection from "@/components/Collection";
// import Footer from "@/components/Footer";
// import Newsletter from "@/components/Newsletter";
// import Products from "@/components/Products";
import dynamic from "next/dynamic";

const Banner = dynamic(() => import('@/components/Banner'))
const Collection = dynamic(() => import('@/components/Collection'))
const Footer = dynamic(() => import('@/components/Footer'))
const Newsletter = dynamic(() => import('@/components/Newsletter'))
const Products = dynamic(() => import('@/components/Products'))




export default function Home() {
  return (
    <main className="min-h-screen p-4  bg-background">


      <Banner />
      <div className="hr"></div>
      <Products />
      <div className="hr"></div>
      <Collection />
      <div className="hr"></div>
      <Newsletter />
      <div className="hr"></div>
      <Footer />
    </main>
  );
}
