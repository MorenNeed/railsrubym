class CreateOrdersDescriptions < ActiveRecord::Migration[7.0]
  def change
    create_table :orders_descriptions do |t|
      t.references :order, foreign_key: true
      t.references :item, foreign_key: true
      t.integer :quantity

      t.timestamps
    end
  end
end
