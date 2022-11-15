import React, { useEffect, useState } from "react";
import {} from "fbase";
import {} from "firebase/firestore";
import { colorsState } from "atom";
import { useRecoilValue } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

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
      className={`z-0 relative p-2 w-full bg-stone-100 shadow-inner duration-500 ${
        viewDetail === false && "hidden"
      }`}
    >
      <div className="mt-4 ml-12 font-black text-sm text-stone-400">
        연결된 아이디어
      </div>
      <div className="z-0 absolute top-0 left-6 h-full border-r-4 border-stone-200"></div>
      {cnctedIdeas && (
        <>
          {cnctedIdeas.map((idea, index) => (
            <div className="relative" key={index}>
              <div
                className={`w-5 h-5 border-stone-100 ${colors[index]} rounded-full absolute top-6 left-2`}
                style={{ borderWidth: "6px" }}
              ></div>
              <div className="z-10 relative box-border ml-10 my-4 p-2 bg-white shadow-lg break-all rounded-xl">
                {idea.id === -1 ? (
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
                    <div className="mb-2">
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
