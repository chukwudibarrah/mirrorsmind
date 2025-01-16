/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useRef, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { heroin } from "@/styles/fonts";

const requiredSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export default function SubscribeForm() {
  const [status, setStatus] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [run, setRun] = useState<boolean>(false);
  const [totalCounts, setTotalCounts] = useState<number>(400);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    setDimensions({
      width,
      height,
    });
  }, []);
  return (
    <div className="flex flex-col space-y-8 md:w-[500px]">
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={requiredSchema}
        onSubmit={async (values, { resetForm }) => {
          setButtonDisabled(true);
          setSubmitting(true);
          try {
            const response = await fetch("/api/subscribe", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: values.email,
              }),
            });

            const data = await response.json();

            if (!response.ok) {
              setStatus(response.status);
              setMessage(data.error || "Something went wrong.");
              setTimeout(() => {
                setMessage("");
                setButtonDisabled(false);
                setSubmitting(false);
              }, 2000);
              return;
            }

            setStatus(201);
            setMessage("Thank you for joining my mailing list 👻.");
            setRun(true);
            setTimeout(() => {
              setTotalCounts(0);
              setMessage("");
              resetForm();
              setButtonDisabled(false);
              setSubmitting(false);
            }, 4000);
            setTotalCounts(400);
          } catch (error) {
            console.error("Error:", error);
            setStatus(500);
            setMessage(
              "There was an error subscribing to the newsletter. Please try again later."
            );
            setTimeout(() => {
              setMessage("");
              setButtonDisabled(false);
              setSubmitting(false);
            }, 2000);
          }
        }}
      >
        <Form className="w-full">
          <div className="w-full bg-transparent border flex-1 border-black rounded-xl flex gap-2 px-3">
            <Field
              type="email"
              name="email"
              className={`w-full grow rounded-md bg-transparent px-5 py-3 outline-none placeholder:footer-text placeholder:${heroin.className}`}
              placeholder="Enter your email"
              autoComplete="off"
            />
            <button
              className={`rounded-xl bg-red-500 border-red-500 border-[1px] my-2 px-4 py-2 text-white transition-all hover:scale-105 hover:bg-white disabled:opacity-80 button-text ${heroin.className}`}
              type="submit"
              disabled={buttonDisabled}
            >
              {submitting ? "Submitting" : "Subscribe"}
            </button>
          </div>
          {message && (
            <p
              className={`${
                status !== 201 ? "text-red-500" : "text-green-500"
              } pt-4 footer-text`}
            >
              {message}
            </p>
          )}
        </Form>
      </Formik>
    </div>
  );
}
