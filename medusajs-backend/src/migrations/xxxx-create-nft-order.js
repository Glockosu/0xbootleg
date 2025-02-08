// migrations/xxxx-create-nft_order.js
module.exports = class CreateNFTOrder {
    async up(queryRunner) {
      await queryRunner.query(`
        CREATE TABLE "nft_order" (
          "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
          "order_id" varchar NOT NULL,
          "line_item_id" varchar NOT NULL,
          "nft_token" varchar NOT NULL,
          "fulfilled" boolean NOT NULL DEFAULT false,
          "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
          "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now()
        );
      `);
    }
  
    async down(queryRunner) {
      await queryRunner.query(`DROP TABLE "nft_order"`);
    }
  };
  