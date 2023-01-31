import { useState } from "react";
import Joi from "joi";
import { schema, schemaDictionary } from "../services/schemaService";
import Input from "./input";
import React from "react";
const CardForm = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [cvc, setCvc] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const handleChange = (e) => {
    const functionMapping = {
      name: setName,
      month: setMonth,
      year: setYear,
      cvc: setCvc,
      number: setNumber,
    };
    functionMapping[e.target.name](e.target.value);
  };
  const handleBlur = (e) => {
    partialValidation(e);
  };
  const partialValidation = (event) => {
    const { name, value } = event.target;
    let errorData = { ...errors };
    const subSchema = Joi.object().keys({ [name]: schemaDictionary[name] });
    const { error } = subSchema.validate({ [name]: value });
    if (error) {
      errorData[name] = error.details[0].message;
    } else {
      delete errorData[name];
    }
    setErrors(errorData);
  };
  const handleSubmit = () => {
    if (submitted) {
      setName("");
      setNumber("");
      setMonth("");
      setYear("");
      setCvc("");
      setErrors("");
      setSubmitted(false);
      return;
    }
    let results = schema.validate({
      name: name,
      number: number,
      cvc: cvc,
      month: month,
      year: year,
    });
    if (results.error) {
      alert("You cannot Submit the form");
      return;
    }
    setSubmitted(true);
  };
  return (
    <div className="grid grid-cols-3 h-full w-full relative justify-start items-start">
      <div className="col-span-1 w-full h-full bg-heroDesktop bg-cover bg-no-repeat ">
        <div
          id="front-card"
          className="absolute lg:top-[180px] lg:left-[260px]"
        >
          <img
            src={require("../assets/images/bg-card-front.png")}
            alt="front-card"
          />
          <svg
            width="84"
            height="47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute lg:top-[25px] lg:left-[30px]"
          >
            <ellipse cx="23.478" cy="23.5" rx="23.478" ry="23.5" fill="#fff" />
            <path
              d="M83.5 23.5c0 5.565-4.507 10.075-10.065 10.075-5.559 0-10.065-4.51-10.065-10.075 0-5.565 4.506-10.075 10.065-10.075 5.558 0 10.065 4.51 10.065 10.075Z"
              stroke="#fff"
            />
          </svg>
          <div className="text-white absolute lg:bottom-[25px] tracking-wider lg:w-[450px] px-[40px]">
            <p className="text-center text-2xl font-spaceGrotesk mb-8 tracking-[.22em]">
              {number.match(/.{1,4}/g)?.join(" ") || ""}{" "}
            </p>
            <div className="flex justify-between w-full">
              <p className="text-sm font-spaceGrotesk uppercase">{name}</p>
              <p className="text-sm font-spaceGrotesk">
                {month}/{year}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute lg:top-[480px] lg:left-[360px]" id="back-card">
          <img
            src={require("../assets/images/bg-card-back.png")}
            alt="back-card"
          />
          <p className="absolute lg:right-[60px] lg:bottom-[113px] text-white font-spaceGrotesk tracking-widest text-sm">
            {cvc}
          </p>
        </div>
      </div>
      {!submitted && (
        <div className="col-span-2 w-full h-full lg:pl-[400px] lg:pt-[290px] text-left">
          <form>
            <div className="w-[380px]">
              <label className="uppercase tracking-widest text-sm font-spaceGrotesk text-veryDarkViolet block mb-2">
                Card Holder
              </label>
              <Input
                name="name"
                type="text"
                placeholder="e.g Younes Amor"
                handleChange={handleChange}
                errors={errors}
                value={name}
                handleBlur={handleBlur}
              />
            </div>
            <div className="w-[380px]">
              <label className="uppercase tracking-widest text-sm font-spaceGrotesk text-veryDarkViolet block mb-2">
                Card Number
              </label>
              <Input
                name="number"
                type="text"
                placeholder="1234 5678 9123 0000"
                handleChange={handleChange}
                errors={errors}
                value={number}
                handleBlur={handleBlur}
                maxLength="16"
              />
            </div>

            <div className="flex w-[380px] justify-between gap-4">
              <div className="">
                <label className="uppercase tracking-widest text-sm font-spaceGrotesk text-veryDarkViolet block mb-2">
                  EXP. DATE (MM/YY)
                </label>
                <div className="flex gap-2 w-[250px] h-12">
                  <Input
                    name="month"
                    type="text"
                    placeholder="MM"
                    handleChange={handleChange}
                    errors={errors}
                    value={month}
                    handleBlur={handleBlur}
                  />
                  <Input
                    name="year"
                    type="text"
                    placeholder="YY"
                    handleChange={handleChange}
                    value={year}
                    errors={errors}
                    handleBlur={handleBlur}
                  />
                </div>
              </div>
              <div>
                <label className="uppercase tracking-widest text-sm font-spaceGrotesk text-veryDarkViolet block mb-2">
                  CVC
                </label>
                <Input
                  name="cvc"
                  type="text"
                  placeholder="CVC"
                  handleChange={handleChange}
                  value={cvc}
                  errors={errors}
                  handleBlur={handleBlur}
                />
              </div>
            </div>
          </form>
          <button
            onClick={handleSubmit}
            className="border rounded-lg bg-veryDarkViolet text-spaceGrotesk text-white lg:w-[380px] p-3"
          >
            Confirm
          </button>
        </div>
      )}

      <ThankYou submitted={submitted} handleSubmit={handleSubmit} />
    </div>
  );
};

const ThankYou = (props) => {
  const { submitted, handleSubmit } = props;
  return (
    <React.Fragment>
      {submitted && (
        <div className="flex flex-col justify-center items-center col-span-2 text-center pt-[280px] space-y-4">
          <svg
            width="80"
            height="80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="40" cy="40" r="40" fill="url(#a)" />
            <path d="M28 39.92 36.08 48l16-16" stroke="#fff" strokeWidth="3" />
            <defs>
              <linearGradient
                id="a"
                x1="-23.014"
                y1="11.507"
                x2="0"
                y2="91.507"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#6348FE" />
                <stop offset="1" stopColor="#610595" />
              </linearGradient>
            </defs>
          </svg>
          <p className="text-3xl text-spaceGrotesk tracking-widest">
            Thank You!
          </p>
          <p className="text-gray-400 text-spaceGrotesk tracking-widest">
            We have added your card details
          </p>
          <button
            onClick={handleSubmit}
            className="border rounded-lg bg-veryDarkViolet text-white text-spaceGrotesk p-3 lg:w-[380px] mt-4"
          >
            Continue
          </button>
        </div>
      )}
    </React.Fragment>
  );
};
export default CardForm;
