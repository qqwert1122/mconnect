const Page2 = ({ page }) => {
  return (
    <div className="w-screen h-full flex-none">
      <div className="h-full flex justify-center items-center">
        <div
          className={`${
            page === 1 ? "right-0 opacity-100 " : "-right-10 opacity-0"
          } text-center relative duration-1000 text-stone-400`}
        >
          <img className="m-auto" width={200} src="./img/info_2.png" />
          <div className="mt-10 mb-2 text-xl text-orange-400 font-black">
            다양한 아이디어를 탐색하세요
          </div>
          <span>
            경제, 정치, 사회 등 다양한 분야의
            <br />
            다른 사람들이 발견한 지식을 탐색하세요
          </span>
        </div>
      </div>
    </div>
  );
};

export default Page2;
