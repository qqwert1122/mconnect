const Page3 = ({ page }) => {
  return (
    <div className="w-screen h-full flex-none">
      <div className="h-full flex justify-center items-center">
        <div
          className={`${
            page === 2 ? "right-0 opacity-100 " : "-right-10 opacity-0"
          } mb-16 text-center relative duration-1000 text-stone-400`}
        >
          <img className="m-auto" width={200} src="./img/tutorial_2.png" />
          <div className="mt-10 mb-2 text-xl text-orange-400 font-black">
            지식을 더 깊숙이!
          </div>
          <span>
            어떤 주제에 대해 조금 더 자세히
            <br />
            알고싶은 것이 있지 않나요?
          </span>
        </div>
      </div>
    </div>
  );
};

export default Page3;
