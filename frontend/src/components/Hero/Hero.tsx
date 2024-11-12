import { Button } from "../ui/button";

export const Hero = () => (
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
          <a href="/diimun">Explore DIIMUN</a>
        </Button>
      </div>

      {/* Product Highlights */}
      <div className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title:
              "DIIMUN: Doctors Integrated International Model United Nations",
            href: "/diimun",
            description:
              "Learn diplomacy and international health policy by participating in DIIMUN, a unique Model United Nations experience tailored for medical professionals. Enhance your leadership and negotiation skills while discussing global healthcare challenges.",
          },
          {
            title: "Medical Conference",
            href: "/medical-conference",
            description:
              "Join our annual medical conference to stay updated on the latest trends in healthcare, explore innovative treatments, and network with experts in the field. A hub for medical research, knowledge sharing, and collaboration.",
          },
          {
            title: "Certification Courses",
            href: "/courses",
            description:
              "Advance your career with our range of certification courses, including specialized topics in health-tech, leadership, medical communication, and more. Gain practical skills and credentials recognized by leading healthcare institutions.",
          },
          {
            title: "Health-Tech Bridge Course",
            href: "/health-tech-bridge-course",
            description:
              "Transform your medical knowledge into tech expertise. Our Health-Tech Bridge Course equips medical graduates with the skills needed to excel in the booming HealthTech industry. Learn about telemedicine, health data management, and digital health tools.",
          },
          {
            title: "Doctor's Marketplace",
            href: "/doctors-marketplace",
            description:
              "Access a comprehensive marketplace for teleconsultations, second opinions, specialized medical services, and more. Connect with patients, peers, and healthcare providers in an innovative, collaborative environment.",
          },
          {
            title: "Medical Research Hub",
            href: "/medical-research-hub",
            description:
              "Collaborate with fellow doctors, researchers, and academics in our Medical Research Hub. Share findings, work on joint research projects, and stay at the forefront of medical discoveries and innovations.",
          },
        ].map((product, index) => (
          <a
            key={index}
            href={product.href}
            className="p-6 bg-card dark:bg-sidebar-primary rounded-lg shadow-lg transition hover:shadow-xl hover:scale-105 transform text-card-foreground dark:text-sidebar-primary-foreground"
          >
            <h3 className="text-xl font-semibold text-primary dark:text-primary-foreground">
              {product.title}
            </h3>
            <p className="mt-2 text-sm">{product.description}</p>
            <span className="mt-4 inline-block text-primary-primary dark:text-primary-foreground font-medium">
              Learn More →
            </span>
          </a>
        ))}
      </div>
    </div>
  </section>
);
