import Avatar from "@mui/material/Avatar";

const CriteriaUser = ({
  userList,
  searchTerm,
  listSearchCriteriaUser,
  onUserCriteriaClick,
}) => {
  return (
    <div className="px-4 pb-4 flex flex-nowrap overflow-x-scroll bg-white">
      {userList
        .filter((user) => user.userName.includes(searchTerm))
        .map((user, index) => (
          <button
            key={index}
            className={`mr-1 mb-1 flex-grow-0 flex-shrink-0 border-box rounded-3xl border-2 break-words  shadow-sm duration-500 ${
              listSearchCriteriaUser.includes(user.userName) && "bg-stone-300"
            }`}
            onClick={() => onUserCriteriaClick(user.userName)}
          >
            <div className="flex items-center gap-1">
              <div className="flex">
                <Avatar
                  alt="avatar"
                  src={user.userPhotoURL}
                  sx={{
                    display: "flex",
                    width: "30px",
                    height: "30px",
                  }}
                />
              </div>
              <h2 className="mr-2 font-light text-xs">
                <b>{user.userName}</b>
              </h2>
            </div>
          </button>
        ))}
    </div>
  );
};

export default CriteriaUser;
