import "./business-page.css";
import BottomNavigation from "../home/components/BottomNavigation";
import BusinessHeader from "./components/BusinessHeader";
import BusinessInfo from "./components/BusinessInfo";
import FeatureHighlights from "./components/FeatureHighlights";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import BookingBar from "./components/BookingBar";


export default async function PublicBusinessPage() {
  return (
    <div className="public-business-page">
        <main className="public-business-main">
         <BusinessHeader />
         <BusinessInfo />
         <FeatureHighlights />
         <AboutSection />
         <ServicesSection />
         <BookingBar />
      </main>

      <BottomNavigation />
    </div>
  );
}