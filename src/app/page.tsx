import Header from "@/components/ui/Header";
import Hero from "@/components/ui/Hero";
import Marquee from "@/components/ui/Marquee";
import Welcome from "@/components/ui/Welcome";
import TodaysBake from "@/components/ui/TodaysBake";
import ForEveryMoment from "@/components/ui/ForEveryMoment";
import WhyDirect from "@/components/ui/WhyDirect";
import Testimonial from "@/components/ui/Testimonial";
import CtaBlock from "@/components/ui/CtaBlock";
import Footer from "@/components/ui/Footer";
import OrderConfirmation from "@/components/ui/OrderConfirmation";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-paper">
      <Header />
      <Hero />
      <Marquee />
      <Welcome />
      <TodaysBake />
      <ForEveryMoment />
      <WhyDirect />
      <Testimonial />
      <CtaBlock />
      <Footer />
      <OrderConfirmation />
    </div>
  );
}
