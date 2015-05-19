class SessionsController < ApplicationController

  def new
    @patient = Patient.new
  end

  def create
    if Patient.find_by_email(params[:patient][:email])
      patient = Patient.find_by_email(params[:patient][:email])
      @patient = Patient.authenticate(params[:patient][:password])
      if @patient
        session[:patient_id] = @patient.id
        redirect_to patient_path(@patient.id)
      else
        redirect_to root_path
      end
    else
      @patient = Patient.create!(name: params[:patient][:name], email: params[:patient][:email], password: params[:patient][:password], password_confirmation: params[:patient][:password_confirmation])
      session[:patient_id] = @patient.id
      redirect_to patient_path(@patient.id)
    end
  end

  def failure
    render :text => "Sorry, but you didn't allow access to our app!"
  end

  def destroy
    session[:patient_id] = nil
    redirect_to root_url, :notice => "Signed Out!"
  end

end
