import Link from "next/link";

const NavBar = (props: any) => {
  return (
    <div {...props}>
      <h2 className="text-center font-semibold text-3xl">
        <pre>EFFIVE</pre>
      </h2>
      <div className="flex flex-col gap-2">
        <Link href="/">
          <button className="border p-2 w-full"> Tasks </button>
        </Link>
        {/* <Link href="/events">
          <button className="border p-2 w-full"> Events </button>
        </Link>
        <Link href="/notes">
          <button className="border p-2 w-full"> Notes </button>
        </Link> */}
      </div>
    </div>
  );
};

export default NavBar;
