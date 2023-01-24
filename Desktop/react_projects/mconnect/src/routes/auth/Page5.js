const Page5 = ({ page }) => {
  return (
    <div className="w-screen h-full flex-none">
      <div className="h-full flex justify-center items-center">
        <div
          className={`${
            page === 4 ? "right-0 opacity-100 " : "-right-10 opacity-0"
          } mb-16 text-center relative duration-1000 text-stone-400`}
        >
          <img className="m-auto" width={200} src="./img/tutorial_3.png" />
          <div className="mt-10 mb-2 text-xl text-orange-400 font-black">
            쌓아놓은 아이디어를 정리!
          </div>
          <span>
            쌓아만 놓은 지식을 정리하고 연결해
            <br />
            새로운 아이디어로 재탄생 시키고 싶지 않나요?
          </span>
        </div>
      </div>
    </div>
  );
};

export default Page5;
