import { Request, Response } from "express";
import EventRegistrationChannel from "./EventRegistration.Channel";
import SendResponse from "../../../utils/SendResponse";

class EventRegistrationController {
  async RegisterEvent(req: Request, res: Response) {
    try {
      let {
        TeamName,
        email,
        fullName,
        teamCode,
        EventDate,
        InviteLink,
        QRCodeURL,
        ParticipationType,
        EventName,
      } = req.body;

      await EventRegistrationChannel.sendEventRegistrationMail({
        fullName: fullName,
        TeamName: TeamName,
        email: email,
        EventName: EventName,
        EventDate: EventDate,
        InviteLink: InviteLink,
        QRCodeURL: QRCodeURL,
        ParticipationType: ParticipationType,
        teamCode: teamCode,
      });

      SendResponse.SuccessResponse(
        res,
        200,
        "Event Registration Email Sent Successfully for Email Test",
      );
    } catch (error) {
      SendResponse.ErrorResponse(
        res,
        500,
        "Error occurred while registering event",
      );
    }
  }
}

export default new EventRegistrationController();
