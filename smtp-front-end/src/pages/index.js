import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={``}>
      {" "}
      <svg
        className="email-svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{
                stopColor: "rgba(100, 150, 200, 0.5)",
                animation: "gradientAnimation 15s infinite",
              }}
            ></stop>
            <stop
              offset="25%"
              style={{
                stopColor: "rgba(150, 200, 250, 0.5)",
                animation: "gradientAnimation 15s infinite",
              }}
            ></stop>
            <stop
              offset="50%"
              style={{
                stopColor: "rgba(200, 250, 200, 0.5)",
                animation: "gradientAnimation 15s infinite",
              }}
            ></stop>
            <stop
              offset="75%"
              style={{
                stopColor: "rgba(250, 200, 150, 0.5)",
                animation: "gradientAnimation 15s infinite",
              }}
            ></stop>
            <stop
              offset="100%"
              style={{
                stopColor: "rgba(200, 150, 100, 0.5)",
                animation: "gradientAnimation 15s infinite",
              }}
            ></stop>
          </linearGradient>
        </defs>
        <path
          d="M10,30 L90,30 L90,70 L10,70 Z" /* Envelope body */
          fill="url(#grad)"
          stroke="#000"
          strokeWidth="2"
        />
        <path
          d="M10,30 L50,50 L90,30" /* Envelope flap */
          fill="none"
          stroke="#000"
          strokeWidth="2"
        />
      </svg>
      <div className="mx-auto mt-[10%]">
        <h1 className="text-white text-6xl font-serif  text-center ">
          Email Sender With Gmail API
        </h1>
        <div className="absolute bottom-44  w-full">
          <Link href={"/gmail-api"}>
            <div className="text-white w-[180px] m-auto   border-4 px-10 py-5">
              {" "}
              <button className="text-xl">Start Now</button>
            </div>{" "}
          </Link>
        </div>
      </div>
    </main>
  );
}
