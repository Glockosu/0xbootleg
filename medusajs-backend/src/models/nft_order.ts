// models/nft_order.js
const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "NFTOrder",
  tableName: "nft_order",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    order_id: {
      type: "varchar",
      nullable: false,
    },
    line_item_id: {
      type: "varchar",
      nullable: false,
    },
    nft_token: {
      type: "varchar",
      nullable: false,
    },
    fulfilled: {
      type: "boolean",
      default: false,
    },
    created_at: {
      type: "timestamp",
      createDate: true,
    },
    updated_at: {
      type: "timestamp",
      updateDate: true,
    },
  },
});
