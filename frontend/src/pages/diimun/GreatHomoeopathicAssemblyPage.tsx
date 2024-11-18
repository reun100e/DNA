import { CTA } from "@/components/CTA";

export const GreatHomoeopathicAssemblyPage = () => {
  return (
    <section className="relative text-foreground py-20 px-6 sm:px-10 lg:px-20">
      <div className="max-w-screen-lg mx-auto">
        {/* Main Heading */}
        <h1 className="text-4xl font-bold tracking-tight text-center sm:text-5xl text-primary dark:text-primary-foreground">
          The Great Homoeopathic Assembly
        </h1>

        <p className="mt-8 max-w-3xl mx-auto text-lg leading-relaxed text-center text-primary">
          Dive into the legacy of homeopathic legends. Assume the role of a
          revered homeopathic stalwart and bring the art and science of
          homoeopathy to life. This is your chance to stand out, showcase your
          understanding, and bring your perspective to the homeopathic world.
        </p>

        {/* Call to Action */}
        <CTA />

        {/* About Section */}
        <div className="mt-16 space-y-10">
          <div>
            <h2 className="text-3xl font-semibold text-primary dark:text-primary-foreground">
              Experience Homeopathy Like Never Before
            </h2>
            <p className="mt-4 text-base leading-relaxed">
              Imagine stepping into the shoes of a homeopathic pioneer—seeing
              the world through their eyes, reasoning as they did, and
              interpreting symptoms with their depth. At The Great Homoeopathic
              Assembly, we challenge you to embody your chosen stalwart,
              debating their philosophy and showcasing the richness of
              homoeopathy.
            </p>
          </div>

          {/* What to Expect */}
          <div className="mt-8">
            <h2 className="text-3xl font-semibold text-primary dark:text-primary-foreground">
              What to Expect
            </h2>
            <ul className="list-disc pl-5 text-base leading-relaxed">
              <li className="mt-2">
                Engage in philosophical debates that deepen your understanding
                of homeopathy.
              </li>
              <li className="mt-2">
                Compete to emerge as the next voice of homeopathy, advocating
                for your chosen philosophy.
              </li>
              <li className="mt-2">
                Network with other passionate students and professionals
                committed to advancing homeopathic medicine.
              </li>
            </ul>
          </div>

          {/* Student Preparation */}
          <div className="mt-8">
            <h2 className="text-3xl font-semibold text-primary dark:text-primary-foreground">
              Student Preparation
            </h2>
            <p className="mt-4 text-base">
              Research the life, philosophy, and contributions of your chosen
              homeopathic stalwart. Prepare to embody their approach, defending
              their ideas and engaging in discussions on key homeopathic
              principles. Collaborate with peers to explore diverse perspectives
              and develop innovative approaches to modern homeopathic
              challenges.
            </p>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-semibold text-primary dark:text-primary-foreground">
              Are You Ready to Become a Homoeopathic Legend?
            </h2>
            <CTA />
          </div>
        </div>
      </div>
    </section>
  );
};
export default GreatHomoeopathicAssemblyPage;
