class ItemsController < ApplicationController
    respond_to :json
    before_action :set_item, only: [:show, :edit, :update, :destroy]

    def index
        @items = Item.all
    end

    def show
        @item
    end

    def new
        @item = Item.new
    end

    def manage
        @items = Item.all
        render
    end

    def create
        @item = Item.new(item_params)

        if @item.save
            redirect_to items_path, notice: "Item was succesfuly created."
        else
            render :new
        end
    end

    def edit
        @items = Item.all
    end

    def update
        @item = Item.find(params[:id])
        @item.update_attribute(params[:updatedField].to_sym, params[:updatedValue])
        flash[:success] = "Profile updated successfully!"
    end

    def destroy
        @item.destroy
        redirect_to items_path, notice: "Item was succesfuly destroyed."
    end

    private

    def set_item
        @item = Item.find(params[:id])
    end

    def item_params
        params.require(:item).permit(:name, :description, :price).tap do |whitelisted|
          whitelisted[:name].presence
          whitelisted[:description].presence
          whitelisted[:price].presence
        end
    end
end
