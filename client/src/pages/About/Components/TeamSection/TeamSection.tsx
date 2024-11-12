/**
 * This code was generated by Builder.io.
 */
import React from "react";
import TeamMember from "./TeamMember";

interface TeamMemberData {
  name: string;
  description: string;
  imageSrc: string;
  socialIconSrc: string;
}

const teamMembers: TeamMemberData[] = [
  {
    name: "Brain Adams",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. Lorem ipsum dolor sit amet",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/dd210e5bb5b6576d246df755e2f6f1d822c54ca51f6e919908c3549896f0d104?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109",
    socialIconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/48bfeb92fdffef6424d1233fdf0d42fafe9b1fb63f245b13fa8ef99ee8563ad3?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109",
  },
  {
    name: "Jhon Khan",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. Lorem ipsum dolor sit amet",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/1ef79a9bb20974b130ab87f1d6091806c7b9173043a2981c2292083ce4a4bc86?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109",
    socialIconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/879277a203b2fc95b83136d9a2b3c3042e7653f07a74aff1c4e8ca9291ca5438?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109",
  },
  {
    name: "Jessica biel",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. Lorem ipsum dolor sit amet",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/d28445b929cf18877fb270d36ce4875dfaed1a9ea40706f243fe6a44f0dc34ba?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109",
    socialIconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/80f61f6ecf7c52449edd7645de92d81b867fc7df14bb5768386ad8709b2b589c?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109",
  },
];

const TeamSection: React.FC = () => {
  return (
    <section className="flex flex-col md:px-[100px] py-[50px]">
      <header className="self-center text-4xl font-bold text-center text-slate-700">
        <h2>OUR TEAM</h2>
        <p className="text-lg leading-5">
          The Hardworking Team behind the restaurant
        </p>
      </header>
      <div className="mt-11 w-full max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              description={member.description}
              imageSrc={member.imageSrc}
              socialIconSrc={member.socialIconSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
