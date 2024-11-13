import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CTA } from "@/components/CTA";

export const DiimunHome = () => {
  const navigate = useNavigate();
  return (
    <section className="relative text-foreground py-20 px-6 sm:px-10 lg:px-20">
      <div className="max-w-screen-lg mx-auto text-center">
        {/* Main Heading */}
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-6xl md:text-7xl text-primary dark:text-primary-foreground">
          Doctors Integrated International Model United Nations (DIIMUN)
        </h1>

        <p className="mt-8 max-w-3xl mx-auto text-lg leading-relaxed text-center text-primary">
          Step into the world of healthcare diplomacy at DIIMUN, where
          healthcare students and professionals converge to shape the future of
          medicine. DIIMUN is more than a conference—it's a gateway to
          developing the leadership and diplomatic skills essential for
          addressing global health challenges.
        </p>

        {/* Register Button */}
        <CTA />

        {/* Flagship Committees */}
        <div className="mt-16 space-y-10">
          <div
            onClick={() => navigate("/great-homoeopathic-assembly")}
            className="bg-card rounded-lg p-6 shadow-md"
          >
            <h2 className="text-3xl font-semibold text-primary dark:text-primary-foreground">
              The Great Homoeopathic Assembly
            </h2>
            <p className="mt-4 text-base leading-relaxed">
              Take on the persona of a homeopathic legend and let your passion
              for homoeopathy shine. Engage in deep philosophical debates,
              explore groundbreaking ideas, and compete to be recognized as the
              future voice of homoeopathy. Discover the beauty of homeopathic
              science through the lens of its most influential figures.
            </p>
            <Button className="mt-4 p-6 text-md">
              <div onClick={() => navigate("/great-homoeopathic-assembly")}>
                Learn More
              </div>
            </Button>
          </div>

          <div
            onClick={() => navigate("/who-assembly")}
            className="bg-card rounded-lg p-6 shadow-md"
          >
            <h2 className="text-3xl font-semibold text-primary dark:text-primary-foreground">
              World Health Organization Assembly
            </h2>
            <p className="mt-4 text-base leading-relaxed">
              Step into the shoes of world health leaders to address global
              healthcare issues and propose real-world solutions. Tackle complex
              health challenges, advocate for sustainable policies, and
              collaborate with peers to create an impactful healthcare vision
              for the future.
            </p>
            <Button className="mt-4 p-6 text-md">
              <div onClick={() => navigate("/who-assembly")}>Learn More</div>
            </Button>
          </div>
        </div>
      </div>

      {/* Why Join DIIMUN */}
      <div className="max-w-screen-xl mx-auto mt-20 text-center">
        <h2 className="text-4xl font-extrabold text-primary dark:text-primary-foreground">
          Why Join DIIMUN?
        </h2>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl">
          DIIMUN isn’t just an event; it’s a launchpad for healthcare
          professionals to build skills, network, and gain a unique global
          perspective on medicine.
        </p>

        <div className="mt-10 grid gap-12 md:grid-cols-3">
          {[
            {
              title: "Career Boost",
              description:
                "Develop leadership, cultural competency, and diplomatic skills. Stand out with a unique experience that blends medical knowledge with global policy insights.",
            },
            {
              title: "Networking",
              description:
                "Build relationships with international health experts, future leaders, and like-minded peers. Expand your network in global health and homeopathy.",
            },
            {
              title: "Skill Development",
              description:
                "Gain critical soft skills like communication, negotiation, and problem-solving. These will be valuable in any healthcare setting.",
            },
          ].map((benefit, index) => (
            <div
              key={index}
              className="p-6 bg-card dark:bg-sidebar-primary rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
            >
              <h3 className="text-2xl font-semibold text-primary dark:text-primary-foreground">
                {benefit.title}
              </h3>
              <p className="mt-4 text-base">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Register Button */}
        <div className="mt-10">
          <Button className="p-6 text-xl">
            <a onClick={() => navigate("/register")}>Join Now</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DiimunHome;
