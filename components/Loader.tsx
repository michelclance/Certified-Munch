import React from "react";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen flex justify-center items-center z-50"   style={{
      backdropFilter: "blur(20px)",
 
    }}
  >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center space-y-4">
        <p className="text-black text-xl font-medium font-sans text-center">
          Your little ass is going to wait. You got that?
        </p>
        <Image src="/images/loading.gif" alt="loading..." width={300} height={300}/>
      </div>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-40">
      <div className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen flex justify-center items-center z-40 backdrop-filter blur-3xl bg-black bg-opacity-50" />
      </div>
    </div>
  );
};

export default Loader;

