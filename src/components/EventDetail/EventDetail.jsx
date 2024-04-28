import React from 'react';
import {TiTimes} from "react-icons/all";
import Modal from "../Modal/Modal";
import dayjs from "dayjs";
import {lawyers} from "../LawyerPicker/LawyerPicker"; 
import {colors} from "../ColorPicker/ColorPicker";
import statusColors from "../../utils/statusColors";
import subString from "../../utils/subString.js";

import parse from 'html-react-parser';

const EventDetail = ({event, auth, onClose}) => {

	return (
		<div>

			<Modal isOpen={!!event} onClose={onClose} className="p-4 event-detail-modal">

				{event && (
					<div>

						<div className="flex items-center justify-between">
							<h2 className="text-xl font-semibold text-gray-800">{event.title}</h2>

							<div className="close-btn">
								<TiTimes className="text-gray-500 cursor-pointer hover:text-red-500" onClick={onClose}/>
							</div>
						</div>

						<div className="mt-4">
							<label className="text-sm font-medium text-gray-600" htmlFor="">Start Time</label>
							<p className="desc-para">{dayjs(event.start).format("ddd, MMM D, YYYY h:mm A")}
							</p>
						</div>

						<div className="mt-4">
							<label className="text-sm font-medium text-gray-600" htmlFor="">Organizer</label>
							<div
								className="flex flex-wrap items-center mt-1 gap-x-0 users-avatar-list">

								<div className="user-avatar">
									<img src={event?.createdBy?.profilePicture} className="rounded-full" alt=""/>
								</div>

								<div className="">
									<h5 className="text-sm font-normal text-gray-500">{event?.createdBy?.fullName}</h5>
									<h5 className="text-sm font-normal text-gray-500">{event?.createdBy?.email}</h5>
								</div>

							</div>
						</div>

						<div className="mt-4">
							<label className="text-sm font-medium text-gray-600" htmlFor="">Invited peoples</label>
							<div
								className="flex flex-wrap items-center mt-1 gap-x-0 users-avatar-list">
								{event.invitations.map(user => (
									<div>

										<div className="user-avatar">
											<img  src={user.profilePicture} className="text-xs rounded-full" alt={user.fullName}/>
										</div>

										{/*<Popover content={(*/}
										{/*	<li className="flex items-center justify-between">*/}
										{/*		<p className="flex items-center gap-x-1 ">*/}
										{/*			<div className='img-box-6 '>*/}
										{/*				<img className="w-6 mr-1 rounded-full"*/}
										{/*					 src={user?.profilePicture || "/placeholder.jpg"} alt=""/>*/}
										{/*			</div>*/}

										{/*			<div>*/}
										{/*				<p className="text-gray-600">{subString(user?.fullName, 30)}</p>*/}
										{/*				<p className="text-xs text-gray-500">{subString(user?.email, 26)}</p>*/}
										{/*			</div>*/}
										{/*		</p>*/}
										{/*	</li>*/}
										{/*)}>*/}
										{/*	<div className="user-avatar">*/}
										{/*		<img  src={user.profilePicture} className="text-xs rounded-full" alt={user.fullName}/>*/}
										{/*	</div>*/}
										{/*</Popover>*/}
									</div>
								))}
							</div>
							{!event.invitations || event.invitations.length === 0 && (
								<h2 className="desc-para">No users invited</h2>
							) }
						</div>

						<div className="mt-4">
							<label className="text-sm font-medium text-gray-600" htmlFor="">Status</label>
							<p style={{color:  colors[event.eventColor]|| statusColors[event.status]}} className="uppercase desc-para"  >{event.status}</p>
						</div>

						<div className="mt-4">
                            <label className="text-sm font-medium text-gray-600" htmlFor="">Lawyer</label>
							<p className="desc-para">{event.eventLawyer}</p>
                        </div>


						<div className="mt-4">
							<label className="text-sm font-medium text-gray-600" htmlFor="">Agenda</label>
							<p className="desc-para">{parse(event.agenda || event.description || "")}</p>
						</div>



						<div className="mt-4">
							<label className="text-sm font-medium text-gray-600" htmlFor="">Meeting Link</label>
							<p className="desc-para">{event.meetingLink}</p>
						</div>

					</div>
				)}

			</Modal>
		
		</div>
	);
};

export default EventDetail;