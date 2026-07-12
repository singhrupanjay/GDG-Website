import { EventRegistration } from "./EventRegistration.Schema";
import { EventRegistrationTemplateProps } from "./EventRegistration.Type";
import path from "path";
import fs from "fs";

class EventRegistrationUtils {
  async FindEventRegistrationBYTeamCode(teamCode: string) {
    return await EventRegistration.findOne({ teamCode: teamCode });
  }

  async GetEventRegistrationTemplate(
    TemplateProps: EventRegistrationTemplateProps,
  ) {
    let eventRegistrationFilePath = path.join(
      __dirname,
      "Template/EventRegistrations.Template.html",
    );
    let eventRegistrationTemplate = fs.readFileSync(
      eventRegistrationFilePath,
      "utf-8",
    );

    let TemplateData = {
      "{{EventName}}": TemplateProps.EventName,
      "{{Full Name}}": TemplateProps.fullName,
      "{{TeamName}}": TemplateProps.TeamName,
      "{{ParticipationType}}}": TemplateProps.ParticipationType,
      "{{EventDate}}": TemplateProps.EventDate,
      "{{InviteLink}}": TemplateProps.InviteLink,
      "{{QRCodeURL}}": TemplateProps.QRCodeURL,
      "{{TeamCode}}": TemplateProps.teamCode,
    };

    for (const [key, value] of Object.entries(TemplateData)) {
      eventRegistrationTemplate = eventRegistrationTemplate.replaceAll(
        key,
        value,
      );
    }

    return eventRegistrationTemplate;
  }
}

export const eventRegistrationUtils = new EventRegistrationUtils();
