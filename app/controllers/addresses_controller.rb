class AddressesController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_address, only: [:show, :edit, :destroy]

  def index
    @addresses = Address.all
    @address = Address.new
    @image = @address.images.build
  end

  def show
    @address = Address.find params[:id]
    @images = @address.images.all
    render layout: "address"
  end

  def new
    @address = Address.new
    @image = @address.images.build
  end

  def create
    @address = Address.new address_params
    respond_to do |format|
      if @address.save
       params[:images]["photo"].each do |a|
          @image = @address.images.create!(:photo => a, :address_id => @address.id)
       end
       format.html {redirect_to root_path, notice: t("address.create")}
      else
       format.html {render :new}
      end      
    end
  end

  private
  def address_params
    params.require(:address).permit :lng, :lat, :capacity, :contact,
      :description, :type, images_attributes: [:id, :address_id, :photo]
  end

  def set_address
    @address = Address.find params[:id]
  end
end
