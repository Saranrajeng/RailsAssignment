class DepartmentController < ApplicationController
    def index
      render json: {data: Department.all}
    end
end