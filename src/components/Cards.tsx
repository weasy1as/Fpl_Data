import React from "react";

const dummyData = [
  { name: "salah", number: 12 },
  { name: "saka", number: 10 },
  { name: "haaland", number: 7 },
  { name: "son", number: 5 },
  { name: "palmer", number: 5 },
  { name: "luiz diaz", number: 2 },
];
const listItems = dummyData.map((i) => (
  <ol>
    <li key={i} className="flex justify-between">
      <div>
        <p>{i.name}</p>
        <p>Team</p>
      </div>

      <p>{i.number}</p>
    </li>
  </ol>
));

const Cards = (probs: any) => {
  return (
    <div className="flex  flex-col justify-center items-center gap-3 bg-white w-[300px]  rounded my-6">
      <div className="p-2 flex justify-center items-center bg-black text-white w-full">
        <h1 className="font-bold text-[20px]">{probs.title}</h1>
      </div>

      <div className="w-full px-4 flex flex-col gap-2">{listItems}</div>
    </div>
  );
};

export default Cards;
