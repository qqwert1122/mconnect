import React, { useEffect, useState, useRef } from "react";
import { dbService } from "fbase";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  query,
  onSnapshot,
  collection,
} from "firebase/firestore";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";

const IdeaConnectedIdeas = ({ connectedIdeas, viewDetail, colorList }) => {
  return (
    <div
      className={`z-0 relative p-2 w-full bg-stone-100 shadow-inner duration-500 ${
        viewDetail === false && "hidden"
      }`}
    >
      <div className="z-0 absolute top-0 left-6 h-full border-r-4 border-stone-200"></div>
      {connectedIdeas.map((idea, index) => (
        <div className="relative" key={index}>
          <div
            className={`w-5 h-5 border-stone-100 ${colorList[index]} rounded-full absolute top-6 left-2`}
            style={{ borderWidth: "6px" }}
          ></div>
          <div className="z-10 relative box-border ml-10 my-4 p-2 bg-white shadow-lg break-all rounded-xl">
            <div className="mb-2">
              {idea.title === "" ? (
                idea.text.length < 180 ? (
                  idea.text
                ) : (
                  <>{idea.text.substr(0, 180)}...</>
                )
              ) : (
                <>
                  <div className="mb-2 font-black text-sm">{idea.title}</div>
                  {idea.text.length < 140 ? (
                    idea.text
                  ) : (
                    <>{idea.text.substr(0, 140)}...</>
                  )}
                </>
              )}
            </div>
            <div className="w-full text-xs flex justify-between text-stone-400">
              <div>{idea.createdAt}</div>
              <div>{idea.userName}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IdeaConnectedIdeas;
