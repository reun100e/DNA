import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CTA } from "@/components/CTA";

export const WHOAssemblyPage = () => {
  const navigate = useNavigate();
  return (
    <section className="relative text-foreground py-20 px-6 sm:px-10 lg:px-20">
      <div className="max-w-screen-lg mx-auto">
        {/* Main Heading */}
        <h1 className="text-4xl font-bold tracking-tight text-center sm:text-5xl text-primary dark:text-primary-foreground">
          World Health Organization Assembly
        </h1>

        <p className="mt-8 max-w-3xl mx-auto text-lg leading-relaxed text-center text-primary">
          Become a champion for global health solutions. In the WHO Assembly,
          you’ll take on the role of a healthcare leader, tackling the most
          pressing health issues of our time and working towards a healthier
          future for all.
        </p>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <h2 className="text-lg font-semibold text-primary dark:text-primary-foreground">
            Shape the Future of Global Health
          </h2>
          <CTA />
        </div>

        {/* Overview Section */}
        <div className="mt-16 space-y-10">
          <div>
            <h2 className="text-3xl font-semibold text-primary dark:text-primary-foreground">
              Why Join the WHO Assembly?
            </h2>
            <p className="mt-4 text-base leading-relaxed">
              At the WHO Assembly, you'll address critical topics affecting
              global health. From emerging diseases to sustainable healthcare
              systems, this assembly calls for innovative, actionable solutions.
              This is your chance to gain practical experience in policy-making
              and global health diplomacy.
            </p>
          </div>

          {/* What to Expect */}
          <div className="mt-8">
            <h2 className="text-3xl font-semibold text-primary dark:text-primary-foreground">
              What to Expect
            </h2>
            <ul className="list-disc pl-5 text-base leading-relaxed">
              <li className="mt-2">
                Address real-world global health issues through collaborative
                debate and policy proposals.
              </li>
              <li className="mt-2">
                Engage with peers in formulating effective, research-based
                health policies.
              </li>
              <li className="mt-2">
                Develop skills in healthcare leadership, networking, and
                cultural competence.
              </li>
            </ul>
          </div>

          {/* Student Preparation */}
          <div className="mt-8">
            <h2 className="text-3xl font-semibold text-primary dark:text-primary-foreground">
              Student Preparation
            </h2>
            <p className="mt-4 text-base">
              Research current health issues, be ready to propose and defend
              ideas, and collaborate to create viable health solutions.
            </p>
          </div>

          {/* Call to Action */}
          <CTA />
        </div>
      </div>
    </section>
  );
};
export default WHOAssemblyPage;
