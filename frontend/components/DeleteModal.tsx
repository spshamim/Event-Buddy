import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
    isOpen,
    onClose,
    onDelete,
}) => {
    const [disabledButton, setDisabledButton] = useState(true);

    const checkDeleteModalChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setDisabledButton(true);
        if (event.target.value === "DELETE") {
            setDisabledButton(false);
        }
    };

    return (
        <div
            className={`${
                isOpen ? "visible" : "invisible"
            } w-full h-screen fixed top-0 left-0 z-[200000000] bg-[#0000002a] flex items-center justify-center transition-all duration-300`}
        >
            <div
                className={`${
                    isOpen ? "scale-[1] opacity-100" : "scale-[0] opacity-0"
                } w-[90%] sm:w-[80%] md:w-[30%] bg-[#fff] rounded-lg p-5 transition-all duration-300 z-[999]`}
            >
                <div className="w-full flex items-center justify-between">
                    <h2 className="text-[#000] text-[1.3rem] font-[500]">
                        Delete Event
                    </h2>
                    <RxCross1
                        className="p-2 text-[2rem] hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
                        onClick={onClose}
                    />
                </div>

                <div className="w-full">
                    <p className="text-[#424242] text-[1rem] font-[400]">
                        Are you sure you want to delete this event?
                    </p>

                    <div className="mt-5">
                        <label className="font-[400] text-black">
                            Type <b>"DELETE"</b> to confirm
                        </label>{" "}
                        <br />
                        <input
                            onChange={checkDeleteModalChange}
                            type="text"
                            className="py-3 px-4 border border-gray-200 rounded-md mt-1 w-full outline-none focus:border-[#3B9DF8]"
                        />
                    </div>

                    <div className="mt-8 flex w-full items-end justify-end gap-[13px]">
                        <button
                            onClick={onClose}
                            className="py-2 px-6 rounded font-[500] z-10 border border-[#cecece] text-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onDelete}
                            className={`${
                                disabledButton
                                    ? "!bg-[#FDECEB] !border-[#FDECEB] text-red-200 cursor-not-allowed"
                                    : "bg-red-600 text-white border-red-600 py-2 px-6 border rounded font-[500]"
                            }`}
                            disabled={disabledButton}
                        >
                            Yes, Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
