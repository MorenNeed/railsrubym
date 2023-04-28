class OrderDescription < ApplicationRecord
    self.table_name = 'orders_descriptions'
    belongs_to :order
    belongs_to :item
end