import React from 'react';
import { useSelector } from 'react-redux';

type TopBarProps = {
  openingHours: string;
  phoneNumber: string;
};

const TopBar: React.FC<TopBarProps> = ({ openingHours, phoneNumber }) => {
  const { isLogin, fullName } = useSelector(
    (state: any) => state.customerSlice
);
  return (
    <header className="fixed z-50 top-0 h-[30px] flex flex-row justify-center items-center self-stretch px-16 py-2 w-full text-xs text-orange-50 bg-red-600 max-md:px-5 max-md:max-w-full">
      <div className="flex flex-row gap-5 justify-between items-center w-full max-w-[1213px] max-md:max-w-full max-sm:text-[9px] sm:text-[12px]">
        <div className="flex gap-5">
          <div className="flex gap-2">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f27aeb73562d377596ac0648a7c774a9fe13d068e204a1e1bd12de498dc0ac9?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109" className="object-contain shrink-0 w-5 aspect-square" alt="" />
            <div className="my-auto w-fit">{openingHours}</div>
          </div>
          <div className="flex gap-2">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/b80303eb52b2f47cdaf6b751833edcb6f6603e18a4f5fd76a37f0c4512dda8ad?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109" className="object-contain shrink-0 w-5 aspect-square" alt="" />
            <div className="my-auto">{phoneNumber}</div>
          </div>
        </div>
        {
          isLogin && (
              <span className='max-sm:text-[12px] sm:text-[15px]'>Welcome {fullName}!</span>
          )
        }
        {
          !isLogin && (
              <span className='max-sm:text-[12px] sm:text-[15px]'>Welcome Guest!</span>
          )
        }
        
      </div>
    </header>
  );
};

export default TopBar;