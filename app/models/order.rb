class Order < ApplicationRecord
    belongs_to :user
    has_many :order_descriptions, class_name: 'OrderDescription'
    has_many :items, through: :order_descriptions
    accepts_nested_attributes_for :order_descriptions
  end
  