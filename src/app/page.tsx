import Image from "next/image";
import Cards from "@/components/Cards";

export default function Home() {
  return (
    <div className="">
      <div className=" md:flex items-center justify-between p-7">
        <div>
          <h1 className=" pl-9 font-bold text-[36px] max-w-[400px]">
            Level up you fantasy team with FPL Analytics
          </h1>
          <p className="pl-9 font-bold text-[26px] ">
            Every Goal, Assist, and Stat—All in One Place
          </p>
          <p className="pl-9 font-bold text-[19px] ">
            Your Ultimate FPL Analytics Hub
          </p>
        </div>

        <img
          className="w-[400px] sm:w-[500px]"
          src="https://fantasy.premierleague.com/static/media/player-comp-5-2x.d02a3f06.png"
          alt=""
        />
      </div>
      <div className=" p-6 md:flex md:flex-row flex flex-col gap-3 justify-between items-center bg-[#37003c]">
        <Cards title="Top scrorer" />
        <Cards title="Top Assisters" />
        <Cards title="Top Points" />
        <Cards title="Best captains" />
      </div>
    </div>
  );
}
