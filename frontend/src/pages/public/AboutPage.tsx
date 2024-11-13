import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="relative text-foreground py-20 px-6 sm:px-10 lg:px-20">
        <div className="max-w-screen-lg mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl font-bold tracking-tight text-center sm:text-4xl text-primary dark:text-primary-foreground">
            About DNA
          </h1>

          <p className="mt-8 max-w-3xl mx-auto text-lg leading-relaxed text-center text-primary dark:text-foreground">
            Doctors Nexus Amity (DNA) is a community of healthcare professionals
            and students dedicated to advancing medical research, fostering
            collaboration, and improving global healthcare delivery. Founded on
            the principles of unity and innovation, DNA brings together medical
            expertise and diplomatic skills to address contemporary health
            challenges.
          </p>

          {/* Mission and Vision */}
          <div className="mt-16 space-y-10">
            <div>
              <h2 className="text-3xl font-semibold text-primary dark:text-primary-foreground">
                Our Mission
              </h2>
              <p className="mt-4 text-base leading-relaxed">
                DNA aims to create a unified global network of healthcare
                professionals committed to excellence in medical research,
                innovation in healthcare solutions, and enhanced healthcare
                delivery. Through various initiatives, DNA empowers
                professionals with the skills to address complex health issues
                and foster an integrative approach to healthcare.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-primary dark:text-primary-foreground">
                Our Vision
              </h2>
              <p className="mt-4 text-base leading-relaxed">
                Our vision is to shape the future of medicine by bridging the
                gap between healthcare expertise and global health diplomacy.
                DNA aspires to create an environment where medical practitioners
                can collaborate and lead, bringing a diplomatic and
                research-driven approach to healthcare.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="mt-16 space-y-10">
            <h2 className="text-3xl font-semibold text-primary dark:text-primary-foreground">
              Core Values
            </h2>
            <ul className="list-disc pl-5 text-base leading-relaxed">
              <li className="mt-2">
                <strong>Collaboration:</strong> Promoting teamwork and
                partnerships across healthcare sectors to create impactful
                solutions.
              </li>
              <li className="mt-2">
                <strong>Innovation:</strong> Encouraging forward-thinking and
                adaptability in healthcare practices to address global
                challenges.
              </li>
              <li className="mt-2">
                <strong>Integrity:</strong> Upholding ethical standards in
                medical practice, research, and policy-making.
              </li>
              <li className="mt-2">
                <strong>Global Perspective:</strong> Integrating international
                views and culturally competent practices for comprehensive
                healthcare solutions.
              </li>
            </ul>
          </div>

          {/* Key Initiatives */}
          <div className="mt-16 space-y-10">
            <h2 className="text-3xl font-semibold text-primary dark:text-primary-foreground">
              Our Initiatives
            </h2>
            <p className="text-base leading-relaxed">
              DNA’s initiatives reflect its commitment to research, policy
              advocacy, and professional growth for healthcare practitioners. By
              participating in our programs, members gain opportunities to
              develop skills in leadership, diplomacy, and collaborative
              research.
            </p>

            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-2xl font-medium text-primary dark:text-secondary-foreground">
                  Doctors Integrated International Model United Nations (DIIMUN)
                </h3>
                <p className="mt-4 text-base leading-relaxed">
                  DIIMUN is DNA’s flagship platform, designed to equip
                  healthcare students and professionals with essential
                  diplomatic skills. Through DIIMUN, participants simulate
                  international health councils, gaining insights into
                  policy-making, public health challenges, and the nuances of
                  health diplomacy.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-medium text-primary dark:text-secondary-foreground">
                  The World Health Organization Assembly
                </h3>
                <p className="mt-4 text-base leading-relaxed">
                  A central component of DIIMUN, the WHO Assembly addresses
                  integrated solutions for global health concerns, from emerging
                  diseases to trends in healthcare. It fosters a collaborative
                  approach to tackling complex health issues and encourages
                  participants to propose actionable policies.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-medium text-primary dark:text-secondary-foreground">
                  The Great Homoeopathic Assembly
                </h3>
                <p className="mt-4 text-base leading-relaxed">
                  Dedicated to advancing the field of homeopathy, this assembly
                  encourages participants to explore various philosophies within
                  homeopathic practice. Through debates and discussions, the
                  assembly aims to harmonize diverse approaches, establishing
                  unified guidelines for practical, evidence-based homeopathy.
                </p>
              </div>
            </div>
          </div>

          {/* Invitation to Join DNA */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-semibold text-primary dark:text-primary-foreground">
              Join Us at DNA
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-base leading-relaxed">
              DNA invites healthcare professionals, students, and researchers
              from across the globe to be part of our growing community. By
              joining DNA, you’ll gain access to a wealth of knowledge,
              networking opportunities, and resources that can help you make a
              meaningful impact on global healthcare.
            </p>
            <div className="mt-8">
              <Button className="p-4 text-lg">
                <div onClick={() => navigate("/register")}>
                  Become a Member of DNA
                </div>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
