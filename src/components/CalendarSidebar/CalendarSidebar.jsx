import React, {useEffect, useState} from 'react';
import {plus} from "../../icons/plus";
import {BiCaretDown, BiChevronDown, BiChevronRight, BiPlus} from "react-icons/all";
import Popup from "../Popup/Popup";
import SmallCalendar from "../SmallCalendar/SmallCalendar";
import Accordion from "../Accordion/Accordion";
import statusColors from "../../utils/statusColors";
import {useNavigate} from "react-router-dom";
import dayjs from "dayjs";
import {colors} from "../ColorPicker/ColorPicker";
import useAuthContext from "../../context/useAuthContext.js";


const CalendarSidebar = (props) => {

    const {
        openAddNewEventModal,
        isOpenChooseEventModal,
        setOpenChooseEventModal,
        events,
        setCalendar,
        setFilterEvent,
        filterEvents,
    } = props

    const navigate = useNavigate()

    const [authState ] = useAuthContext()


    useEffect(() => {
        if (events.length > 0) {
            setMyCreatedEvent(events.filter(evt => evt.createdBy._id === authState?.auth?._id))
            setInvitedMe(events.filter(evt => evt.invitations.includes(authState?.auth?._id)))
        }
    }, [events])
    
    

    const [expandItems, setExpandItems] = useState([1, 2])
    
    const [invitedMe, setInvitedMe] = useState([])
    const [myCreatedEvent, setMyCreatedEvent] = useState([])

    const [accItemShowContentLen, setAccItemShowContentLen] = useState({
        1: 5,
        2: 10
    })


    function handleToggle(id) {
        if (expandItems.includes(id)) {
            setExpandItems(expandItems.filter(i => i !== id))
        } else {
            setExpandItems([...expandItems, id])
        }

        setAccItemShowContentLen(prev => ({
            ...prev,
            [id]: accItemShowContentLen[id]
        }))

    }

    function handleExpandAccContent(e, id, len) {
        e.stopPropagation();

        if (accItemShowContentLen[id] !== len) {
            setAccItemShowContentLen(prev => ({
                ...prev,
                [id]: len
            }))
        } else {
            setAccItemShowContentLen(prev => ({
                ...prev,
                [id]: 10
            }))
        }
    }

    function sortByStatusPending(arr) {
        return arr
    }
    
    function sortByDate(arr) {
        arr.sort((a, b)=>{
            let aDate = new Date(a.start)
            let bDate = new Date(b.start)
            return bDate - aDate
            if(aDate < bDate) {
                return 1
            } else if(aDate > bDate) {
                return  -1
            } else {
                return 0
            }
        })
        return arr
    }
    
    
    function handleChangeDateOnSmallCalendar(date){
        let d = dayjs(date)
        setCalendar({
            selectedDate: date
        })
        navigate(`/day?date=` + d.format("MM-DD-YYYY"))
    }
    
    function handleChangeFilterEvent(status){
        setFilterEvent(status)
    }
    
    function handleOpenEventDetailRoute(eventId){
        let to = "/month?detail="
        if(eventId){
            to += eventId
        }
        navigate(to)
    }
    
    
    

    return (
        <div className="sidebar">
            <div className="relative calendar-page">
                <button className="flex items-center mt-4 btn add-new-btn"
                        onClick={() => openAddNewEventModal("event")}>
                    <BiPlus className="text-xl text-primary" />
                    <span className="mr-4 text-sm font-medium">New Event</span>
                </button>


                <Popup className="left-0 w-40 px-0 py-1 rounded-lg absloute top-14"
                       onClose={() => setOpenChooseEventModal(false)}
                       isOpen={isOpenChooseEventModal}>
                    <div>
                        <li onClick={() => openAddNewEventModal("event")}
                            className="px-2 py-2 text-sm list-none cursor-pointer hover:bg-gray-100">Event
                        </li>
                        <li onClick={() => openAddNewEventModal("task")}
                            className="px-2 py-2 text-sm list-none cursor-pointer hover:bg-gray-100">Task
                        </li>
                    </div>
                </Popup>
            </div>

            <div className="sidebar-scroll">

                <SmallCalendar onChange={handleChangeDateOnSmallCalendar}/>

                <br/>
                <br/>
                <br/>
                
                <Accordion openIds={expandItems}>
                    <Accordion.Item
                        dataId={1}
                        header={(isOpen) => (
                            <div
                                className="flex items-center justify-between accordion-header"
                                onClick={() => handleToggle(1)}>

                                <h4 className="">My Calendar</h4>
                                {isOpen
                                    ? <BiChevronDown className="text-xs text-gray-500"/>
                                    : <BiChevronRight className="text-xs text-gray-500"/>
                                }
                            </div>
                        )}
                    >

                        <div className="accordion-content">
                            {/*{sortByStatusPending(myCreatedEvent.slice(0, accItemShowContentLen[1])).map(evt => (*/}
                            {/*    <div className="accordion-li" key={evt._id}>*/}
                            {/*        <h4 className="flex items-center">*/}
                            {/*            <div className="col-span-1">*/}
                            {/*                <div style={{background:  colors[evt.eventColor] || statusColors[evt.status]}}*/}
                            {/*                     className="block w-3 h-3 rounded-full"></div>*/}
                            {/*            </div>*/}
                            {/*            <div className="ml-2">*/}
                            {/*                <span className="accordion-content-title">{evt.title}</span>*/}
                            {/*            </div>*/}
                            {/*        </h4>*/}
                            {/*    </div>*/}
                            {/*))}*/}
                            
                            
                            {/*/!*** Toggle expand / Collapse button ****!/*/}
                            {/*{myCreatedEvent.length > 0 && <div*/}
                            {/*    className="p-1 rounded accordion-li hover:bg-blue-100"*/}
                            {/*    onClick={(e) => handleExpandAccContent(e, 1, myCreatedEvent.length)}>*/}
                            {/*    <div className="flex items-center justify-between ml-4">*/}
                            {/*        <label htmlFor=""*/}
                            {/*               className="font-medium">*/}
                            {/*            {accItemShowContentLen[1] === 5 ? "Show more" : "Show less"}</label>*/}
                            {/*        <BiChevronDown/>*/}
                            {/*    </div>*/}
                            {/*</div>}*/}
                            
                            
                            {Object.keys(statusColors).map(status=>(
                                <div className="flex items-center mb-1 gap-x-1">
                                    <input onChange={()=>handleChangeFilterEvent(status)} checked={filterEvents.includes(status)} type="checkbox" id={status} name={status}/>
                                    <label className="px-2 py-px text-sm font-normal text-gray-900 capitalize rounded hover:bg-gray-100 "
                                           style={{color : statusColors[status]}}
                                           htmlFor={status}>
                                        {status === "proposedTime" ? "Proposed New Time" : status}
                                    </label>

                                    {/*<label className="px-2 py-px text-sm font-normal text-gray-100 rounded " style={{background: statusColors[status]}} htmlFor={status}>{status}</label>*/}
                                </div>
                            ))}
                            
                        </div>
                    </Accordion.Item>


                    <Accordion.Item dataId={2}
                        header={(isOpen) => (
                            <div onClick={() => handleToggle(2)} className="flex items-center justify-between accordion-header">
                                <h4 className="">My Events</h4>
                                {isOpen
                                    ? <BiChevronDown className="text-xs text-gray-500"/>
                                    : <BiChevronRight className="text-xs text-gray-500"/>
                                }
                            </div>
                        )}>


                        <div className="accordion-content">
                            {sortByDate(events).slice(0, accItemShowContentLen[2]).map(evt => (
                                <div className="mt-1 accordion-li " key={evt._id} onClick={()=>handleOpenEventDetailRoute(evt._id)} >
                                    <h4 className="flex items-center">
                                        <div className="col-span-1">
                                            <div style={{background:  colors[evt.eventColor] || statusColors[evt.status]}}
                                                 className="block w-3 h-3 rounded-full"></div>
                                        </div>
                                        <div className="ml-1">
                                            <span className="px-1 py-px text-sm text-gray-700 rounded accordion-content-title hover:bg-gray-100">
                                                {evt.title}
                                            </span>
                                        </div>
                                    </h4>
                                </div>
                            ))}

                            {/*** Toggle expand / Collapse button ****/}
                            { events.length > 10 && (
                                <div className="p-1 rounded accordion-li hover:bg-blue-100"
                                     onClick={(e) => handleExpandAccContent(e, 2, events.length)}>
                                    <div className="flex items-center justify-between ml-4">
                                        <label htmlFor=""
                                               className="font-medium">
                                            Show {accItemShowContentLen[2] !== events.length ? " more" : " less"}</label>
                                        <BiChevronDown/>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Accordion.Item>
                </Accordion>
            </div>
        </div>
    );
};

export default CalendarSidebar;