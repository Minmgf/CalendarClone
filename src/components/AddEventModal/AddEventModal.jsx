import React, { useContext, useEffect, useState } from 'react';
import CalendarContext from "../../context/CalendarContext";
import * as yup from "yup";
import axios from "axios";
import MultiStepModal from "../MultiStepModal/MultiStepModal.jsx";
import { CSSTransition } from "react-transition-group";
import { toast } from "react-toastify";
import useAuthContext from "../../context/useAuthContext.js";
import BasicInfo from "./BasicInfo";
import AddUser from "./AddUser";

const AddEventModal = () => {
  const { newEventData, setEvents, addEvent, setNewEventData, setCloseNewEventModal } = useContext(CalendarContext);
  const [{ auth }] = useAuthContext();
  const [tab, setTab] = useState("basic");
  const [modalId, setModalId] = useState(1);

  const handleClose = () => {
    setCloseNewEventModal();
    setModalId(1);
  };

  const handleChange = (value, name) => {
    setNewEventData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    if (!newEventData.isOpen) {
      setTab("basic");
    }
  }, [newEventData.isOpen]);

  useEffect(() => {
    if (newEventData.isEventCreateInitialize) {
      setEvents((prev) => {
        const updateEvents = [...prev];
        const updateEventIndex = updateEvents.findIndex((evt) => evt.isEventCreateInitialize);
        if (updateEventIndex !== -1) {
          updateEvents[updateEventIndex] = {
            ...updateEvents[updateEventIndex],
            ...newEventData
          };
          return updateEvents;
        } else {
          return prev;
        }
      });
    }
  }, [newEventData.isEventCreateInitialize, newEventData.title, newEventData.eventColor]);

  const handleUpload = (files) => {
    // Implementar la lógica de manejo de archivos si es necesario
  };

  const handleAddEvent = async (cb) => {
    if (!auth) {
      cb();
      return toast.error("To create a meeting, you need to log in first.");
    }

    const eventValidator = yup.object({
      title: yup.string().required("Meeting title required."),
      agenda: yup.string().required("Meeting description required."),
      invitations: yup.array()
    });

    try {
      const invitationUsers = newEventData.invitations.map((user) => user._id) || [];
      await eventValidator.validateSync({
        title: newEventData.title,
        agenda: newEventData.agenda,
        invitations: invitationUsers
      });

      let startDateTime = new Date(newEventData.startDateTime);
      let endDateTime = new Date(newEventData.endDateTime);

      if (newEventData.isAllDay) {
        startDateTime.setHours(0, 0, 0, 0);
        endDateTime.setHours(23, 59, 59, 999);
      }

      const payload = {
        title: newEventData.title,
        start: startDateTime,
        end: endDateTime,
        agenda: newEventData.agenda,
        description: newEventData.agenda,
        actionItems: newEventData.actionItems,
        followUp: newEventData.followUp,
        notifications: newEventData.notifications,
        meetingLink: newEventData.meetingLink,
        status: "pending",
        eventLawyer: newEventData.eventLawyer,
        eventColor: newEventData.eventColor,
        eventCourt: newEventData.eventCourt,
        eventMaster: newEventData.eventMaster,
        attachments: null,
        invitations: invitationUsers
      };

      if (payload.start > payload.end) {
        cb();
        return toast.error("End time should be greater than Start time");
      }

      if (newEventData.updateEventId) {
        try {
          /*Ruta para editar los eventos
          const response = await axios.put(`/api/calendar/events/${newEventData.updateEventId}`, payload);
          */

          const response = await axios.put(`/api/calendar/events/${newEventData.updateEventId}`, payload);

          if (response.status === 200) {
            toast.success("Event is successfully updated");

            setCloseNewEventModal();
            setEvents((prev) => {
              const updateEvents = [...prev];
              const updateEventIndex = updateEvents.findIndex((evt) => evt._id === newEventData.updateEventId);
              if (updateEventIndex !== -1) {
                updateEvents[updateEventIndex] = {
                  ...updateEvents[updateEventIndex],
                  ...response.data.event
                };
                return updateEvents;
              } else {
                return prev;
              }
            });
          } else {
            toast.error("Error updating the event");
          }
        } catch (ex) {
          toast.error(ex?.response?.data?.error || "Unexpected error updating the event");
        } finally {
          cb();
        }
      } else {
        try {
          const response = await axios.post("/api/calendar/create/", payload);

          setCloseNewEventModal();
          toast.success("Event successfully created");
          addEvent(response.data.event);
        } catch (ex) {
          toast.error(ex?.response?.data?.error || "Error creating the event");
        } finally {
          cb();
        }
      }
    } catch (ex) {
      cb();
      return toast.error(ex.message);
    }
  };

  return (
    <div>
      <MultiStepModal isOpen={newEventData.isOpen} onClose={handleClose} className="add-event-multi-modal">
        <CSSTransition unmountOnExit={true} in={modalId === 1} timeout={400} classNames="modal-content">
          <div className="modal-inner">
            <BasicInfo
              onClose={handleClose}
              setModalId={setModalId}
              handleAddEvent={handleAddEvent}
              handleChange={handleChange}
              setTab={setTab}
              newEventData={newEventData}
            />
          </div>
        </CSSTransition>

        <CSSTransition unmountOnExit={true} in={modalId === 2} timeout={400} classNames="modal-content">
          <div className="modal-inner">
            <AddUser
              setModalId={setModalId}
              handleClose={handleClose}
              handleChange={handleChange}
              newEventData={newEventData}
              setTab={setTab}
            />
          </div>
        </CSSTransition>

        {/* Agregar más bloques de transición según sea necesario */}

      </MultiStepModal>
    </div>
  );
};

export default AddEventModal;
