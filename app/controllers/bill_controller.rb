class BillController < ApplicationController
  before_action :authenticate_user
  before_action :authenticate_admin, only: [:approve, :reject]
  before_action :set_bill, only: [:show, :approve, :reject ]


  def index
    @bills = @current_user.admin? ? Bill.all : @current_user.employee.bills
    @bills= @bills.includes(submitted_by: :department)
    @total_approved = @bills.approved.sum(:amount)
    @total_submitted = @bills.pending.sum(:amount)
  end

  def show
    render json: @bill
  end

  def create
    @bill = Bill.new(bill_params)
    @bill.status = "pending" 
    if @bill.save
      render json: @bill, status: :created
    else
      render json: @bill.errors, status: :unprocessable_entity
    end
  end

  def approve
    if @bill.approved!
      render json: @bill
    else
      render json: @bill.errors, status: :unprocessable_entity
    end
  end
  def reject
    if @bill.rejected!
      render json: @bill
    else
      render json: @bill.errors, status: :unprocessable_entity
    end
  end

  private

  def set_bill
    @bill = Bill.find(params[:id])
  end

  def bill_params
    params.require(:bill).permit(:amount, :bill_type, :submitted_by_id)
  end

end