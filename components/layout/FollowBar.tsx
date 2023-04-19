export const FollowBar = () => {
  return (
    <div className="lg:block hidden px-6 py-4">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="text-xl font-semibold text-white">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">{/* USER LIST */}</div>
      </div>
    </div>
  );
};
