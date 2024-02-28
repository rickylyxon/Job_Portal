export function Home() {
  return (
    <div className="min-h-80 h-screen w-full p-8 bg-slate-100 flex justify-center items-center">
      <div className="flex gap-2 items-center ">
        <img
          src="https://images.pexels.com/photos/7374/startup-photos.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Job"
          className="w-2/4 rounded-lg drop-shadow-lg"
        />
        <p className="bg-slate-100 rounded-md p-10 w-5/12 h-full text-xl/loose text-left font-bold ">
          Welcome to Job Portal, your premier destination for seamless job
          search and career advancement opportunities. Our meticulously designed
          landing page welcomes you with a seamless blend of user-centric
          features and intuitive navigation, ensuring an effortless exploration
          of job listings tailored to your preferences.
        </p>
      </div>
    </div>
  );
}
