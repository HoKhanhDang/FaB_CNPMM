import React from 'react';

const ChefSection: React.FC = () => {
  return (
    <section className="py-[50px] flex flex-col items-center self-stretch px-16 w-full bg-red-100 max-md:px-5 max-md:max-w-full">
      <div className="w-full max-w-[1052px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[67%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col items-start self-stretch my-auto text-2xl text-slate-700 max-md:mt-10 max-md:max-w-full">
              <p className="text-justify text-red-600">TASTY AND CRUNCHY</p>
              <h2 className="text-4xl font-bold text-justify">Our Chef</h2>
              <p className="mt-3.5 text-lg text-justify max-md:max-w-full">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidition ullamco laboris nisi ut aliquip ex ea commodo condor consectetur adipiscing elit, sed do eiusmod tempor incidition ullam.
              </p>
              <a href="#menu" className="self-end px-7 py-4 mt-12 text-orange-50 bg-red-600 rounded-3xl max-md:px-5 max-md:mt-10">
                VIEW OUR ALL MENU
              </a>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/18cc1c34ebe2c2efddca3d9eeb7d413b10ae6fa00beb6d37a73d70a447cb7baf?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109" className="object-contain grow w-full aspect-[1.11] max-md:mt-10" alt="Chef preparing food" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChefSection;