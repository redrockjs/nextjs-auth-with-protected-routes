import {NextPage} from "next";
import Link from "next/link";
import React from "react";

const Custom404: NextPage = () => {
  return (
    <div className="container">
      <div className="grid place-content-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="my-4 text-center">
            <h1 className="text-2xl">404 - Not found</h1>
            <p className="">We could not find the page on our server</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Custom404;