import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "css/Animation.css";
import { useEffect, useState } from "react";

const { pagesState } = require("atom");
const { useRecoilValue, useRecoilState } = require("recoil");

const New = ({ ...props }) => {
  const { onBackClick } = props;

  const [pages, setPages] = useRecoilState(pagesState);

  return (
    <>
      <div className="fixed top-0 w-full h-14 px-5 p-3 z-20 flex justify-between bg-white shadow">
        <button onClick={onBackClick}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>
      <div className="pt-20 p-2">
        {pages.map((page, index) => (
          <div key={index} className="p-2">
            {page}
          </div>
        ))}
      </div>
      <br />
    </>
  );
};

export default New;
