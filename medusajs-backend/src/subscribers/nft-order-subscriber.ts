// subscribers/nft-order-subscriber.ts
import NFTFulfillmentService from "../services/nft-fulfillment";
import {
  OrderService,
  SubscriberArgs,
  SubscriberConfig,
} from "@medusajs/medusa";

type OrderPlacedEvent = {
  id: string;
  no_notification: boolean;
};

export default async function orderPlacedHandler({
  data,
  eventName,
  container,
}: SubscriberArgs<OrderPlacedEvent>) {
  // Resolve the OrderService using its registration key.
  const orderService = container.resolve<OrderService>("orderService");

  // Retrieve the order with the necessary relations.
  const order = await orderService.retrieve(data.id, {
    relations: ["items", "items.variant", "items.variant.product"],
  });

  // Resolve your custom NFTFulfillmentService using its key.
  const nftFulfillmentService = container.resolve<NFTFulfillmentService>("nftFulfillmentService");

  // Process the NFT fulfillment.
  await nftFulfillmentService.createNFTOrder(order);
}

export const config: SubscriberConfig = {
  event: OrderService.Events.PLACED,
};
