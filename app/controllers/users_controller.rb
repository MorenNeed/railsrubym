class UsersController < ApplicationController
    respond_to :json
    before_action :set_user, only: [:show, :edit, :update, :destroy, :update_password]

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
        @user = User.find(params[:id])
        @user.update_attribute(params[:updatedField].to_sym, params[:updatedValue])
        flash[:success] = "Profile updated successfully!"
    end

    def destroy
        if @user.destroy
            flash[:success] = "User was deleted successfully!"
        else
            flash[:error] = "Error"
        end
    end

    def update_password
        if @user.update_with_password(user_password_update_params)
            # Sign in the user bypassing validation in case his password changed
            bypass_sign_in(@user)
            flash[:success] = "Your Password has been updated!"
        else
            flash[:alert] = @user.errors.full_messages.join("<br />")
        end
    end

    private

    def set_user
        @user = User.find(params[:id])
    end

    def user_password_update_params
        params.require(:user).permit(:current_password, :password, :password_confirmation)
    end

    def user_params
        params.require(:user).permit(:first_name, :last_name, :email)
    end
end
