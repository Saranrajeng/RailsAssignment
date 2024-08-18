class EmployeeController < ApplicationController
  before_action :authenticate_admin 
  before_action :set_employee, only: [:show, :update, :destroy]

  def index
    render json: {data: Employee.all}
  end

  def show
    render json: {data: @employee}
  end

  def create
    @employee = Employee.new(employee_params)
    @user = User.new(email: employee_params[:email], password: "password")
    @user.role="employee"
    @user.save
    @employee.user = @user
    if @employee.save
      render json: @employee, status: :created
    else
      render json: @employee.errors, status: :unprocessable_entity
    end
  end

  def update
    if @employee.update(employee_params)
      render json: @employee
    else
      render json: @employee.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @employee.destroy
    head :no_content
  end

  private

  def set_employee
    @employee = Employee.find(params[:id])
  end

  def employee_params
    params.require(:employee).permit(:first_name, :last_name, :email, :designation, :department_id)
  end
end