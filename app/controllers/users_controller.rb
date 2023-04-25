class UsersController < ApplicationController
    before_action :set_user, only: [:show, :edit, :update, :destroy]

    def index
        @users = User.all
    end

    def show
        @user
    end

    def new
        @user = User.new
    end

    def create
        @user = User.new(user_params)

        if @user.save
            redirect_to users_path, notice: "User was succesfuly created."
        else
            render :new
        end
    end

    def edit
    end

    def update
        if @user.update(user_params)
            redirect_to users_path, notice: "User was succesfuly updated."
        else
            render :edit
        end
    end

    def destroy
        @user.destroy
        redirect_to users_path, notice: "User was succesfuly destroyed."
    end

    private

    def set_user
        @user = User.find(params[:id])
    end

    def user_params
        params.require(:user)
    end
end