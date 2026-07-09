import path from "path";
import { MemberModel } from "./Member.Schema";

import fs from "fs";

class MemberUtils {
  Is_Member_Exist = async (email: string) => {
    let FindMember = await MemberModel.findOne({ email: email });
    return !!FindMember;
  };

  FIND_ALL_Members = async () => {
    return await MemberModel.find().select(
      "firstName lastName email membershipStatus primaryRole imageUrl",
    );
  };

  FIND_Member_BY_EMAIL = async (Email: string) => {
    return await MemberModel.findOne({ email: Email });
  };

  INVITE_MEMBER_TEMPORARY = async (
    email: string,
    fullName: string = "Developer",
    role: string = "Member",
    temporaryPassword: string,
  ) => {
    try {
      // /home/developera/Desktop/GDG-Website/src/api/v1/Member/Template/inviteMemberTemplate.html
      const templatePath = path.join(
        __dirname,
        "Template",
        "inviteMemberTemplate.html",
      );
      let template = fs.readFileSync(templatePath, "utf-8");

      const replacements: Record<string, string> = {
        "{{Full Name}}": fullName,
        "{{Email}}": email,
        "{{Role}}": role,
        "{{RandomPassword}}": temporaryPassword,
      };

      Object.entries(replacements).forEach(([placeholder, value]) => {
        template = template.replaceAll(placeholder, value);
      });

      return template;
    } catch (error) {
      console.error("Failed to generate invitation template:", error);
      throw new Error("Invitation template generation failed.");
    }
  };
}

export const memberUtils = new MemberUtils();
