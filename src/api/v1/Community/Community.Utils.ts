import { CommunityModel } from "./Community.model";

class CommunityUtils {
  GET_COMMUNITY_BY_AuthID = async (communityId: string) => {
    try {
      let community = await CommunityModel.findOne({ OwnerID: communityId });

      console.log("Community found for Owner ID:-->", communityId, community);
      return community;
    } catch (error) {
      throw error;
    }
  };

  DeleteCommunityById = async (communityId: string) => {
    try {
      let deletedCommunity =
        await CommunityModel.findByIdAndDelete(communityId);

      console.log("Deleted Community:-->", deletedCommunity);
      return deletedCommunity;
    } catch (error) {
      throw error;
    }
  };
}

export const communityUtils = new CommunityUtils();
