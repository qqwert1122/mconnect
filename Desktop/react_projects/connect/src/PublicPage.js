import UserPage from "./UserPage";

const PublicPage = ({ customHooks }) => {
  return (
    <div class="w-screen h-screen flex justify-center items-center text-5xl font-bold">
      <UserPage customHooks={customHooks} />
    </div>
  );
};

export default PublicPage;
