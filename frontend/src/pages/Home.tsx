import HomeBanner from '../components/HomeBanner';

const Home: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4 bg-custom-light-bg dark:bg-custom-dark-bg">
      <div className="w-full">
        <HomeBanner />
        {/* 추후 추가 */}
      </div>
    </div>
  );
};

export default Home;
