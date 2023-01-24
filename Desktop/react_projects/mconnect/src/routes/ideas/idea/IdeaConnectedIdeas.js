import React, { useEffect, useState } from "react";
import {} from "fbase";
import {} from "firebase/firestore";
import { colorsState } from "atom";
import { useRecoilValue } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faCircleNodes } from "@fortawesome/free-solid-svg-icons";

const IdeaConnectedIdeas = ({ idea, getIdeasFromIDs, viewDetail }) => {
  const colors = useRecoilValue(colorsState);
  const [cnctedIdeas, setCnctedIdeas] = useState([]);
  useEffect(() => {
    if (idea.connectedIDs.length > 0) {
      getIdeasFromIDs(idea.connectedIDs).then((idea) => setCnctedIdeas(idea));
    }
    console.log(cnctedIdeas);
  }, []);

  return (
    <div
      className={`z-0 relative py-2 pl-2 bg-stone-100 w-full shadow-inner duration-500 ${
        viewDetail === false && "hidden"
      }`}
    >
      <div className="mt-4 ml-12 font-black text-base text-stone-500">
        연결된 아이디어 <FontAwesomeIcon icon={faCircleNodes} />
      </div>
      <div className="mt-1 ml-12 text-xs text-stone-400">
        해당 아이디어는 아래의 아이디어들이 연결되었습니다
        <br />
        다만, 원래 글이 삭제된 경우 나타나지 않습니다
      </div>
      <div className="z-0 absolute top-0 left-6 h-full border-r-2 border-stone-200"></div>
      {cnctedIdeas && (
        <>
          {cnctedIdeas.map((idea, index) => (
            <div className="relative" key={index}>
              <div
                className={`w-5 h-5 border-stone-100 ${colors[index]} rounded-full absolute top-3 left-2`}
                style={{ borderWidth: "6px" }}
              ></div>
              <div className="z-10 relative box-border ml-10 my-4 p-2 py-4 bg-white shadow break-all rounded-l-lg">
                {idea.docId === -1 ? (
                  <div
                    className="flex gap-1 items-center text-stone-300"
                    style={{
                      minHeight: "44px",
                    }}
                  >
                    <FontAwesomeIcon icon={faCircleInfo} /> 삭제되었습니다
                  </div>
                ) : (
                  <>
                    <div className="mb-2 text-stone-600">
                      <span className="mb-2 font-black text-sm truncate">
                        {idea.title}
                      </span>
                      <span className="line-clamp-5">{idea.text}</span>
                    </div>
                    <div className="w-full text-xs flex justify-between text-stone-400">
                      <div>{idea.createdAt}</div>
                      <div>{idea.userName}</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default IdeaConnectedIdeas;
