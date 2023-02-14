import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './VideoComment.css'

import { getProfileIcon } from "../../util/helper";
import { formatDate } from "../../util/helper";
import { timeDifference } from "../../util/helper";
import { EditDeleteDropDown } from "../EditDeleteCommentDropDown/EditDeleteDropDown";
import { CreateCommentForm } from "../CreateComment/CreateComment";

export function VideoComment({ commentContent }) {
    // console.log("content!!!!!!!!!!", commentContent)

    const currUser = useSelector(state => state.session.user)
    const [editable, setEditable] = useState(false)
    let currUserIsOwner = (currUser && "id" in currUser && commentContent && "user" in commentContent && currUser.id === commentContent.user.id);

    const formatedUpdateTime = timeDifference(commentContent.updated_at)

    return (
        <div id="comment-container">
            {!editable && (
                <div id="individual-comment" className="justify-space-btw">
                    <div className="flx-row-start">
                        <div className="comment-maker-icon">
                            {getProfileIcon(commentContent.user)}

                        </div>
                        <div className="name-time-comment flx-col-justify-ctr">
                            <div className="name-time flx-row-wrap">
                                <div className="comment-username">
                                    {commentContent.user.username}
                                </div>

                                <div className="posted-time">
                                    {formatedUpdateTime}

                                </div>
                            </div>


                            <div className="comment-content">
                                {commentContent.content}
                            </div>

                        </div>

                    </div>
                    <div id="edit-delete-comment-icon">
                        {currUserIsOwner && (
                            <EditDeleteDropDown commentContent={commentContent} setEditable={setEditable} />
                        )}
                    </div>

                </div>
            )}
            {editable && !!currUser && <CreateCommentForm videoId={commentContent.video_id} commentId={commentContent.id} content={commentContent.content} placeholder="" buttonName="Save" setEditable={setEditable} />

            }
        </div>
    )
}