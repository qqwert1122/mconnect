const Page1 = ({ page }) => {
  return (
    <div className="w-screen h-full flex-none">
      <div className="h-full flex justify-center items-center">
        <div
          className={`${
            page === 0 ? "right-0 opacity-100 " : "-right-10 opacity-0"
          } text-center relative duration-1000 text-stone-400`}
        >
          <img className="m-auto" width={200} src="./img/info_1.png" />
          <div className="mt-10 mb-2 text-xl text-orange-400 font-black">
            아이디어를 기록하세요
          </div>
          <span>
            번뜩이는 아이디어가 떠오르거나
            <br />
            지식을 발견하면 기록하세요
          </span>
        </div>
      </div>
    </div>
  );
};

export default Page1;
