import { PartnerModel } from "./Partner.Schema";
import { CreatePartnerDTO, CreatePartnerValidator } from "./Partner.Validator";

class PartnerService {
  public createNewPartner = async (Data: CreatePartnerDTO) => {
    CreatePartnerValidator.parseAsync(Data);

    return await PartnerModel.create(Data);
  };
}

export default new PartnerService();
