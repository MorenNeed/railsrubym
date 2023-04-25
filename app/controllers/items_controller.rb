class ItemsController < ApplicationController
    before_action :set_user, only: [:show, :edit, :update, :destroy]

    def index
        @items = Item.all
    end

    def show
        @item
    end

    def new
        @item = Item.new
    end

    def create
        @item = Item.new(user_params)

        if @item.save
            redirect_to items_path, notice: "Item was succesfuly created."
        else
            render :new
        end
    end

    def edit
    end

    def update
        if @item.update(item_params)
            redirect_to items_path, notice: "Item was succesfuly updated."
        else
            render :edit
        end
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
        params.require(:item)
    end
end