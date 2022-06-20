const StormingTagBar = () => {
  const commonTags = [
    "경영",
    "경제",
    "국제",
    "정치",
    "사회",
    "과학",
    "기술",
    "IT",
    "환경",
    "역사",
    "주식",
    "부동산",
    "사업",
  ];

  return (
    <div className="pt-20 p-4 mb-2 flex flex-nowrap overflow-x-scroll bg-white">
      {commonTags.map((tag, index) => (
        <button
          key={index}
          className="flex-grow-0 flex-shrink-0 border-box rounded-3xl border-2 mr-1 mb-1 px-3 py-1 text-xs shadow-sm duration-500 break-words bg-white"
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default StormingTagBar;
