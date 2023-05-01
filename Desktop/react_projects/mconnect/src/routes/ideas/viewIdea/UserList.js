const UserList = ({ open, handleEllipsisClose, tabs, handleTabs, count }) => {
  return (
    <div className="fixed bottom-0 w-screen">
      <div
        className={`${
          open ? "-translate-y-14" : "translate-y-full"
        } absolute bottom-0 w-full z-10 duration-200 bg-white rounded-t-2xl border`}
      >
        <div className="flex justify-between p-4 z-10 text-base font-black">
          목록
          <button onClick={handleEllipsisClose}>닫기</button>
        </div>
        <hr />
        <div className="p-4" style={{ minHeight: "360px" }}>
          <div className="mb-4 flex justify-between text-base font-black ">
            <div className="flex gap-4">
              <button
                className={`${tabs == 0 && "text-sky-400"} duration-500`}
                onClick={() => {
                  handleTabs(0);
                }}
              >
                조회
              </button>
              <button
                className={`${tabs == 1 && "text-sky-400"} duration-500`}
                onClick={() => {
                  handleTabs(1);
                }}
              >
                좋아요
              </button>
              <button
                className={`${tabs == 2 && "text-sky-400"} duration-500`}
                onClick={() => {
                  handleTabs(2);
                }}
              >
                저장
              </button>
            </div>
            <div className="bg-stone-400 text-white text-xs rounded-2xl p-1 px-4">
              {tabs === 0 && `${count.view_count}명`}
              {tabs === 1 && `${count.like_count}명`}
              {tabs === 2 && `${count.bookmark_count}명`}
            </div>
          </div>
          {tabs === 0 && (
            <>
              {Object.values(count.view_users).map((user, index) => (
                <>
                  <div key={index} className="text-sm p-4 py-2 font-black">
                    {user}
                  </div>
                  {index !== count.view_count - 1 && <hr />}
                </>
              ))}
            </>
          )}
          {tabs === 1 && (
            <>
              {Object.values(count.like_users).map((user, index) => (
                <>
                  <div key={index} className="text-sm p-4 py-2 font-black">
                    {user}
                  </div>
                  {index !== count.view_count - 1 && <hr />}
                </>
              ))}
            </>
          )}
          {tabs === 2 && (
            <>
              {Object.values(count.bookmark_users).map((user, index) => (
                <>
                  <div key={index} className="text-sm p-4 py-2 font-black">
                    {user}
                  </div>
                  {index !== count.view_count - 1 && <hr />}
                </>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
