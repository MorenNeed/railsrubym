class OrdersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_order, only: [:show, :edit, :update, :destroy]

  def index
    @orders = Order.all.includes(order_descriptions: :item)
    @orders_json = @orders.as_json(include: { order_descriptions: { include: :item } })
  end

  def show
    @user_orders = current_user.orders.includes(order_descriptions: :item)
    @user_orders_json = @user_orders.as_json(include: { order_descriptions: { include: :item } })
  end

  def new
    @order = current_user.orders.build
    @order.order_descriptions.build
  end

  def create
    @order = current_user.orders.build(order_params)

    respond_to do |format|
      if @order.save
        format.html { redirect_to @order, notice: 'Order was successfully created.' }
        format.json { render :show, status: :created, location: @order }
      else
        format.html { render :new }
        format.json { render json: @order.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @order.update(order_params)
        format.html { redirect_to @order, notice: 'Order was successfully updated.' }
        format.json { render :show, status: :ok, location: @order }
      else
        format.html { render :edit }
        format.json { render json: @order.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @order = current_user.orders.includes(:order_descriptions).find(params[:id])
    @order.destroy
    respond_to do |format|
      format.html { redirect_to orders_url, notice: 'Order was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  def order_params
    params.require(:order).permit(:amount, order_descriptions_attributes: [:item_id, :quantity])
  end
  def set_order
    @order = current_user.orders.includes(:order_descriptions)
  end
end

