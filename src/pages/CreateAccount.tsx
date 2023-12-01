import { createElement, useEffect, useState } from "react";
import { useStore } from "../store";
import { Spinner } from "../components/Spinner";

const steps = [BirthYear, Phone, Name, SecurityQuestion, Sensitive, Done];

export function AccountPage() {
  const [step, setStep] = useState(0);
  const setPage = useStore((s) => s.setPage);

  useEffect(() => {
    if (step === steps.length) {
      setPage("postsignup");
    }
  });

  if (step === steps.length) {
    return null;
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-white rounded-xl flex flex-col items-center w-1/3 p-5">
        <h1 className=" text-3xl">Sign Up</h1>
        <span>Create an account - Step {step + 1} of 5</span>

        {createElement(steps[step], {
          nextStep: () => setStep(step + 1),
        })}
      </div>
    </div>
  );
}

function BirthYear({ nextStep }: { nextStep: () => void }) {
  const [year, setYear] = useState(2000);
  const [step, setStep] = useState(100);
  const [buttonState, setButtonState] = useState(false);

  return (
    <div className="p-20 flex items-center flex-col gap-3 text-2xl font-normal">
      <span>
        Where you born in <span className="font-black">{year}</span>?
      </span>
      <div className="flex flex-row gap-3">
        {buttonState ? (
          <>
            <button
              onClick={() => {
                setYear(year + step);
                setStep(Math.ceil(step / 2));
                setButtonState(false);
              }}
            >
              Higher
            </button>
            <button
              onClick={() => {
                setYear(year - step);
                setStep(Math.ceil(step / 2));
                setButtonState(false);
              }}
            >
              Lower
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setButtonState(true)}>No</button>
            <button
              onClick={() => {
                nextStep();
              }}
            >
              Yes
            </button>
          </>
        )}
      </div>
      {year < 2000 && <div className="text-sm">(Okay Boomer)</div>}
    </div>
  );
}

function Phone({
  nextStep,
}: {
  nextStep: () => void;
  setPhoneNumber: (phoneNumber: string) => void;
}) {
  return (
    <div className="p-20 flex items-center flex-col gap-3 text-2xl font-normal">
      Your phone number is{" "}
      <span className="font-black">+49 (555) 839-2930</span>
      <div className="text-lg text-center">
        If this isn't your phone number, please contact your carrier to change
        your phone number to this one.
      </div>
      <button className="" onClick={nextStep}>
        Okay
      </button>
    </div>
  );
}

function Name({
  nextStep,
}: {
  nextStep: () => void;
  setName: (name: string) => void;
}) {
  const setStateName = useStore((s) => s.setName);
  const [enteredName, setEnteredName] = useState(false);

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");

  return (
    <div className="p-20 flex items-center flex-col gap-3 text-2xl font-normal">
      Please enter your name:
      <input
        className="border-2 border-black rounded-lg p-2 text-lg"
        value={lastName}
        onChange={(e) => {
          setLastName(e.target.value);
        }}
        disabled={enteredName}
      />
      {enteredName && (
        <>
          <span>And your first name:</span>
          <input
            className="border-2 border-black rounded-lg p-2 text-lg"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </>
      )}
      <button
        onClick={() => {
          if (enteredName) {
            setStateName(`${firstName} ${lastName}`);
            nextStep();
          } else {
            setEnteredName(true);
          }
        }}
      >
        Continue
      </button>
    </div>
  );
}

function SecurityQuestion({
  nextStep,
}: {
  nextStep: () => void;
  setSecurityQuestion: (securityQuestion: string) => void;
}) {
  const questions = [
    "What totally rad expression did you overuse in high school?",
    "Which Disney character's story does your life most resemble?",
    "If you were a type of jeans, what type would you be?",
    "If your best friend picked a tattoo for you to get, what would he/she pick?",
    "If you were the president, what would you change about the decorations in the White House?",
    "What's the worst thing you ever did as a kid — and got away with?",
  ];

  const [questionIndex, setQuestionIndex] = useState(0);
  const question = questions[questionIndex % questions.length];

  return (
    <div className="p-20 flex items-center flex-col gap-3 text-2xl font-normal">
      <span>Security Question:</span>
      <span className="text-lg text-center font-sans">"{question}"</span>
      <button
        onClick={() => {
          setQuestionIndex(questionIndex + 1);
        }}
      >
        Give me a different question
      </button>
      <input
        className="border-2 border-black rounded-lg p-2 text-lg"
        placeholder="Answer"
      />
      <button
        onClick={() => {
          nextStep();
        }}
      >
        Continue
      </button>
    </div>
  );
}

function Sensitive({ nextStep }: { nextStep: () => void }) {
  const questions = [
    "Social Security Number",
    "CVC Digits of your Credit Card",
    "Your Mother's Maiden Name",
    "Your exact bank account balance",
  ];
  return (
    <div className="p-20 flex items-center flex-col gap-3 text-2xl font-normal">
      <h1 className="text-center">Awesome, here are a few last questions:</h1>
      {questions.map((question) => (
        <input
          type="text"
          className="border-2 border-black rounded-lg p-2 text-lg w-64"
          placeholder={question}
          key={question}
        />
      ))}
      <button
        onClick={() => {
          nextStep();
        }}
      >
        Create Account!
      </button>
    </div>
  );
}

function Done({
  nextStep,
}: {
  nextStep: () => void;
  setDone: (done: boolean) => void;
}) {
  const loadingStates = [
    "Connecting to the mainframe...",
    "Loading your details...",
    "Cross checking your against the naughty list...",
    "Checking your bank account balance...",
    "Checking your credit score...",
  ];

  const name = useStore((s) => s.name);

  const [loadingState, setLoadingState] = useState(0);

  const text = loadingStates[loadingState] ?? "Done.";
  const done = loadingState >= loadingStates.length;

  useEffect(() => {
    const interval = setInterval(() => {
      if (loadingState >= loadingStates.length) {
        clearInterval(interval);
        return;
      }
      setLoadingState((l) => l + 1);
    }, 2500);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="p-20 flex items-center flex-col gap-3 text-2xl font-normal">
      <h1 className="text-center flex flex-row gap-3">
        {text} {!done && <Spinner />}
      </h1>
      {done && (
        <>
          <span className="text-4xl whitespace-nowrap">Hello {name}!</span>
          <button className="" onClick={nextStep}>
            Continue with your account
          </button>
        </>
      )}
    </div>
  );
}
