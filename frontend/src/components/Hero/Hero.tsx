import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative text-foreground py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center text-center">
        {/* Main Heading */}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Welcome to Doctors Nexus Amity
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl">
          Empowering medical professionals with knowledge, skills, and a global
          network for better health outcomes.
        </p>

        {/* CTA Button */}
        <div className="mt-8">
          <Button className="p-6 text-lg">
            <div onClick={() => navigate("./diimun")}>Explore DIIMUN</div>
          </Button>
        </div>

        {/* Product Highlights */}
        <div className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title:
                "DIIMUN: Doctors Integrated International Model United Nations",
              link: "/diimun",
              description:
                "Learn diplomacy and international health policy by participating in DIIMUN, a unique Model United Nations experience tailored for medical professionals. Enhance your leadership and negotiation skills while discussing global healthcare challenges.",
            },
            {
              title: "The Great Homoeopathic Assembly",
              link: "/great-homoeopathic-assembly",
              description:
                "Take on the persona of a homeopathic legend and let your passion for homoeopathy shine. Engage in deep philosophical debates, explore groundbreaking ideas, and compete to be recognized as the future voice of homoeopathy. Discover the beauty of homeopathic science through the lens of its most influential figures.",
            },
            {
              title: "World Health Organization Assembly",
              link: "/who-assembly",
              description:
                "Step into the shoes of world health leaders to address global healthcare issues and propose real-world solutions. Tackle complex health challenges, advocate for sustainable policies, and collaborate with peers to create an impactful healthcare vision for the future.",
            },
          ].map((product, index) => (
            <div
              key={index}
              onClick={() => navigate(product.link)}
              className="p-6 bg-card dark:bg-sidebar-primary rounded-lg shadow-lg transition hover:shadow-xl hover:scale-105 transform text-card-foreground dark:text-sidebar-primary-foreground"
            >
              <h3 className="text-xl font-semibold text-primary dark:text-primary-foreground">
                {product.title}
              </h3>
              <p className="mt-2 text-sm">{product.description}</p>
              <span className="mt-4 inline-block text-primary-primary dark:text-primary-foreground font-medium">
                Learn More →
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
