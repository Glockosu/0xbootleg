// services/nft-fulfillment.ts
import { getRepository } from "typeorm";

export default class NFTFulfillmentService {
  async createNFTOrder(order: any) {
    const nftOrderRepo = getRepository("NFTOrder");
    for (const item of order.items) {
      if (item.metadata && item.metadata.nft_token) {
        await nftOrderRepo.save({
          order_id: order.id,
          line_item_id: item.id,
          nft_token: item.metadata.nft_token,
          fulfilled: false,
        });
      }
    }
  }
  // Additional methods here.
}
