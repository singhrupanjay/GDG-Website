import { Request, Response } from "express";
import PartnerService from "./Partner.Service";

class PartnerController {
  public async createNewPartner(req: Request, res: Response) {
    try {
      let { companyLogo } = req.body;
      let res = PartnerService.createNewPartner({
        ...req.body,
      });
    } catch (error) {}
  }
}

export default new PartnerController();
