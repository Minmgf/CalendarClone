import React, { useEffect, useState } from 'react';
import Select from "../Form/Select.jsx";
import { BiChevronDown } from "react-icons/bi";
import fullName from "../../utils/fullName.js";

export const lawyers = {
    lawyer1: "Juan Pérez",
    lawyer2: "Maria López",
    lawyer3: "Carlos Gómez",
}

const LawyerPicker = ({ onChange, createdBy, value, auth, updateEventId }) => {
    const [selectedLawyer, setSelectedLawyer] = useState("lawyer1")

    function handleChangeLawyer(selectedLawyer){
        setSelectedLawyer(selectedLawyer);
        onChange(selectedLawyer);
    }

    useEffect(() => {
        if (value) {
            setSelectedLawyer(value);
        }
    }, [value])

    return (
        <div className="flex items-center">
            {updateEventId ? (
                <div className="flex items-center gap-x-1">
                    <h4 className="mr-2 text-sm text-gray-600 ">
                        Lawyer:
                    </h4>
                </div>
            ) : (
                <div className="flex items-center gap-x-1">
                    <h4 className="mr-2 text-sm text-gray-600 ">
                        Lawyer:
                    </h4>
                </div>
            )}

            <Select
                value={selectedLawyer}
                onChange={handleChangeLawyer}
                className="mt-0"
                inputBg="py-1 rounded"
                dropdownClass={"lawyer-picker-dropdown"}
                withBg={false}
                render={(onChange) => (
                    <div className="grid grid-cols-1 gap-2">
                        {Object.keys(lawyers).map(lawyerKey => (
                            <span key={lawyerKey} onClick={() => onChange(lawyerKey)}
                                  className="block cursor-pointer">
                                {lawyers[lawyerKey]}
                            </span>
                        ))}
                    </div>
                )}
                renderPlaceholderValue={(val) => (
                    <div className="flex items-center">
                        <span className="mr-1">{lawyers[val]}</span>
                        <BiChevronDown />
                    </div>
                )}
            >
            </Select>
        </div>
    );
};

export default LawyerPicker;
