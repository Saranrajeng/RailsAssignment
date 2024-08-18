class ApplicationController < ActionController::API
  include Authenticable

  def authenticate_user
    render json: { error: 'Not Authorized' }, status: :unauthorized unless logged_in?
  end

  def authenticate_admin
    if logged_in?
      render json: { error: 'Required Admin Access' }, status: :unauthorized unless @current_user.admin?
    else
      render json: { error: 'Not Authorized' }, status: :unauthorized
    end
  end
end