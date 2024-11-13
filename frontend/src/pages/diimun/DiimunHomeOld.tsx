import { Button } from "@/components/ui/button";

export const DiimunHomeOld = () => (
  <section className="relative text-foreground py-24 px-4 sm:px-6 lg:px-8">
    <div className="max-w-screen-xl mx-auto text-center">
      {/* Main Heading */}
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl text-primary dark:text-primary-foreground">
        DIIMUN 2025: Shape Global Health Diplomacy
      </h1>

      <p className="mt-6 max-w-3xl mx-auto text-xl md:text-2xl text-primary">
        A transformative experience for future leaders in global health and
        homeopathy. Engage in debates, policy-making, and practical workshops
        tailored to empower healthcare professionals.
      </p>

      {/* Register Button */}
      <div className="mt-10">
        <Button className="p-6 text-xl">
          <a href="/register">Register Now for DIIMUN 2024</a>
        </Button>
      </div>
    </div>

    {/* Flagship Committees */}
    <div className="max-w-screen-xl mx-auto mt-16 grid gap-16 md:grid-cols-2 text-center">
      {/* WHO Assembly */}
      <div className="bg-card dark:bg-sidebar-primary p-8 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
        <h2 className="text-3xl font-semibold text-primary dark:text-primary-foreground">
          World Health Organization Assembly
        </h2>
        <p className="mt-4 text-lg">
          <strong>
            Motto: Addressing integrated solutions for emerging diseases and trends impacting global health.
          </strong>
        </p>
        <p className="mt-4 text-base">
          <strong>Overview:</strong> This assembly immerses participants in the
          complexities of global health challenges, providing insights into
          policy formulation and diplomacy. Students should prepare to address
          new diseases, declining health trends, and propose solutions grounded
          in international health policy.
        </p>
        <p className="mt-4 text-base">
          <strong>What to Expect:</strong> Debate with experts, engage in
          real-world health crisis simulations, and develop practical skills for
          tackling global health issues.
        </p>
        <p className="mt-4 text-base">
          <strong>Student Preparation:</strong> Research current health issues,
          be ready to propose and defend ideas, and collaborate to create viable
          health solutions.
        </p>
        {/* Register Button */}
        <div className="mt-10">
          <Button className="p-6 text-xl">
            <a href="/register">Register Now</a>
          </Button>
        </div>
      </div>

      {/* Great Homeopathic Assembly */}
      <div className="bg-card dark:bg-sidebar-primary p-8 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
        <h2 className="text-3xl font-semibold text-primary dark:text-primary-foreground">
          The Great Homoeopathic Assembly
        </h2>
        <p className="mt-4 text-lg">
          <strong>
            Motto: Harmonizing diverse homeopathic philosophies into cohesive,
            practical guidelines.
          </strong>
        </p>
        <p className="mt-4 text-base">
          <strong>Overview:</strong> This assembly seeks to deepen participants’
          understanding of homeopathy through debates and discussions. The goal
          is to address contradictions, find clarity, and create an integrated
          approach across schools of thought.
        </p>
        <p className="mt-4 text-base">
          <strong>What to Expect:</strong> Thought-provoking sessions that
          challenge students to analyze homeopathic philosophy, understand
          diverse perspectives, and contribute to evolving practices.
        </p>
        <p className="mt-4 text-base">
          <strong>Student Preparation:</strong> Dive into homeopathic
          philosophy, bring forward your ideas, and prepare to collaborate in
          building a unified perspective for future practice.
        </p>
        {/* Register Button */}
        <div className="mt-10">
          <Button className="p-6 text-xl">
            <a href="/register">Register Now</a>
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
          <a href="/register">Join Now</a>
        </Button>
      </div>
    </div>
  </section>
);

export default DiimunHomeOld;
