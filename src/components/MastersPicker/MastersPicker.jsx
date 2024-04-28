// MasterPicker.jsx
import React, { useEffect, useState } from 'react';
import Select from "../Form/Select.jsx"; // Asegúrate de tener este componente
import { BiChevronDown } from "react-icons/bi";

export const masters = {
    master1: "Master 1",
    master2: "Master 2",
    master3: "Master 3",
};


const MasterPicker = ({ onChange, createdBy, value, auth, updateEventId }) => {
    const [selectedMaster, setSelectedMaster] = useState("master1");

    function handleChangeMaster(selectedMaster) {
        setSelectedMaster(selectedMaster);
        onChange(selectedMaster);
    }

    useEffect(() => {
        if (value) {
            setSelectedMaster(value);
        }
    }, [value]);

    return (
        <div className="flex items-center">
            {updateEventId ? (
                <div className="flex items-center gap-x-1">
                    <h4 className="mr-2 text-sm text-gray-600">
                        Master:
                    </h4>
                </div>
            ) : (
                <div className="flex items-center gap-x-1">
                    <h4 className="mr-2 text-sm text-gray-600">
                        Master:
                    </h4>
                </div>
            )}

            <Select
                value={selectedMaster}
                onChange={handleChangeMaster}
                className="mt-0"
                inputBg="py-1 rounded"
                dropdownClass={"master-picker-dropdown"}
                withBg={false}
                render={(onChange) => (
                    <div className="grid grid-cols-1 gap-2">
                        {Object.keys(masters).map(masterKey => (
                            <span key={masterKey} onClick={() => onChange(masterKey)}
                                  className="block cursor-pointer">
                                {masters[masterKey]}
                            </span>
                        ))}
                    </div>
                )}
                renderPlaceholderValue={(val) => (
                    <div className="flex items-center">
                        <span className="mr-1">{masters[val]}</span>
                        <BiChevronDown />
                    </div>
                )}
            >
            </Select>
        </div>
    );
};

export default MasterPicker;
