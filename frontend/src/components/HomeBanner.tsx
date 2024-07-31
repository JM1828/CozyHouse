import icons from '../assets/icons';

const HomeBanner: React.FC = () => {
  return (
    <div className="flex w-full h-[500px] gap-5 bg-custom-light-bg dark:bg-custom-dark-bg rounded-lg shadow-md">
      <div className="flex-[6] h-full">
        <img src={icons.MockBanner} alt="Banner" className="w-full h-full object-cover rounded-lg" />
      </div>
      <div className="flex-[2] h-full">
        <img src={icons.MockBanner} alt="Banner" className="w-full h-full object-cover rounded-lg" />
      </div>
    </div>
  );
};

export default HomeBanner;
