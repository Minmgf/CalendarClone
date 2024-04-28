import React, { useEffect, useState } from 'react';
import Select from "../Form/Select.jsx";
import { BiChevronDown } from "react-icons/bi";

export const courts = {
    court1: "Corte Suprema",
    court2: "Corte de Apelaciones",
    court3: "Tribunal de Justicia",
}

const CourtPicker = ({ onChange, createdBy, value, auth, updateEventId }) => {
    const [selectedCourt, setSelectedCourt] = useState("court1");

    const handleChangeCourt = (court) => {
        setSelectedCourt(court);
        onChange(court);
    };

    useEffect(() => {
        if (value) {
            setSelectedCourt(value);
        }
    }, [value]);

    return (
        <div className="flex items-center">
            {updateEventId ? (
                <div className="flex items-center gap-x-1">
                    <h4 className="mr-2 text-sm text-gray-600">Court:</h4>
                </div>
            ) : (
                <div className="flex items-center gap-x-1">
                    <h4 className="mr-2 text-sm text-gray-600">Court:</h4>
                </div>
            )}

            <Select
                value={selectedCourt}
                onChange={handleChangeCourt}
                className="mt-0"
                inputBg="py-1 rounded"
                dropdownClass={"court-picker-dropdown"}
                withBg={false}
                render={(onChange) => (
                    <div className="grid grid-cols-1 gap-2">
                        {Object.keys(courts).map(courtKey => (
                            <span key={courtKey} onClick={() => onChange(courtKey)}
                                  className="block cursor-pointer">
                                {courts[courtKey]}
                            </span>
                        ))}
                    </div>
                )}
                renderPlaceholderValue={(val) => (
                    <div className="flex items-center">
                        <span className="mr-1">{courts[val]}</span>
                        <BiChevronDown />
                    </div>
                )}
            >
            </Select>
        </div>
    );
};

export default CourtPicker;
