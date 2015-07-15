class AddressesController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_address, only: [:show, :edit, :destroy]

  def index
    @addresses = Address.all.page params[:page]
    @address = Address.new
    @recent_addresses = Address.last Settings.num_of_recent_addresses
    @search = Room.search params[:q]
  end

  def show
    @address = Address.find params[:id]    
  end

  def new
    @address = Address.new
    @image = @address.images.build
  end

  def create
    @address = Address.new address_params
    respond_to do |format|
      if @address.save
        format.html {redirect_to root_path, notice: t("address.create")}
      else
        format.html {render :new}
      end
    end
  end

  private
  def address_params
    params.require(:address).permit :id, :lng, :lat, :capacity, :contact,
      :description, :type, images_attributes: [:id, :photo, :_destroy]
  end

  def set_address
    @address = Address.find params[:id]
  end
end
