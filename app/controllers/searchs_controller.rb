class SearchsController < ApplicationController
  def index
    @search = Room.search params[:q]

    if params[:q].reject {|k, v| v.blank?}.present?
      @sortings = Settings.sortings
      @search.build_condition if @search.conditions.empty?
      @rooms = @search.result.page params[:page]
    else
      @rooms = []
    end 
  end
end
