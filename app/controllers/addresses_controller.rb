class AddressesController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_address, only: [:show, :edit, :destroy]

  def index
    @addresses = Address.all
  end

  def show
    @address = Address.find params[:id]
  end

  def new
    @address = Address.new
  end

  def create
    @address = Address.new address_params
    respond_to do |format|
      if @address.save
        format.html {redirect_to @address, notice: t("address.create")}
      else
        format.html {render :new}
      end
    end
  end

  private
  def address_params
    params.require(:address).permit :lon, :lat, :capacity, :contact, 
      :description, :type
  end

  def set_address
    @address = Address.find params[:id]
  end
end
