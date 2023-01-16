const Page3 = ({ page }) => {
  return (
    <div className="w-screen h-full flex-none">
      <div className="h-full flex justify-center items-center">
        <div
          className={`${
            page === 2 ? "right-0 opacity-100 " : "-right-10 opacity-0"
          } text-center relative duration-1000 text-stone-400`}
        >
          <img className="m-auto" width={200} src="./img/info_3.png" />
          <div className="mt-10 mb-2 text-xl text-orange-400 font-black">
            아이디어끼리 연결하세요
          </div>
          <span>
            수집한 아이디어들을 서로 연결해
            <br />
            새롭고 멋진 아이디어를 발견하세요
          </span>
        </div>
      </div>
    </div>
  );
};

export default Page3;
