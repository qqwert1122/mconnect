import React, { useEffect, useState } from "react";
import {} from "fbase";
import {} from "firebase/firestore";
import { colorsState } from "atom";
import { useRecoilValue } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAd,
  faCircleInfo,
  faCircleNodes,
} from "@fortawesome/free-solid-svg-icons";

const IdeaConnectedIdeas = ({ idea, getIdeasFromIDs, viewDetail }) => {
  const colors = useRecoilValue(colorsState);
  const [cnctedIdeas, setCnctedIdeas] = useState([]);
  useEffect(() => {
    if (idea.connectedIDs.length > 0) {
      getIdeasFromIDs(idea.connectedIDs).then((idea) => setCnctedIdeas(idea));
    }
  }, []);

  return (
    <div
      className={`z-0 relative pt-2 w-full shadow-inner duration-500 ${
        viewDetail === false && "hidden"
      }`}
    >
      <div className="mt-4 ml-12 font-black text-sm text-stone-600">
        연결된 아이디어
      </div>
      <div className="mt-1 ml-12 text-xs text-stone-400">
        이 아이디어는 여러 아이디어들을 연결해 작성되었습니다
      </div>
      <div className="z-0 absolute top-0 left-6 h-full border-r"></div>
      {cnctedIdeas && (
        <>
          {cnctedIdeas.map((idea, index) => (
            <div className="relative pl-2 text-xs" key={index}>
              <div
                className={`w-2 h-2 ${colors[index]} rounded-full absolute top-5 left-5`}
                // style={{ borderWidth: "6px" }}
              ></div>
              <div className="z-10 relative ml-8 mr-2 my-2 p-2 break-all ">
                {idea.docId === -1 ? (
                  <div className="flex py-2 gap-1 items-center text-stone-300">
                    <FontAwesomeIcon icon={faCircleInfo} /> 삭제되었습니다
                  </div>
                ) : (
                  <>
                    <div className="mb-2 text-stone-600">
                      <span className="mb-2 font-black truncate">
                        {idea.title}
                      </span>
                      <span className="line-clamp-5">{idea.text}</span>
                    </div>
                    <div
                      className="w-full flex-col text-stone-400"
                      style={{ fontSize: "10px" }}
                    >
                      <div>{idea.userName}</div>
                      <div>{idea.createdAt}</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </>
      )}
      <div className="relative z-10 py-6 bg-stone-600 text-stone-400 text-sm text-center font-black ">
        광고 <FontAwesomeIcon icon={faAd} />
      </div>
    </div>
  );
};

export default IdeaConnectedIdeas;
