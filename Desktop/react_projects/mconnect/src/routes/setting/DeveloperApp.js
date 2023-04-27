import "css/Animation.css";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DeveloperApp = ({ ...props }) => {
  const { onBackClick } = props;

  const createApp = (appName, dscrp, themeColor, complete) => {
    return {
      appName,
      dscrp,
      themeColor,
      complete,
    };
  };

  const developerApp = [
    createApp(
      "Connects",
      "아이디어 커뮤니티, 사람들과 함께 성장하세요",
      "bg-orange-400",
      true
    ),
    createApp(
      "100-timer",
      "Hustle하는 사람들을 위한 주100시간 타이머",
      "bg-stone-600",
      false
    ),
    createApp(
      "ID KEEP",
      "아이디어 이력 관리 어플리케이션",
      "bg-rose-400",
      false
    ),
  ];

  return (
    <div className="moveRightToLeft">
      <div className="fixed top-0 z-10 w-full h-14 px-5 p-3 flex justify-between items-center shadow bg-white">
        <button onClick={onBackClick}>
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </button>
      </div>
      <div className="w-screen h-screen">
        <div className="pt-20 mx-5 h-full">
          {developerApp.map((app, index) => (
            <div key={index}>
              <button className="flex gap-5 items-center py-4 w-full">
                <div
                  className={`w-10 h-10 p-2 rounded-full text-white text-2xl font-black ${app.themeColor}`}
                  style={{ minWidth: "40px" }}
                >
                  {app.appName[0]}
                </div>
                <div className="text-start">
                  <p className="text-lg font-black">{app.appName}</p>
                  <p className="line-clamp-2 text-sm text-stone-400">
                    {app.dscrp}
                  </p>
                </div>
              </button>
              {!app.complete && (
                <div className="pb-4 text-sm text-center text-stone-400">
                  구상 중 💭
                </div>
              )}
              {index !== developerApp.length - 1 && <hr />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeveloperApp;
