import React from "react";

interface BranchCardProps {
  name: string;
  address: string;
  hours: string;
  phone: string;
}

const BranchCard: React.FC<BranchCardProps> = ({
  name,
  address,
  hours,
  phone,
}) => {
  return (
    <article className="flex flex-col w-full max-w-sm p-6 bg-red-700 text-white rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-semibold">{name}</h2>
      <p className="mt-3 text-lg text-center">{address}</p>
      <div className="flex justify-around mt-4 text-sm">
        <div className="flex items-center gap-2">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f27aeb73562d377596ac0648a7c774a9fe13d068e204a1e1bd12de498dc0ac9?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109"
            className="w-4 h-4"
            alt="Clock icon"
          />
          <span>{hours}</span>
        </div>
        <div className="flex items-center gap-2">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b80303eb52b2f47cdaf6b751833edcb6f6603e18a4f5fd76a37f0c4512dda8ad?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109"
            className="w-4 h-4"
            alt="Phone icon"
          />
          <span>{phone}</span>
        </div>
      </div>
      <button className="self-center mt-5 text-sm font-semibold text-green-400 hover:underline">
        Click to View Google Map
      </button>
    </article>
  );
};

export default BranchCard;
