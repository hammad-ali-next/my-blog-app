import Image from "next/image";

export type Category = {
  name: string;
};

export default function Navbar() {
  const categories: Category[] = [
    { name: "Technology" },
    { name: "Travel" },
    { name: "Food" },
  ];

  return (
    <nav className="m-6 bg-white border border-gray-200 rounded-2xl p-6 bg-amber-00 w-vh flex items-center justify-evenly">
      <div className="flex  max-w-7xl space-x-2 items-center">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={40}
          height={40}
          className="object-contain"
        />
        <span className="text-xl font-bold text-blue-400">Bloogie</span>
      </div>
      <ul className="flex space-x-4">
        {categories.map((cat, index) => (
          <li
            className=" bg-blue-100 p-2 rounded-3xl hover:text-blue-500 hover:text-2xl duration-300 ease-in-out hover:transition-all cursor-pointer"
            key={index}
          >
            {cat.name}
          </li>
        ))}
      </ul>

      <button className="bg-blue-100 p-2 rounded-3xl hover:text-blue-500 hover:text-2xl duration-300 ease-in-out hover:transition-all cursor-pointer">
        Log In
      </button>
    </nav>
  );
}
