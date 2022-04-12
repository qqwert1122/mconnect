import React, { useState } from "react";
import { EventRepeat } from "@mui/icons-material";
import { dbService } from "fbase";
import { collection, addDoc } from "firebase/firestore";

const Ideas = () => {
  const [idea, setIdea] = useState("");
  const [ideas, setIdeas] = useState(["3", "2", "1"]);

  const onIdeaSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(dbService, "ideas"), {
        idea,
        createdAt: Date.now(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setIdeas([idea, ...ideas]);
    setIdea("");
  };

  const onIdeaChange = (event) => {
    const {
      target: { value },
    } = event;
    setIdea(value);
  };

  return (
    <>
      <form onSubmit={onIdeaSubmit}>
        <input
          type="text"
          placeholder="한줄 아이디어를 입력하세요"
          required
          value={idea}
          onChange={onIdeaChange}
        />
        <input class="bg-red-200" type="submit" value="입력" />
      </form>
      <div>
        {ideas.map((mIdea, mIndex) => (
          <div class="mb-5" key={mIndex}>
            {mIdea}
          </div>
        ))}
      </div>
    </>
  );
};

export default Ideas;
