const Page1 = ({ page }) => {
  return (
    <div className="w-screen h-full flex-none">
      <div className="h-full flex justify-center items-center">
        <div
          className={`${
            page === 0 ? "right-0 opacity-100 " : "-right-10 opacity-0"
          } mb-16 text-center relative duration-1000 text-stone-400`}
        >
          <img className="m-auto" width={200} src="./img/tutorial_1.png" />
          <div className="mt-10 mb-2 text-xl text-sky-400 font-black">
            번뜩이는 순간을 캐치!
          </div>
          <span>
            책을 읽을 때, 유튜브를 볼 때, 뉴스를 볼 때
            <br />
            기억해두고 싶은 지식이 있지 않나요?
          </span>
        </div>
      </div>
    </div>
  );
};

export default Page1;
