import {
  Users,
  Leaf,
  ShieldCheck,
  CalendarDays,
} from "lucide-react";

export default function FeatureHighlights() {
  const features = [
    {
      icon: <Users size={26} />,
      title: "Professional",
      subtitle: "Therapists",
    },
    {
      icon: <Leaf size={26} />,
      title: "Premium",
      subtitle: "Products",
    },
    {
      icon: <ShieldCheck size={26} />,
      title: "Clean &",
      subtitle: "Sanitized",
    },
    {
      icon: <CalendarDays size={26} />,
      title: "Easy",
      subtitle: "Booking",
    },
  ];

  return (
    <section className="feature-highlights">

      {features.map((item) => (
        <div
          key={item.title}
          className="feature-card"
        >
          <div className="feature-icon">
            {item.icon}
          </div>

          <p>{item.title}</p>
          <span>{item.subtitle}</span>

        </div>
      ))}

    </section>
  );
}