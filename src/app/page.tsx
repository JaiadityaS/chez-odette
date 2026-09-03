import Header from "@/components/ui/Header";
import Hero from "@/components/ui/Hero";
import FeatureBar from "@/components/ui/FeatureBar";
import Story from "@/components/ui/Story";
import TodaysBake from "@/components/ui/TodaysBake";
import Footer from "@/components/ui/Footer";
import OrderConfirmation from "@/components/ui/OrderConfirmation";

export default function Home() {
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#f1eae0" }}>
      <main
        className="mx-auto my-6 max-w-[1160px] bg-paper px-6 md:px-12"
        style={{
          borderRadius: "var(--radius-frame)",
          boxShadow: "0 1px 40px rgba(43,32,25,0.06)",
        }}
      >
        <Header />
        <Hero />
        <FeatureBar />
        <Story />
        <TodaysBake />
        <Footer />
      </main>
      <OrderConfirmation />
    </div>
  );
}
