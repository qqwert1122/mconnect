import "css/Animation.css";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import ColoredIdeaList from "./ColoredIdeaList";
import InputSourceTab from "./InputSourceTab";
import InputTagTab from "./InputTagTab";
import WritingBottomBar from "./WritingBottomBar";
import RelatedIdeas from "./RelatedIdeas";

const WritingBottom = ({
  userIdeas,
  setWhatView,
  whatEdit,
  navigate,
  formSource,
  setFormSource,
  formTag,
  setFormTag,
  formTags,
  setFormTags,
  formCategory,
  selectedIdeas,
  setSelectedIdeas,
  tagList,
  formPublic,
  setFormPublic,
  sourceList,
  colorList,
  formConnectedIdeas,
  setFormConnectedIdeas,
}) => {
  const [bottomItemChangeProps, setBottomItemChangeProps] = useState(0);
  const sourceInput = useRef();
  const tagInput = useRef();

  useEffect(() => {
    switch (bottomItemChangeProps) {
      case 1:
        sourceInput.current.focus();
        break;
      case 2:
        tagInput.current.focus();
        break;
    }
  }, [bottomItemChangeProps]);

  return (
    <div className="w-screen fixed bottom-0 z-30">
      {bottomItemChangeProps === 0 && (
        <ColoredIdeaList ideas={formConnectedIdeas} colorList={colorList} />
      )}

      {bottomItemChangeProps === 1 && (
        <InputSourceTab
          sourceList={sourceList}
          formSource={formSource}
          setFormSource={setFormSource}
          sourceInput={sourceInput}
        />
      )}

      {bottomItemChangeProps === 2 && (
        <InputTagTab
          tagList={tagList}
          tagInput={tagInput}
          formTag={formTag}
          setFormTag={setFormTag}
          formTags={formTags}
          setFormTags={setFormTags}
        />
      )}

      {bottomItemChangeProps === 3 && (
        <RelatedIdeas
          whatEdit={whatEdit}
          userIdeas={userIdeas}
          navigate={navigate}
          formConnectedIdeas={formConnectedIdeas}
          setFormConnectedIdeas={setFormConnectedIdeas}
          formTags={formTags}
          colorList={colorList}
          selectedIdeas={selectedIdeas}
          setSelectedIdeas={setSelectedIdeas}
          setWhatView={setWhatView}
        />
      )}

      <WritingBottomBar
        bottomItemChangeProps={bottomItemChangeProps}
        setBottomItemChangeProps={setBottomItemChangeProps}
        formCategory={formCategory}
        formSource={formSource}
        formTags={formTags}
        formPublic={formPublic}
        setFormPublic={setFormPublic}
        formConnectedIdeas={formConnectedIdeas}
        selectedIdeas={selectedIdeas}
      />
    </div>
  );
};

export default WritingBottom;
