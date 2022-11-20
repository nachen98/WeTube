import React from "react";
import { useDispatch, useSelector } from "react-redux";
import './VideoComment.css'
import { deleteReview } from "../../store/review";
import { getOneSpot } from "../../store/spots";
import { useParams } from "react-router-dom";

