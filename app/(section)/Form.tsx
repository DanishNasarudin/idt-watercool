"use client";
import React, { useState } from "react";
import { RiArrowDropDownFill, RiArrowDropLeftFill } from "react-icons/ri";
import { State } from "country-state-city";
import Link from "next/link";

type Props = {};

const Form = (props: Props) => {
  const [currentValue, setCurrentValue] = useState("notSelected");

  const [toggle, setToggle] = useState(false);

  const [emailProp, setEmailProp] = useState({
    name: "",
    email: "",
    contact: "",
    state: "notSelected",
    budget: "RM ",
    reason: "",
    requirements: "",
  });

  interface FormValues {
    name: string;
    email: string;
    contact: string;
    state: string;
    budget: string;
    reason: string;
    requirements: string;
  }

  interface FormState {
    isLoading: boolean;
    values: FormValues;
    isSent: boolean;
  }

  const initialFormState: FormState = {
    isLoading: false,
    isSent: false,
    values: {
      name: "",
      email: "",
      contact: "",
      state: "notSelected",
      budget: "RM ",
      reason: "",
      requirements: "",
    },
  };

  const [formValues, setFormValues] = useState<FormState>(initialFormState);

  const { values } = formValues;

  const formChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));

    setEmailProp({
      ...emailProp,
      [target.name]: target.value,
    });
  };

  const formAreaChange = ({
    target,
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormValues((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));
    setEmailProp({
      ...emailProp,
      [target.name]: target.value,
    });
  };

  const formSelectChange = ({
    target,
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));
    setEmailProp({
      ...emailProp,
      [target.name]: target.value,
    });
    setCurrentValue(target.value);
  };

  const [invalidFormat, setInvalidFormat] = useState({
    email: true,
    contact: true,
  });
  const [invalidRequired, setInvalidRequired] = useState({
    name: false,
    email: false,
    contact: false,
    budget: false,
    reason: false,
  });

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setFormValues((prev) => ({
      ...prev,
      isLoading: true,
    }));

    // console.log(formValues, "onsubmit check");

    await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(formValues.values),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then(() => {
      setTimeout(() => {
        setFormValues((prev) => ({
          ...prev,
          isLoading: false,
          values: {
            ...prev.values,
            name: "",
            email: "",
            contact: "",
            state: "notSelected",
            budget: "RM ",
            reason: "",
            requirements: "",
          },
        }));
        setEmailProp({
          ...emailProp,
          name: "",
          email: "",
          contact: "",
          state: "notSelected",
          budget: "RM ",
          reason: "",
          requirements: "",
        });
        setCurrentValue("notSelected");
      }, 2000);
      setFormValues((prev) => ({
        ...prev,
        isSent: true,
      }));
      setTimeout(() => {
        setFormValues((prev) => ({
          ...prev,
          isSent: false,
        }));
      }, 1000);
    });
  };

  return (
    <div
      className="max-w-[500px] w-full mx-auto flex flex-col gap-8 items-center z-[1] py-8 px-4 sm:px-2"
      id="chat"
    >
      <div className="flex flex-col gap-2 items-center">
        <h2 className="">Chat with us.</h2>
        <p>Let us know your budget and reasons.</p>
      </div>
      <form className="flex flex-col gap-2 w-full">
        <div>
          <label htmlFor="name__label">
            <p>
              Your Name <b style={{ color: "red" }}>*</b>
            </p>
          </label>
          <p>
            <input
              type="text"
              className={`text-black bg-secondary py-2 px-4 w-full max-w-[500px] rounded-lg mt-2 mb-2 border-[3px]
                ${
                  invalidRequired.name ? "border-red-500" : "border-transparent"
                }`}
              required
              name="name"
              value={values.name}
              onChange={formChange}
              onInput={(e) => {
                const input = e.currentTarget as HTMLInputElement;
                setInvalidRequired({
                  ...invalidRequired,
                  name: input.validity.valueMissing,
                });
              }}
            />
            <span
              className={`${invalidRequired.name ? "block" : "hidden"} mb-2`}
              style={{ fontSize: 12, color: "red" }}
            >
              Required
            </span>
          </p>
        </div>
        <div className="flex gap-0 sm:gap-8 flex-col sm:flex-row">
          <div className="flex-[3]">
            <label htmlFor="email__label">
              <p>
                Your Email <b style={{ color: "red" }}>*</b>
              </p>
            </label>
            <p>
              <input
                type="email"
                className={`text-black bg-secondary py-2 px-4 w-full max-w-[500px] rounded-lg mt-2 mb-2 border-[3px]
                ${
                  invalidFormat.email ? "border-transparent" : "border-red-500"
                }`}
                required
                name="email"
                value={values.email}
                onChange={formChange}
                onInput={(e) => {
                  const input = e.currentTarget as HTMLInputElement;
                  setInvalidFormat({
                    ...invalidFormat,
                    email: input.validity.valid,
                  });
                  setInvalidRequired({
                    ...invalidRequired,
                    email: input.validity.valueMissing,
                  });
                }}
              />
              <span
                className={`${
                  invalidRequired.email
                    ? "hidden"
                    : invalidFormat.email
                    ? "hidden"
                    : "block"
                } mb-2`}
                style={{ fontSize: 12, color: "red" }}
              >
                Invalid Email
              </span>
              <span
                className={`${invalidRequired.email ? "block" : "hidden"} mb-2`}
                style={{ fontSize: 12, color: "red" }}
              >
                Required
              </span>
            </p>
          </div>
          <div className="flex-[2]">
            <label htmlFor="contact__label">
              <p>
                Contact Number <b style={{ color: "red" }}>*</b>
              </p>
            </label>
            <p>
              <input
                type="tel"
                className={`text-black bg-secondary py-2 px-4 w-full max-w-[500px] rounded-lg mt-2 mb-2 border-[3px]
                ${
                  invalidFormat.contact
                    ? "border-transparent"
                    : "border-red-500"
                }`}
                pattern="\+60-[0-9]{7,10}"
                required
                placeholder="+60-123456789"
                onInput={(e) => {
                  const input = e.currentTarget as HTMLInputElement;
                  input.setCustomValidity(
                    input.validity.patternMismatch
                      ? "Please enter a valid Malaysian phone number in the format: +60-123456789"
                      : ""
                  );
                  setInvalidFormat({
                    ...invalidFormat,
                    contact: input.validity.valid,
                  });
                  setInvalidRequired({
                    ...invalidRequired,
                    contact: input.validity.valueMissing,
                  });
                }}
                name="contact"
                value={values.contact}
                onChange={formChange}
              />
              <span
                className={`${
                  invalidRequired.contact
                    ? "hidden"
                    : invalidFormat.contact
                    ? "hidden"
                    : "block"
                } mb-2`}
                style={{ fontSize: 12, color: "red" }}
              >
                Valid format: +60-123456789
              </span>
              <span
                className={`${
                  invalidRequired.contact ? "block" : "hidden"
                } mb-2`}
                style={{ fontSize: 12, color: "red" }}
              >
                Required
              </span>
            </p>
          </div>
        </div>
        <div>
          <label htmlFor="state__label">
            <p>
              Which state are you from? <b style={{ color: "red" }}>*</b>
            </p>
          </label>
          <div className="relative">
            <p>
              <select
                id="state__id"
                className="text-black bg-secondary py-2 px-4 w-full max-w-[500px] rounded-lg mt-2 mb-2 appearance-none cursor-pointer"
                onClick={() => {
                  setToggle(!toggle);
                }}
                required
                name="state"
                onChange={formSelectChange}
                value={currentValue}
              >
                <option
                  value="notSelected"
                  className="font-bold text-black"
                >{`Choose your state here`}</option>
                {State.getStatesOfCountry("MY").map((option, optionIndex) => {
                  return (
                    <option key={optionIndex} value={option.name}>
                      {option.name}
                    </option>
                  );
                })}
              </select>
            </p>
            <RiArrowDropLeftFill
              size={40}
              className={`absolute top-[0%] sm:right-[0] right-2 sm:translate-y-[-0%] translate-y-[-0%] mt-2 pointer-events-none
                    ${toggle ? "hidden" : ""}`}
              color={"black"}
            />
            <RiArrowDropDownFill
              size={40}
              className={`absolute top-[0%] sm:right-[0] right-2 sm:translate-y-[-0%] translate-y-[-0%] mt-2 pointer-events-none
                    ${toggle ? "" : "hidden"}`}
              color={"black"}
            />
          </div>
        </div>
        <div>
          <label htmlFor="name__label">
            <p>
              What is your budget range for the PC?{" "}
              <b style={{ color: "red" }}>*</b>
            </p>
          </label>
          <p>
            <input
              type="text"
              className={`text-black bg-secondary py-2 px-4 w-full max-w-[500px] rounded-lg mt-2 mb-2 border-[3px]
                ${
                  invalidRequired.budget
                    ? "border-red-500"
                    : "border-transparent"
                }`}
              required
              name="budget"
              placeholder="RM"
              value={values.budget}
              onChange={formChange}
              onInput={(e) => {
                const input = e.currentTarget as HTMLInputElement;
                setInvalidRequired({
                  ...invalidRequired,
                  budget: input.validity.valueMissing,
                });
              }}
            />
            <span
              className={`${invalidRequired.budget ? "block" : "hidden"} mb-2`}
              style={{ fontSize: 12, color: "red" }}
            >
              Required
            </span>
          </p>
        </div>
        <div>
          <label htmlFor="reason__label">
            <p>
              What are you using the PC for? <b style={{ color: "red" }}>*</b>
            </p>
          </label>
          <p>
            <textarea
              id="reason__id"
              rows={2}
              className={`text-black bg-secondary py-2 px-4 w-full max-w-[500px] rounded-lg mt-2 mb-2 border-[3px]
                ${
                  invalidRequired.reason
                    ? "border-red-500"
                    : "border-transparent"
                }`}
              required
              name="reason"
              value={values.reason}
              onChange={formAreaChange}
              onInput={(e) => {
                const input = e.currentTarget as HTMLTextAreaElement;
                setInvalidRequired({
                  ...invalidRequired,
                  reason: input.validity.valueMissing,
                });
              }}
            />
            <span
              className={`${invalidRequired.reason ? "block" : "hidden"} mb-2`}
              style={{ fontSize: 12, color: "red" }}
            >
              Required
            </span>
          </p>
        </div>
        <div>
          <label htmlFor="requirements__label">
            <p>Any other requirements you would like?</p>
          </label>
          <p>
            <textarea
              id="requirements__id"
              rows={2}
              className="text-black bg-secondary py-2 px-4 w-full max-w-[500px] rounded-lg mt-2 mb-2"
              name="requirements"
              value={values.requirements}
              onChange={formAreaChange}
            />
          </p>
        </div>
        <div className="flex justify-around items-center">
          <button
            className={`
            py-2 px-4 bg-accent text-secondary font-bold rounded-xl border-transparent
          transition-all
          ${formValues.isLoading ? "bg-green-600" : ""}
          ${
            !values.name ||
            !values.email ||
            !values.contact ||
            values.state === "notSelected" ||
            !values.reason ||
            !values.budget ||
            invalidRequired.contact ||
            invalidRequired.email ||
            invalidRequired.name ||
            invalidRequired.reason ||
            invalidRequired.budget ||
            !invalidFormat.email ||
            !invalidFormat.contact
              ? "mobilehover:hover:bg-zinc-500/50 bg-zinc-500"
              : "mobilehover:hover:bg-accent/50 bg-accent"
          }`}
            disabled={
              !values.name ||
              !values.email ||
              !values.contact ||
              values.state === "notSelected" ||
              !values.reason ||
              !values.budget ||
              invalidRequired.contact ||
              invalidRequired.email ||
              invalidRequired.name ||
              invalidRequired.reason ||
              invalidRequired.budget ||
              !invalidFormat.email ||
              !invalidFormat.contact
            }
            onClick={onSubmit}
          >
            <p>
              {formValues.isLoading
                ? "Submitting.."
                : formValues.isSent
                ? "Submitted!"
                : "Submit"}
            </p>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
