import React from "react";
import JobApplicationClient from "./JobApplicationClient";

export async function generateStaticParams() {
  return [
    { jobId: "1" },
    { jobId: "2" },
    { jobId: "3" },
    { jobId: "4" },
  ];
}

export default function Page() {
  return <JobApplicationClient />;
}
