import React from "react";
import Login from "./Login";

const SignInPage = () => {
  return (
    <div className='min-h-screen h-fit w-screen bg-neutral-500'>
      <div className="flex justify-between lg:mx-36">
        <img src="https://ik.imagekit.io/priyanshu61103/gather-logo-2.png" alt="" className="h-40 w-40" />
      </div>
      <div className="flex gap-32 lg:gap-50 ml-5 lg:mx-15 flex-col lg:flex-row">
        <div>
          <div className="flex gap-x-2 lg:ml-40 ml-0 lg:mt-20">
            <img src="https://ik.imagekit.io/priyanshu61103/group_users.png?updatedAt=1779982721095" alt="" className="h-10 w-24 lg:h-12 lg:w-28" />
            <div>
              <div className="flex gap-x-2 mt-1">
                <img src="https://ik.imagekit.io/priyanshu61103/star-icon.png" alt="" className="h-4 w-4 lg:h-5 lg:w-5" />
                <img src="https://ik.imagekit.io/priyanshu61103/star-icon.png" alt="" className="h-4 w-4 lg:h-5 lg:w-5" />
                <img src="https://ik.imagekit.io/priyanshu61103/star-icon.png" alt="" className="h-4 w-4 lg:h-5 lg:w-5" />
                <img src="https://ik.imagekit.io/priyanshu61103/star-icon.png" alt="" className="h-4 w-4 lg:h-5 lg:w-5" />
                <img src="https://ik.imagekit.io/priyanshu61103/star-icon.png" alt="" className="h-4 w-4 lg:h-5 lg:w-5" />
              </div>
              <h1 className="font-semibold text-white text-sm lg:text-lg">
                Let's Gather Together
              </h1>
            </div>
          </div>
          <div className="ml-0 lg:ml-40 mt-10">
            <h1 className="w-80 lg:w-[650px] flex lg:text-6xl text-4xl font-bold text-white mb-2">
              Connections crafted, community cultivated.
            </h1>
            <h2 className="w-80 lg:w-[500px] text-lg lg:text-2xl text-white">
              Connect with Global Community on Gather
            </h2>
          </div>
        </div>
        <div className="relative lg:right-20 bottom-20">
          <Login/>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
