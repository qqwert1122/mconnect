import {
  faBookmark as farBookmark,
  faHeart,
  faCompass,
} from "@fortawesome/free-regular-svg-icons";
import { faBookmark as fasBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@mui/material";
import { userState } from "atom";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const Page4 = ({ page }) => {
  const loggedInUser = useRecoilValue(userState);
  const sampleAvatar = "https://avatars.dicebear.com/api/miniavs/CONNECTS.svg";
  const sampleName = "CONNECTS";
  const sampleText =
    "배터리는 라이트의 법칙에 따라 누적 생산량이 두 배가 될 때마다 약 18%씩 가격이 떨어진다";
  const text =
    "전기차 가격이 가솔린차 가격만큼 떨어지려면 kWh 당 배터리 가격이 83달러까지 떨어져야 한다";
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmark = () => {
    setBookmarked((prev) => !prev);
  };

  useEffect(() => {
    if (page === 3) {
      setBookmarked(false);
    }
  }, [page]);

  return (
    <div className="w-screen h-full flex-none">
      <div className="h-full flex justify-center items-center">
        <div
          className={`${
            page === 3 ? "right-0 opacity-100 " : "-right-10 opacity-0"
          } text-center duration-1000 text-stone-400`}
        >
          <div className="mb-5">
            <div className="mb-2 text-xl text-sky-400 font-black">
              다른 유저의 아이디어를 저장하세요
            </div>
            <div className="mb-10">
              다른 사람이 남긴 경제, 정치, 기술 등 분야의
              <br />
              다양한 지식과 아이디어를 탐색하고 저장하세요
            </div>
            <div className="mx-4 p-2 shadow-2xl rounded">
              <div className="mb-2 flex items-center gap-2 text-xs">
                <Avatar
                  className="border-2 mr-1"
                  alt="avatar"
                  src={sampleAvatar}
                  sx={{
                    display: "flex",
                    width: "25px",
                    height: "25px",
                  }}
                />
                <span>{sampleName}</span>
              </div>
              <div className="mb-2 flex items-center justify-between text-left text-sm">
                <span>{sampleText}</span>
                <button className="relative px-2" onClick={handleBookmark}>
                  {bookmarked ? (
                    <span className="text-orange-400">
                      <FontAwesomeIcon icon={fasBookmark} size="xl" />
                    </span>
                  ) : (
                    <FontAwesomeIcon icon={farBookmark} size="xl" />
                  )}
                  <div
                    className={`absolute bottom-1 w-4 h-4 rounded-md  ${
                      !bookmarked && "animate-ping bg-rose-400"
                    }`}
                  ></div>
                </button>
              </div>
            </div>
          </div>
          <div
            className={`mx-auto w-72 p-3 border border-stone-100 text-left ${
              bookmarked ? "shadow-sm" : "shadow-lg"
            } duration-500`}
          >
            <div className="pb-4 flex items-center gap-2 text-xs">
              <Avatar
                className="border-2 mr-1"
                alt="avatar"
                src={loggedInUser.userPhotoURL}
                sx={{
                  display: "flex",
                  width: "25px",
                  height: "25px",
                }}
              />
              <span style={{ fontSize: "8px" }}>{loggedInUser.userName}</span>
            </div>
            <div className="pb-2 text-xs">{text}</div>
          </div>

          <div
            className={`${
              bookmarked ? "opacity-100 bottom-0" : "-bottom-10 opacity-0"
            } duration-500 relative z-10 mx-auto w-72 p-3  text-left shadow-lg`}
          >
            <div className="pb-4 flex items-center gap-2">
              <Avatar
                className="border-2 mr-1"
                alt="avatar"
                src={sampleAvatar}
                sx={{
                  display: "flex",
                  width: "25px",
                  height: "25px",
                }}
              />
              <span style={{ fontSize: "8px" }}>{sampleName}</span>
            </div>
            <div className="pb-2 text-xs">{sampleText}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page4;
