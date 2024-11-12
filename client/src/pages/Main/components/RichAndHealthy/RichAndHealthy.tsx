import React from 'react';
import FeatureList from '../FeatureList/FeatureList';

const RichAndHealthy: React.FC = () => {
  return (
    <section className="mt-12 w-full max-md:mt-10 max-md:max-w-full md:px-[100px]">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-[30%] max-md:ml-0 max-md:w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f59e843237bb3def370cb3e01cd2b143dd8c8c56dd8291411ee39e1e305fce2?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109"
            alt="Rich and healthy food"
            className="object-contain grow mt-10 w-full rounded-3xl aspect-[0.6] max-md:mt-10"
          />
        </div>
        <div className="flex flex-col ml-5 w-[70%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col w-full max-md:mt-7 max-md:max-w-full">
            <h3 className="self-start ml-36 text-xl font-bold text-slate-700 max-md:ml-2.5">
              RICH & HEALTHY
            </h3>
            <h2 className="mt-4 text-4xl font-bold text-red-600 w-[502px] max-md:max-w-full">
              Highest quality artisan grains, proteins & seasonal ingredients
            </h2>
            <p className="mt-8 mr-20 text-2xl text-slate-700 max-md:mr-2.5 max-md:max-w-full">
              Righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desires, that they cannot foresee.
            </p>
            <FeatureList />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RichAndHealthy;